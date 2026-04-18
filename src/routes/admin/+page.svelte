<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {data.user.name}!</h1>
    <p class="text-gray-600 mb-8">Select an option from the sidebar to manage the EnHands website.</p>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">System Status</h2>
        <ul class="space-y-3">
            <li class="flex items-center text-sm text-gray-600">
                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span> Database Connected
            </li>
            <li class="flex items-center text-sm text-gray-600">
                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span> Authentication Active
            </li>
            <li class="flex items-center text-sm text-gray-600">
                <span class="w-3 h-3 {data.user.role === 'admin' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full mr-3"></span> 
                Clearance Level:  <strong class="ml-1 uppercase">{data.user.role}</strong>
            </li>
        </ul>
    </div>
</div>