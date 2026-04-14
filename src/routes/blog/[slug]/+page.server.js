// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blog_posts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm'; // Drizzle's "equals" helper

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // `params.slug` will be whatever the URL is (e.g., 'welcome-to-enhands')
    
    // SUPABASE CALL: 
    // 1. Search the database for a row where the 'slug' column equals the URL params.slug
    const result = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.slug, params.slug))
        .limit(1); // We only expect one post to match a unique slug!

    // 2. Extract the single post from the results array
    const post = result[0];

    // If someone types a random URL like /blog/not-a-real-post, throw a 404
    if (!post) {
        error(404, 'Blog post not found');
    }

    return { post };
}