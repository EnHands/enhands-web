import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { supabase } from '$lib/server/supabase'; // Using the SERVER-SIDE master key!

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    // 1. Verify the user is actually logged in via Better-Auth!
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        return json({ error: 'Unauthorized: You must be logged in.' }, { status: 401 });
    }

    try {
        // 2. Extract the file from the request
        const formData = await request.formData();
        const file = /** @type {File} */ (formData.get('file'));

        if (!file || !(file instanceof File)) {
            return json({ error: 'No valid file provided.' }, { status: 400 });
        }

        // 3. Upload the file to Supabase bypassing RLS using the Service Role Key
        const uniqueFileName = `blog-content/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        
        const { error: uploadError } = await supabase.storage
            .from('enhands-assets')
            .upload(uniqueFileName, file);

        if (uploadError) throw uploadError;

        // 4. Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from('enhands-assets')
            .getPublicUrl(uniqueFileName);

        // 5. Send the URL back to the Quill editor
        return json({ url: publicUrl });

    } catch (err) {
        console.error("Upload endpoint error:", err);
        return json({ error: 'Failed to upload image.' }, { status: 500 });
    }
}