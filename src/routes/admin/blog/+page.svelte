<script>
    import { enhance } from '$app/forms';
    import { marked } from 'marked';

    let isUploadingImages = $state(false);

    /** @param {Event} e */
    async function handleImageUpload(e) {
        const input = /** @type {HTMLInputElement} */ (e.target);
        if (!input.files || input.files.length === 0) return;

        isUploadingImages = true;
        const files = Array.from(input.files);
        
        try {
            // Upload all images simultaneously for speed
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                // We reuse the API endpoint from your original Quill setup
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
                const data = await response.json();
                return data.url;
            });

            // Wait for all uploads to finish and get the URLs
            const uploadedUrls = await Promise.all(uploadPromises);

            // Construct the Markdown!
            let newMarkdown = '\n\n';
            
            // The "Cool Feature" Trigger
            if (uploadedUrls.length === 2) {
                newMarkdown += '::: GRID\n';
                newMarkdown += `![Image 1](${uploadedUrls[0]})\n`;
                newMarkdown += `![Image 2](${uploadedUrls[1]})\n`;
                newMarkdown += ':::\n';
            } else {
                // Standard vertical stack for 1 image, or 3+ images
                uploadedUrls.forEach((url, index) => {
                    newMarkdown += `![Image ${index + 1}](${url})\n`;
                });
            }

            // Append the new markup to the editor
            markdownText += newMarkdown;

        } catch (err) {
            console.error("Image upload error:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload images.';
            alert(errorMessage);
        } finally {
            isUploadingImages = false;
            input.value = ''; // Reset the input so they can upload the same image again if needed
        }
    }

    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();

    let isEditorOpen = $state(false);
    /** @type {string | null} */
    let editingPostId = $state(null);
    let isImportingZip = $state(false);
    
    // Form States
    let title = $state('');
    let slug = $derived(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    let author = $state('');
    let date = $state(new Date().toISOString().split('T')[0]);
    let isUploading = $state(false);

    // Markdown specific states
    let markdownText = $state(''); 
    
    // Svelte 5 derived rune to instantly compile HTML as you type
    let renderedHtml = $derived.by(() => {
        if (!markdownText) return '';
        
        let customMarkdown = markdownText;
        
        // Custom Block Replacement for the side-by-side images!
        // Replaces "::: GRID \n ... \n :::" with custom Tailwind grid divs
        customMarkdown = customMarkdown.replace(
            /:::\s*GRID\n([\s\S]*?)\n:::/g,
            (match, innerContent) => {
                // 1. Compile the Markdown into HTML *before* wrapping it in the div.
                // Using parseInline prevents marked from wrapping the images in a <p> tag.
                let compiledImages = /** @type {string} */ (marked.parseInline(innerContent.trim()));
                
                // 2. Strip out any stray <br> tags marked generated from your enter keys.
                // (CSS Grids treat <br> tags as grid items, which ruins the side-by-side layout!)
                
                compiledImages = compiledImages.replace(/<br\s*\/?>/gi, '');

                // 3. Wrap our perfectly clean images in the Tailwind grid.
                return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">\n${compiledImages}\n</div>`;
            }
        );

        return marked.parse(customMarkdown, { breaks: true });
    });

    $effect(() => {
        if (data.user?.name && !author && !editingPostId) {
            author = data.user.name;
        }
    });

    /** @param {import('./$types').PageData['posts'][0]} post */
    function openEditModal(post) {
        editingPostId = post.id;
        title = post.title ?? '';
        slug = post.slug ?? '';
        author = post.author ?? '';
        date = post.date ?? '';
        
        // Load the raw markdown from the database into the editor
        markdownText = post.content ?? ''; 
        isEditorOpen = true;
    }

    function closeEditor() {
        isEditorOpen = false;
        editingPostId = null;
        markdownText = '';
        title = '';
        author = data.user?.name ?? '';
        date = new Date().toISOString().split('T')[0];
    }
</script>

<div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Blog Management</h1>
        <button 
            onclick={() => { editingPostId = null; isEditorOpen = true; }} 
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md"
        >
            + New Post
        </button>
    </div>

    {#if isEditorOpen}
        <div class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
                <form id="zip-upload-form" method="POST" action="?/importZip" enctype="multipart/form-data" class="hidden" use:enhance={() => {
                    isImportingZip = true;
                    return async ({ result }) => {
                        if (result.type === 'success') {
                            /** @type {{ markdown?: string }} */
                            const data = result.data || {};
                            markdownText = data.markdown || '';
                        } else if (result.type === 'failure') {
                            /** @type {{ error?: string }} */
                            const data = result.data || {};
                            alert(data.error || 'Failed to import ZIP file.');
                        }
                        isImportingZip = false;
                        
                        // Clear the input so the same file can be uploaded again if needed
                        const fileInput = /** @type {HTMLInputElement | null} */ (document.getElementById('hidden-zip-input'));
                        if (fileInput) fileInput.value = '';
                    };
                }}>
                    <input 
                        id="hidden-zip-input"
                        type="file" 
                        name="zipFile" 
                        accept=".zip" 
                        onchange={(e) => {
                            const target = /** @type {HTMLInputElement} */ (e.target);
                            target.form?.requestSubmit();
                        }}
                    />
                </form>

                <form 
                    method="POST" 
                    action={editingPostId ? "?/update" : "?/create"} 
                    enctype="multipart/form-data"
                    use:enhance={({ formData }) => {
                        isUploading = true;
                        
                        // CRITICAL: We save the raw markdown to the DB, not the HTML!
                        formData.append('content', markdownText);
                        
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
                            <input id="post-thumbnail" type="file" name="image" accept="image/*" class="w-full text-xs" />
                        </div>
                    </div>

                    <div class="flex-1 flex overflow-hidden h-full bg-gray-100">
                        <div class="w-1/2 h-full border-r border-gray-300 flex flex-col bg-gray-900 text-gray-100 p-4 shadow-inner">
                            <div class="text-xs uppercase font-bold text-gray-400 mb-3 tracking-wider flex justify-between items-center">
                                <span>Markdown Editor</span>
                                <div class="flex items-center space-x-3">
                                    <span class="text-blue-400 text-[10px] bg-blue-900/30 px-2 py-1 rounded">Pro-Tip: Wrap images in ::: grid</span>
                                    
                                    <label class="cursor-pointer bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center transition-colors shadow-sm">
                                        {isUploadingImages ? '⏳ Uploading...' : '🖼️ Add Image(s)'}
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            class="hidden" 
                                            onchange={handleImageUpload} 
                                        />
                                    </label>

                                    <label for="hidden-zip-input" class="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center transition-colors shadow-sm">
                                        {isImportingZip ? '⏳ Extracting...' : '📥 Import .ZIP'}
                                    </label>
                                </div>
                            </div>
                            <textarea 
                                bind:value={markdownText}
                                placeholder="# Write your heading here..." 
                                class="w-full flex-1 bg-transparent text-gray-200 font-mono text-sm border-none p-0 focus:ring-0 resize-none h-full outline-none"
                            ></textarea>
                        </div>

                        <div class="w-1/2 h-full overflow-y-auto bg-white p-8 prose max-w-none shadow-inner">
                            <div class="text-xs uppercase font-bold text-gray-400 mb-6 tracking-wider border-b pb-2 select-none">
                                Live Preview
                            </div>
                            {@html renderedHtml}
                        </div>
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
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                {#each data.posts as post}
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                        <td class="px-6 py-4">
                            {#if post.is_published}
                                <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Published</span>
                            {:else}
                                <span class="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">Draft</span>
                            {/if}
                        </td>
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