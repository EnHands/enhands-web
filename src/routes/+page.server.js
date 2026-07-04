// src/routes/+page.server.js

import { db } from "$lib/server/db";
import { members } from "$lib/server/db/schema";
import { partners } from "$lib/server/db/schema";

export async function load() {
    /**
     * Shuffles an array in place
     * @param {any[]} array
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // If the database is unreachable the page still renders —
    // the team and partner sections simply stay hidden.
    try {
        // SUPABASE CALL:
        const people = await db.select().from(members);

        // SUPABASE CALL:
        const supporters = await db.select().from(partners);

        // We return the shuffled data to the frontend
        return {
            members: shuffleArray(people),
            partners: supporters
        };
    } catch (err) {
        console.error('Failed to load members/partners:', err);
        return { members: [], partners: [] };
    }
}
