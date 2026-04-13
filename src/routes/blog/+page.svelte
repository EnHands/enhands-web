<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

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
                <div class="rounded-lg overflow-hidden mb-4 h-48">
                    <img src={post.image} alt={post.title} class="w-full h-full object-cover transition-transform group-hover:scale-105">
                </div>
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600">{post.title}</h3>
                <p class="text-sm text-gray-500 mb-2">{post.date} | {post.author}</p>
                <p class="text-gray-700 line-clamp">{post.excerpt}</p>
            </a>
        {/each}
    </div>
</div>