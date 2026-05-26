// src/lib/auth-client.js
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
    // This tells the client where your server is running
    // baseURL: "http://localhost:5173" 
    // By omitting baseURL entirely (or leaving it blank), Better-Auth safely 
    // uses relative paths (e.g., /api/auth/*) based on the active browser tab!
});