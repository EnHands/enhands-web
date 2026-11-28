// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blog_posts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm'; // Drizzle's "equals" helper
import { renderBlogMarkdown } from '$lib/markdown';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const result = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.slug, params.slug))
        .limit(1); // We only expect one post to match a unique slug!

    // 2. Extract the single post from the results array
    const post = result[0];
        
    if (!post || !post.content) {
        throw error(404, 'Post content not found');
    }

    // Prüfen: Wenn der Inhalt NICHT mit einem HTML-Tag beginnt, ist es Markdown
    if (!post.content.trim().startsWith('<')) {
        post.content = renderBlogMarkdown(post.content);
    }
    

    return { post };
};