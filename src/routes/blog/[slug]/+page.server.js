// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blog_posts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm'; // Drizzle's "equals" helper
import { marked } from 'marked'; // Import the marked library for Markdown parsing

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const result = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.slug, params.slug))
        .limit(1); // We only expect one post to match a unique slug!

    // 2. Extract the single post from the results array
    const post = result[0];
        
    if (!post.content) {
        throw error(404, 'Post content not found');
    }

    // Prüfen: Wenn der Inhalt NICHT mit einem HTML-Tag beginnt, ist es Markdown
    if (!post.content.trim().startsWith('<')) {
        // Custom Block Replacement for the side-by-side images!
        let customMarkdown = post.content;
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
        post.content = await Promise.resolve(marked.parse(customMarkdown));
    }
    

    return { post };
};