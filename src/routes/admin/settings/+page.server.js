import { db } from '$lib/server/db';
import { invite_tokens } from '$lib/server/db/schema';

/** @type {import('./$types').Actions} */
export const actions = {
    generateInvite: async ({ locals }) => {
        const token = crypto.randomUUID();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        
        await db.insert(invite_tokens).values({
            id: token,
            expires_at: new Date(Date.now() + oneDayInMs),
            created_by: locals.user.name
        });

        return { inviteLink: `/register?token=${token}` };
    }
};