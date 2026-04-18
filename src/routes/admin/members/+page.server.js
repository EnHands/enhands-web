import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { members } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { supabase } from '$lib/server/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    // 1. Grab the user data from the layout bouncer we built earlier
    const { user } = await parent();

    // 2. Double-check clearance: Kick standard members back to the main admin page
    if (user.role !== 'admin') {
        throw redirect(302, '/admin');
    }

    // 3. Fetch all current members
    const allMembers = await db.select().from(members);
    return { allMembers };
}

// Helper function to upload a file and return the public URL
/**
 * Helper function to upload a file and return the public URL
 * @param {File} file 
 * @returns {Promise<string>}
 */
async function uploadImage(file) {
    if (!file || !(file instanceof File) || file.size === 0) return ''; // Fallback if no file is found

    // 1. Create a unique filename so "headshot.jpg" doesn't overwrite someone else's "headshot.jpg"
    const uniqueFileName = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    // 2. Upload the raw file to the 'enhands-assets' bucket
    const { error: uploadError } = await supabase.storage
        .from('enhands-assets')
        .upload(uniqueFileName, file);

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    // 3. Get the permanent public URL
    const { data: { publicUrl } } = supabase.storage
        .from('enhands-assets')
        .getPublicUrl(uniqueFileName);

    return publicUrl;
}

/** @type {import('./$types').Actions} */
export const actions = {
    // ACTION 1: Add a new member
    add: async ({ request }) => {
        const data = await request.formData();
        
        // Extract the actual File objects from the form
        const imgFile = /** @type {File} */ (data.get('img'));
        const hoverFile = /** @type {File} */ (data.get('img_hover'));

        // Pass them to our helper function
        const imgUrl = await uploadImage(imgFile);
        const hoverUrl = await uploadImage(hoverFile);
        
        // Save the resulting URLs via Drizzle
        await db.insert(members).values({
            name: String(data.get('name') || ''),
            job: String(data.get('job') || ''),
            img: imgUrl,
            img_hover: hoverUrl
        });

        return { success: true };
    },

    // ACTION 2: Delete a member AND their files
    delete: async ({ request }) => {
        const data = await request.formData();
        const idToDelete = String(data.get('id'));

        // 1. Fetch the member from the database BEFORE deleting them
        const [memberToDelete] = await db.select()
            .from(members)
            .where(eq(members.id, idToDelete));

        if (memberToDelete) {
            /**
             * Helper function: Extracts just the filename from the long Supabase URL
             * @param {string | null} url 
             */
            const extractFilename = (url) => {
                if (!url) return null;
                const parts = url.split('/');
                return parts[parts.length - 1]; 
            };

            const imgFilename = extractFilename(memberToDelete.img);
            const hoverFilename = extractFilename(memberToDelete.img_hover);

            // Filter out any nulls just in case a member didn't have a hover image
            const filesToRemove = [imgFilename, hoverFilename].filter(Boolean);

            // 2. Tell Supabase Storage to delete the actual files!
            if (filesToRemove.length > 0) {
                const { error: storageError } = await supabase.storage
                    .from('enhands-assets')
                    .remove(/** @type {string[]} */(filesToRemove));
                
                if (storageError) {
                    console.error("Failed to delete storage files:", storageError);
                    // We log the error but don't crash the function, 
                    // so the database row still gets deleted successfully!
                }
            }
        }

        // 3. Finally, delete the row from the database
        await db.delete(members).where(eq(members.id, idToDelete));
        return { success: true };
    }
};