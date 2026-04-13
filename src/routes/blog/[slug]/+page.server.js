// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // `params.slug` will be whatever the URL is (e.g., 'welcome-to-enhands')
    
    // 💡 FUTURE SUPABASE CALL: 
    // const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', params.slug).single();

    // Mock Database Search
    let posts = [
        { 
            slug: "welcome-to-enhands", 
            title: "Welcome to our new Website!", 
            date: "April 13, 2026", 
            author: "Marketing Team",
            image: "/images/hand.jpg",
            // In the future, this HTML will come straight from your Supabase database!
            content: "<p>We are so excited to launch the new site.</p><p>It uses SvelteKit!</p>" 
        }
    ];

    const post = posts.find(p => p.slug === params.slug);

    // If someone types a random URL like /blog/not-a-real-post, throw a 404
    if (!post) {
        error(404, 'Blog post not found');
    }

    return { post };
}