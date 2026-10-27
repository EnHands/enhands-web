// src/routes/blog/+page.server.js

import { db } from "$lib/server/db";
import { blog_posts } from "$lib/server/db/schema";
import { eq, desc } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    // 1. Welche Seite sind wir? (Standardmäßig 1)
    const page = Number(url.searchParams.get('page')) || 1;
    const POSTS_PER_PAGE = 6;
    
    // 2. Berechne den Offset (Seite 1 = 0 überspringen, Seite 2 = 10 überspringen, etc.)
    const offset = (page - 1) * POSTS_PER_PAGE;

    // 3. Hole nur die 10 Posts für die aktuelle Seite
    const posts = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.is_published, true))
        .orderBy(desc(blog_posts.date))
        .limit(POSTS_PER_PAGE)
        .offset(offset);

    // 4. (Optional aber empfohlen) Prüfe, ob es noch ältere Posts für eine "Next"-Seite gibt
    // Wir fragen einfach ab, ob es nach unserem Offset noch mehr als unsere 10 Posts gibt
    const nextPageCheck = await db.select()
        .from(blog_posts)
        .where(eq(blog_posts.is_published, true))
        .limit(1)
        .offset(offset + POSTS_PER_PAGE);

    const hasNextPage = nextPageCheck.length > 0;
    const hasPrevPage = page > 1;

    return { 
        posts,
        pagination: {
            currentPage: page,
            hasNextPage,
            hasPrevPage
        }
    };
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