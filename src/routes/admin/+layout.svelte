<script>
    /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
    let { data, children } = $props();
    
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    async function handleLogout() {
        await authClient.signOut();
        goto('/login');
    }
</script>

<div class="flex bg-gray-100 font-sans">
    
    <aside class="w-64 bg-gray-200 flex flex-col justify-between">
        <div>
            <div class="p-6 border-b border-gray-800">
                <img class="h-10 w-auto mb-2" src="/images/logos/Enhands_Full_Logo.svg" alt="EnHands Logo">
                <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Club Portal</span>
            </div>
            
            <nav class="p-4 space-y-2">
                <a href="/admin/blog" class="block px-2 py-2 rounded-md text-blue-700 font-semibold hover:bg-gray-800 transition-colors">Blog Posts</a>
                
                {#if data.user.role === 'admin'}
                    <a href="/admin/members" class="block px-2 py-2 rounded-md text-blue-700 font-semibold hover:bg-gray-800 transition-colors">Members</a>
                    <a href="/admin/partners" class="block px-2 py-2 rounded-md text-blue-700 font-semibold hover:bg-gray-800 transition-colors">Partners</a>
                {/if}

                <a href="/admin/settings" class="block px-2 py-2 rounded-md text-blue-700 font-semibold hover:bg-gray-800 transition-colors">Settings</a>
            </nav>
        </div>

        <div class="p-4 border-t border-gray-800 bg-gray-200">
            <div class="mb-3">
                <p class="text-sm font-medium text-black">{data.user.name}</p>
                <p class="text-xs text-gray-400 capitalize">{data.user.role}</p>
            </div>
            <button onclick={handleLogout} class="w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out
            </button>
        </div>
    </aside>

    <main class="flex-1 w-full overflow-y-auto bg-gray-50 p-8">
        {@render children()}
    </main>

</div>