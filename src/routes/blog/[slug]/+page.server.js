// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blog_posts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm'; // Drizzle's "equals" helper
import { marked } from 'marked'; // Import the marked library for Markdown parsing

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    // 1. Hole die veröffentlichten Posts aus der Datenbank
    const rawPosts = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.is_published, true))
        .orderBy(desc(blog_posts.date));

    // 2. Map über die Posts und konvertiere sie bei Bedarf
    const processedPosts = await Promise.all(rawPosts.map(async (post) => {
        let finalHtml = post.content;
        
        if (!finalHtml) {
            throw error(404, 'Post content not found');
        }

        // Prüfen: Wenn der Inhalt NICHT mit einem HTML-Tag beginnt, ist es Markdown
        if (!finalHtml.trim().startsWith('<')) {
            // Custom Block Replacement for the side-by-side images!
            let customMarkdown = finalHtml
            // Replaces "::: GRID \n ... \n :::" with custom Tailwind grid divs
            customMarkdown = customMarkdown.replace(
                /:::\s*GRID\n([\s\S]*?)\n:::/g,
                (match, innerContent) => {
                    // 1. Compile the Markdown into HTML *before* wrapping it in the div.
                    // Using parseInline prevents marked from wrapping the images in a <p> tag.
                    let compiledImages = /** @type {string} */ (marked.parseInline(innerContent.trim()));
                    
                    // 2. Strip out any stray <br> tags marked generated from your enter keys.
                    // (CSS Grids treat <br> tags as grid items, which ruins the side-by-side layout!)
                    
                    compiledImages = compiledImages.replace(/<br\s*\/?>/gi, '');

                    // 3. Wrap our perfectly clean images in the Tailwind grid.
                    return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">\n${compiledImages}\n</div>`;
                }
            );
            // Konvertiere das Markdown zu HTML.
            // (Promise.resolve fängt Fälle ab, in denen marked async genutzt wird)
            finalHtml = await Promise.resolve(marked.parse(customMarkdown));
        }

        return {
            ...post,
            content: finalHtml // Wir überschreiben den Inhalt mit dem fertigen HTML
        };
    }));

    return { 
        posts: processedPosts 
    };
};