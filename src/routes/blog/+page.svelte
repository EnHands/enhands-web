<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 flex flex-col items-center text-center">
    <img class="h-20 sm:h-24" src="/images/logos/Enhands_Blog.svg" alt="EnHands Blog">
    <p class="mt-3 text-lg sm:text-xl font-semibold text-gray-700">The latest updates from EnHands</p>
</div>

<div class="max-w-2xl lg:max-w-5xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
    <div class="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {#each data.posts as post}
            <a href="/blog/{post.slug}"
                class="block group bg-white rounded-2xl overflow-hidden ring-1 ring-gray-900/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <div class="overflow-hidden h-48">
                    <img src={post.image} alt={post.title}
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                </div>
                <div class="p-5 sm:p-6">
                    <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{post.title}</h3>
                    <p class="text-sm text-gray-500 mt-2">{post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} | {post.author}</p>
                </div>
            </a>
        {/each}
    </div>
</div>
