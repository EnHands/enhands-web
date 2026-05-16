// src/routes/admin/+layout.server.js
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth'; // Ensure this points to Better-Auth server config

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
    // 1. Check if the user has a valid session cookie
    const session = await auth.api.getSession({
        headers: request.headers
    });

    // 2. If no session exists, kick them to the login page immediately
    if (!session) {
        throw redirect(302, '/login');
    }

    // 3. Pass the user data to the frontend so we can display their name/role!
    return {
        user: session.user
    };
}