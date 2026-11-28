<script>
    import BlogPost from '$lib/components/BlogPost.svelte';

    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<svelte:head>
    <title>{data.post.title} – EnHands Blog</title>
</svelte:head>

<BlogPost
    title={data.post.title ?? ''}
    date={data.post.date}
    author={data.post.author}
    image={data.post.image}
    html={data.post.content ?? ''}
/>
