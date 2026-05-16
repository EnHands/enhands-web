<script>
    import { enhance } from '$app/forms';

    /** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
    let { data, form } = $props();

    // Local state to toggle the "Add Member" form visibility
    let showAddForm = $state(false);

    // Local state to track if we are currently uploading
    let isUploading = $state(false);

    // Local state to track which member is currently being edited (if any)
    /** @type {import('./$types').PageData['allMembers'][0] | null} */
    let editingMember = $state(null);
</script>

<div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Member Management</h1>
        <button 
            onclick={() => showAddForm = !showAddForm}
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            {showAddForm ? 'Cancel' : '+ Add New Member'}
        </button>
    </div>

    {#if showAddForm}
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 fade-in">
            <h2 class="text-xl font-bold mb-4">Add a Club Member</h2>
            
            <form method="POST" action="?/add" enctype="multipart/form-data" use:enhance={() => {
                isUploading = true;
                return async ({ update }) => {
                    await update();
                    isUploading = false;
                    showAddForm = false;
                };
            }} class="space-y-4">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="name" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Job / Role</label>
                        <input name="job" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                        <input name="img" type="file" accept="image/*" required class="w-full border border-gray-300 rounded-lg px-3 py-1.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Hover Image</label>
                        <input name="img_hover" type="file" accept="image/*" required class="w-full border border-gray-300 rounded-lg px-3 py-1.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isUploading}
                    class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm mt-2">
                    {#if isUploading}
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Uploading files...
                    {:else}
                        Save Member
                    {/if}
                </button>
            </form>
        </div>
    {/if}
    
    {#if editingMember}
        <div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 fade-in">
            <div class="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full z-50">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">Edit {editingMember.name}</h2>
                    <button onclick={() => editingMember = null} class="text-gray-500 hover:text-gray-800 font-bold text-xl">&times;</button>
                </div>
                
                <form method="POST" action="?/edit" enctype="multipart/form-data" use:enhance={() => {
                    isUploading = true;
                    return async ({ update }) => {
                        await update();
                        isUploading = false;
                        editingMember = null; // Close the modal on success
                    };
                }} class="space-y-4">
                    
                    <input type="hidden" name="id" value={editingMember.id}>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input name="name" type="text" required bind:value={editingMember.name} class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Job / Role</label>
                            <input name="job" type="text" required bind:value={editingMember.job} class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        </div>
                        
                        <div class="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p class="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Leave blank to keep existing images</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">New Profile Image</label>
                                    <input name="img" type="file" accept="image/*" class="w-full text-sm">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">New Hover Image</label>
                                    <input name="img_hover" type="file" accept="image/*" class="w-full text-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick={() => editingMember = null} class="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isUploading} class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                            {isUploading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    {/if}

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {#each data.allMembers as member}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                
                <div class="aspect-square relative group overflow-hidden bg-gray-100">
                    <img src={member.img} alt={member.name} class="w-full h-full object-cover">
                        <div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                            <button 
                                onclick={() => editingMember = member} 
                                class="bg-blue-600/90 backdrop-blur text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-blue-700 transition-colors">
                                Edit
                            </button>
                            <form method="POST" action="?/delete" use:enhance>
                                <input type="hidden" name="id" value={member.id}>
                                <button type="submit" class="bg-red-600/90 backdrop-blur text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-red-700 transition-colors" onclick={(e) => { if(!confirm('Are you sure you want to delete this member?')) e.preventDefault(); }}>
                                    Delete
                                </button>
                            </form>
                        </div>
                </div>
                
                <div class="p-4 text-center">
                    <h3 class="font-bold text-lg text-gray-900 leading-tight mb-1">{member.name}</h3>
                    <p class="text-gray-500 text-sm leading-tight">{member.job}</p>
                </div>
            </div>
        {/each}
    </div>
</div>