// src/routes/blog/+page.server.js

import { db } from "$lib/server/db";
import { blog_posts } from "$lib/server/db/schema";
import { desc } from 'drizzle-orm';

export async function load() {
    // SUPABASE CALL: 
    const posts = await db.select()
    .from(blog_posts)
    .orderBy(desc(blog_posts.date));

    return { posts };
}


/*
let posts = [
        { 
            slug: "welcome-to-enhands", 
            title: "Welcome to our new Website!", 
            date: "April 13, 2026", 
            author: "Marketing Team",
            excerpt: "We finally migrated our club website to SvelteKit and Supabase...",
            image: "/images/hand.jpg"
        },
        { 
            slug: "v2-prototype-testing", 
            title: "Testing the V2 Prototype", 
            date: "March 20, 2026", 
            author: "Engineering Team",
            excerpt: "Last week we took our newest mechanical fingers to the lab...",
            image: "/images/logos/Enhands_Blog.svg"
        }
    ];*/