<!--
    The visual blog post (title, meta line, thumbnail, content).
    Used by the public post page AND the admin live preview, so both always look identical.
-->
<script>
    /**
     * @type {{
     *   title: string,
     *   date?: string | null,
     *   author?: string | null,
     *   editors?: string | null,
     *   image?: string | null,
     *   html: string
     * }}
     */
    let { title, date, author, editors, image, html } = $props();
</script>

<div class="bg-white w-full sm:rounded-3xl sm:max-w-md mx-auto pt-12 pb-2 px-8 items-center gap-y-16 gap-x-8 sm:px-8 sm:pt-12 sm:pb-2 lg:max-w-4xl lg:px-8 mb-10">

    <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-none text-gray-900">
        {title}
    </h1>

    <div class="flex flex-wrap mb-8 mt-4">
        <div class="text-sm md:text-base font-medium text-blue-500 uppercase">{date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</div>
        <div class="ml-4 mr-4 text-sm md:text-base font-medium text-gray-400">|</div>
        <div class="text-sm md:text-base font-medium text-gray-700">{author}</div>
        {#if editors?.trim()}
            <div class="ml-4 mr-4 text-sm md:text-base font-medium text-gray-400">|</div>
            <div class="text-sm md:text-base font-medium text-gray-500">Edited by {editors.trim()}</div>
        {/if}
    </div>

    {#if image}
        <div class="mb-8 overflow-hidden relative box-border">
            <img src={image} alt={title} class="rounded object-cover block w-full self-center aspect-3/2">
        </div>
    {/if}

    <div class="prose lg:prose-lg max-w-none text-gray-800">
        {@html html}
    </div>

</div>
