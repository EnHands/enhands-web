<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<svelte:head>
    <title>EnHands Blog</title>
</svelte:head>

<div class="w-auto mx-10 p-6 flex flex-col mb-8 items-center">
    <span class="whitespace-nowrap container flex items-end justify-center w-full mt-6">
        <img class="h-24 inline-block" src="/images/logos/Enhands_Blog.svg" alt="EnHands Blog">
    </span>
    <span class="whitespace-nowrap container flex items-end justify-center w-full sm:mt-2">
        <p class="font-bold text-xl text-gray-700">The latest updates from EnHands</p>
    </span>
</div>

<div class="bg-white sm:rounded-3xl max-w-2xl mx-auto pb-3 pt-6 px-8 items-center gap-y-16 gap-x-8 sm:pb-1 sm:pt-12 lg:max-w-5xl lg:px-8 mb-10">
    <div class="grid gap-8 lg:grid-cols-2">
        {#each data.posts as post}
            <a href="/blog/{post.slug}" class="block group">
                <div class="rounded-lg overflow-hidden mb-4 aspect-3/2">
                    <img src={post.image} alt={post.title} class="w-full h-full object-cover transition-transform group-hover:scale-105">
                </div>
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600">{post.title}</h3>
                <p class="text-sm text-gray-500 mb-2">{post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} | {post.author}</p>
            </a>
        {/each}
    </div>
    <!-- NEU: Die Paginierungs-Buttons -->
    <div class="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
        <div>
            {#if data.pagination.hasPrevPage}
                <a 
                    href="?page={data.pagination.currentPage - 1}" 
                    class="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center"
                >
                    &larr; Neuere Beiträge
                </a>
            {/if}
        </div>

        <span class="text-sm text-gray-500 font-medium">
            Seite {data.pagination.currentPage}
        </span>

        <div>
            {#if data.pagination.hasNextPage}
                <a 
                    href="?page={data.pagination.currentPage + 1}" 
                    class="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center"
                >
                    Ältere Beiträge &rarr;
                </a>
            {/if}
        </div>
    </div>
</div>