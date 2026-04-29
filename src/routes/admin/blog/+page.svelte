<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import { authClient } from '$lib/auth-client';
    
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();

    let isEditorOpen = $state(false);

    /** @type {import('quill').default | null} */
    let quill = $state(null);

    /** @type {HTMLDivElement | null} */
    let editorContainer = $state(null);

    /** @type {string | null} */
    let editingPostId = $state(null);
    
    // Form States
    let title = $state('');
    let slug = $derived(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    let author = $state(''); // Default to current user in the effect below
    let date = $state(new Date().toISOString().split('T')[0]); // Default to today (YYYY-MM-DD)
    let isUploading = $state(false);

    $effect(() => {
        if (data.user?.name && !author && !editingPostId) {
            author = data.user.name;
        }
    });

    /** @param {File} file */
    async function uploadEditorImage(file) {
        // 1. Pack the file into a FormData object
        const formData = new FormData();
        formData.append('file', file);

        // 2. Shoot it over to our secure SvelteKit API endpoint
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Upload failed');
        }

        // 3. Extract and return the URL!
        const data = await response.json();
        return data.url;
    }

    /** @param {import('./$types').PageData['posts'][0]} post */
    function openEditModal(post) {
        editingPostId = post.id;
        title = post.title ?? '';
        slug = post.slug ?? '';
        author = post.author ?? '';
        date = post.date ?? '';
        isEditorOpen = true;
        
        // We wait for the editor to initialize, then set content
        setTimeout(() => {
            if (quill){ 
                quill.root.innerHTML = post.content ?? '';
            }
        }, 100);
    }

    // Initialize Quill only when the editor opens
    $effect(() => {
        if (isEditorOpen && editorContainer && !quill) {
            const container = editorContainer;
            import('quill').then((QuillModule) => {
                const Quill = QuillModule.default;
                const instance = new Quill(container, {
                    theme: 'snow',
                    placeholder: 'Write your story here...',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link', 'image', 'clean']
                        ]
                    }
                });

                instance.root.addEventListener('drop', async (e) => {
                    e.preventDefault();
                    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const file = e.dataTransfer.files[0];
                        if (file.type.startsWith('image/')) {
                            const url = await uploadEditorImage(file);
                            const range = instance.getSelection();
                            if (range) {
                                instance.insertEmbed(range.index, 'image', url);
                            }
                        }
                    }
                }, false);

                quill = instance;
                /** @type {any} */
                const toolbar = instance.getModule('toolbar');
                toolbar.addHandler('image', () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        // 2. Satisfy 'input.files is possibly null'
                        if (input.files && input.files.length > 0) {
                            const file = input.files[0];
                            const url = await uploadEditorImage(file);
                            
                            // 3. Re-verify 'instance' (quill) and selection range
                            const range = instance.getSelection();
                            if (range) {
                                instance.insertEmbed(range.index, 'image', url);
                            } else {
                                // If user clicked away, just stick it at the end
                                instance.insertEmbed(instance.getLength(), 'image', url);
                            }
                        }
                    };
                });
            });
        }
    });

    function closeEditor() {
        isEditorOpen = false;
        editingPostId = null; // CRITICAL: Reset the ID
        quill = null;
        title = '';
        author = data.user.name; // Reset to current user
        date = new Date().toISOString().split('T')[0];
    }
</script>

<div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Blog Management</h1>
        <button onclick={() => { editingPostId = null; isEditorOpen = true;}} class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md">
            + New Post
        </button>
    </div>

    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

    {#if isEditorOpen}
        <div class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
                <form 
                    method="POST" 
                    action={editingPostId ? "?/update" : "?/create"} 
                    enctype="multipart/form-data"
                    use:enhance={({ formData }) => {
                        if (!quill) return;
                        isUploading = true;
                        formData.append('content', quill.root.innerHTML);
                        
                        return async ({ update }) => {
                            await update();
                            isUploading = false;
                            closeEditor();
                        };
                    }}
                    class="flex flex-col h-full"
                >
                    <div class="p-6 border-b flex justify-between items-center bg-gray-50">
                        <input bind:value={title} name="title" placeholder="Post Title" class="text-2xl font-bold bg-transparent border-none focus:ring-0 w-full" required />
                        <button type="button" onclick={closeEditor} class="text-gray-400 hover:text-gray-600 text-2xl px-2">&times;</button>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border-b">
                        <div>
                            <label for="post-slug" class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug</label>
                            <input id="post-slug" bind:value={slug} name="slug" placeholder="welcome-post" class="w-full text-sm border-gray-200 rounded-md" required />
                        </div>
                        <div>
                            <label for="post-author" class="block text-xs font-bold uppercase text-gray-500 mb-1">Author</label>
                            <input id="post-author" bind:value={author} name="author" class="w-full text-sm border-gray-200 rounded-md" required />
                        </div>
                        <div>
                            <label for="post-date" class="block text-xs font-bold uppercase text-gray-500 mb-1">Date</label>
                            <input id="post-date" bind:value={date} type="date" name="date" class="w-full text-sm border-gray-200 rounded-md" required />
                        </div>
                        <div>
                            <label for="post-thumbnail" class="block text-xs font-bold uppercase text-gray-500 mb-1">Thumbnail</label>
                            <input id="post-thumbnail" type="file" name="image" accept="image/*" class="w-full text-xs" required />
                        </div>
                    </div>

                    <div class="flex-1 overflow-hidden p-6 bg-white">
                        <div bind:this={editorContainer} class="h-full"></div>
                    </div>

                    <div class="p-4 border-t bg-gray-50 flex justify-end space-x-3">
                        <button type="button" onclick={closeEditor} class="px-6 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" disabled={isUploading} class="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                            {isUploading ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </div>
                    {#if editingPostId}
                        <input type="hidden" name="id" value={editingPostId} />
                    {/if}
                </form>
            </div>
        </div>
    {/if}

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left">
            <thead class="bg-gray-50 border-b">
                <tr>
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Title</th>
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Author</th>
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                {#each data.posts as post}
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                        <td class="px-6 py-4 text-right flex justify-end space-x-4">
                            <button 
                                onclick={() => openEditModal(post)}
                                class="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                Edit
                            </button>
                            <form method="POST" action="?/delete" use:enhance class="inline">
                                <input type="hidden" name="id" value={post.id} />
                                <button 
                                    class="text-red-600 hover:text-red-800 font-medium text-sm"
                                    onclick={(e) => { if(!confirm('Are you sure you want to delete this post? This cannot be undone.')) e.preventDefault(); }}>
                                    Delete
                                </button>
                            </form>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>