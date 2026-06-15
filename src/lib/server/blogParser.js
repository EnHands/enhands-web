import unzipper from 'unzipper';
import { supabase } from '$lib/server/supabase';

/**
 * Parses a zipped blog folder containing a .md file and an images directory
 * @param {Buffer} zipBuffer 
 * @returns {Promise<{ markdown: string, imagesUploaded: string[] }>}
 */
export async function parseBlogZip(zipBuffer) {
    const directory = await unzipper.Open.buffer(zipBuffer);
    
    let markdownContent = '';
    const imageMap = new Map(); // Maps local filenames (e.g., 'photo.jpg') to Supabase Public URLs
    const imagesUploaded = [];

    // 1. First pass: Find the markdown file and extract image buffers
    for (const file of directory.files) {
        if (file.path.endsWith('.md') && !file.path.startsWith('__MACOSX')) {
            const buffer = await file.buffer();
            markdownContent = buffer.toString('utf-8');
        } 
        else if (file.type === 'File' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.path)) {
            const buffer = await file.buffer();
            const filename = file.path.split('/').pop(); // Get just 'image.jpg'
            
            // Upload to Supabase Storage bypass RLS using your Server Key
            const uniquePath = `blog-content/${crypto.randomUUID()}-${filename}`;
            const { error } = await supabase.storage
                .from('enhands-assets')
                .upload(uniquePath, buffer, {
                    contentType: `image/${file.path.split('.').pop()}`
                });

            if (!error) {
                const { data: { publicUrl } } = supabase.storage
                    .from('enhands-assets')
                    .getPublicUrl(uniquePath);
                
                imageMap.set(filename, publicUrl);
                imagesUploaded.push(publicUrl);
            }
        }
    }

    if (!markdownContent) {
        throw new Error('No .md file found in the zip folder.');
    }

    // 2. Second pass: Regex search and replace local image paths with Supabase URLs
    // This catches standard markdown: ![alt](images/pic.jpg) or ![alt](./pic.png) or ![alt](pic.webp)
    imageMap.forEach((publicUrl, originalName) => {
        // Dynamic regex matching the filename regardless of relative folder paths
        const regex = new RegExp(`\\((?:\\.\\/|images\\/)?${originalName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\)`, 'g');
        markdownContent = markdownContent.replace(regex, `(${publicUrl})`);
    });

    return { markdown: markdownContent, imagesUploaded };
}