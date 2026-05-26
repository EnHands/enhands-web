import { db } from '$lib/server/db';
import { invite_tokens } from '$lib/server/db/schema';
import { eq, gt, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
    const token = url.searchParams.get('token');

    if (!token) {
        throw error(401, 'No invite token provided. You must be invited to join EnHands.');
    }

    // Check if token exists and is not expired
    const [validToken] = await db.select()
        .from(invite_tokens)
        .where(
            and(
                eq(invite_tokens.id, token), 
                gt(invite_tokens.expires_at, new Date())
            )
        );

    if (!validToken) {
        throw error(401, 'This invite link is invalid or has expired.');
    }

    return { token };
};