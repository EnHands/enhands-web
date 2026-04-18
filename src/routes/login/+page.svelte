<script>
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    let email = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    /**
     * Handles the form submission
     * @param {SubmitEvent} event
     */
    async function handleLogin(event) {
        event.preventDefault();
        isLoading = true;
        errorMessage = '';

        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password
        });

        if (error) {
            errorMessage = error.message || "Invalid email or password";
            isLoading = false;
        } else {
            // If successful, teleport them to the admin dashboard!
            goto('/admin');
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style="background-image:url('/images/hand.jpg');">
    
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl z-10">
        
        <div class="flex flex-col items-center">
            <img class="h-16 w-auto" src="/images/logos/Enhands_Full_Logo.svg" alt="EnHands Logo">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Club Portal
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Sign in to manage the website
            </p>
        </div>

        <form class="mt-8 space-y-6" onsubmit={handleLogin}>
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" required bind:value={email}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email address">
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" name="password" type="password" required bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password">
                </div>
            </div>

            {#if errorMessage}
                <div class="text-red-500 text-sm text-center font-medium fade-in">
                    {errorMessage}
                </div>
            {/if}

            <div>
                <button type="submit" disabled={isLoading}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
                    {#if isLoading}
                        Signing in...
                    {:else}
                        Sign In
                    {/if}
                </button>
            </div>
        </form>
    </div>
    
    <div class="absolute inset-0 bg-black opacity-30"></div>
</div>