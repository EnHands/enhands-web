<script>
    import { enhance } from '$app/forms';

    // We pull in 'data' for the user role check, and 'form' to catch the server's response!
    /** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
    let { data, form } = $props();

    let isGenerating = $state(false);
    let copied = $state(false);

    // A handy helper to copy the full URL to the clipboard
    function copyLink() {
        if (form?.inviteLink) {
            // window.location.origin grabs "http://localhost:5173" or your Vercel URL automatically
            const fullUrl = `${window.location.origin}${form.inviteLink}`;
            navigator.clipboard.writeText(fullUrl);
            copied = true;
            
            // Reset the 'Copied!' text after 2 seconds
            setTimeout(() => copied = false, 2000);
        }
    }
</script>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-900">Team Management</h2>
            <p class="text-sm text-gray-500 mt-1">Generate one-time invite links for new team members.</p>
        </div>

        <div class="p-6">
            {#if data.user?.role === 'admin'}
                <form method="POST" action="?/generateInvite" use:enhance={() => {
                    isGenerating = true;
                    copied = false; // Reset the copy state on a new generation
                    
                    return async ({ update }) => {
                        await update();
                        isGenerating = false;
                    };
                }}>
                    <button 
                        type="submit" 
                        disabled={isGenerating}
                        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:bg-gray-400"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Team member Invite'}
                    </button>
                </form>

                {#if form?.inviteLink}
                    <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg fade-in">
                        <p class="text-sm font-bold text-green-800 mb-2">Invite Link Generated Successfully!</p>
                        <div class="flex items-center space-x-2">
                            <input 
                                type="text" 
                                readonly 
                                value={`${window.location.origin}${form.inviteLink}`} 
                                class="flex-1 bg-white border border-green-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none"
                            />
                            <button 
                                onclick={copyLink} 
                                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors w-28"
                            >
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                        </div>
                        <p class="text-xs text-green-600 mt-2">This link will expire in 24 hours and can only be used once.</p>
                    </div>
                {/if}
            {:else}
                <div class="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
                    You do not have permission to generate invite links. Only administrators can add new team members.
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .fade-in {
        animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>