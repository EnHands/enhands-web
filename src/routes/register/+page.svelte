<script>
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    // This grabs the 'token' variable we returned from our +page.server.js load function
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let isSubmitting = $state(false);
    let errorMessage = $state('');

    /** @type {(e: Event) => Promise<void>} */
    async function handleRegister(e) {
        e.preventDefault();
        isSubmitting = true;
        errorMessage = '';

        // 1. Create the user using Better-Auth
        const { error } = await authClient.signUp.email({
            email,
            password,
            name
        });

        if (error) {
            errorMessage = error.message || 'Failed to create account.';
            isSubmitting = false;
            return;
        }

        // 2. If successful, shoot them straight into the admin dashboard!
        goto('/admin');
    }
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join the EnHands PR Team
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            You've been invited to manage the club's portal.
        </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            
            {#if errorMessage}
                <div class="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4 border border-red-200">
                    {errorMessage}
                </div>
            {/if}

            <form class="space-y-6" onsubmit={handleRegister}>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <div class="mt-1">
                        <input id="name" type="text" required bind:value={name} class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <div class="mt-1">
                        <input id="email" type="email" required bind:value={email} class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input id="password" type="password" required bind:value={password} minlength="8" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                </div>

                <input type="hidden" name="token" value={data.token}>

                <div>
                    <button type="submit" disabled={isSubmitting} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors">
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>