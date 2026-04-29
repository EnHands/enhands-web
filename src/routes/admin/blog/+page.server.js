import { db } from '$lib/server/db';
import { blog_posts } from '$lib/server/db/schema';
import { supabase } from '$lib/server/supabase';
import { eq, desc } from 'drizzle-orm';

/**
 * Helper function to upload a file and return the public URL
 * @param {File} file 
 * @returns {Promise<string>}
 */
async function uploadImage(file) {
    if (!file || file.size === 0) return '';
    const uniqueFileName = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    await supabase.storage.from('enhands-assets').upload(uniqueFileName, file);
    const { data: { publicUrl } } = supabase.storage.from('enhands-assets').getPublicUrl(uniqueFileName);
    return publicUrl;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const posts = await db.select().from(blog_posts).orderBy(desc(blog_posts.date));
    return { posts };
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const imageFile = /** @type {File} */ (data.get('image'));
        const imageUrl = await uploadImage(imageFile);

        await db.insert(blog_posts).values({
            id: crypto.randomUUID(),
            title: String(data.get('title')),
            slug: String(data.get('slug')),
            author: String(data.get('author')),
            date: String(data.get('date')),
            image: imageUrl,
            content: String(data.get('content'))
        });

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = String(data.get('id'));
        
        // Add file cleanup logic here later!
        await db.delete(blog_posts).where(eq(blog_posts.id, id));
        return { success: true };
    },

    update: async ({ request }) => {
        const data = await request.formData();
        const id = String(data.get('id'));
        
        // Get existing to keep image if none uploaded
        const [existing] = await db.select().from(blog_posts).where(eq(blog_posts.id, id));
        
        const imageFile = /** @type {File} */ (data.get('image'));
        let imageUrl = existing.image;
        
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile);
        }

        await db.update(blog_posts).set({
            title: String(data.get('title')),
            slug: String(data.get('slug')),
            author: String(data.get('author')),
            date: String(data.get('date')),
            image: imageUrl,
            content: String(data.get('content'))
        }).where(eq(blog_posts.id, id));

        return { success: true };
    }
};