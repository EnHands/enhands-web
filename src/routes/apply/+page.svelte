<script>
    // Svelte 5 state to handle the form data easily
    let isSubmitting = $state(false);
    let formData = $state({
        name: '',
        degree: '',
        semester: '',
        subteam: '',
        otherInterest: '',
        motivation: ''
    });

    /** @param {Event} e */
    async function handleSubmit(e) {
        e.preventDefault();
        isSubmitting = true;
        
        // TODO: Send formData and the CV file to your backend/Supabase
        console.log("Submitting:", formData);
        
        isSubmitting = false;
    }
</script>

<!-- Note: Update image paths to point to your static folder (e.g., /images/...) -->
<div class="bg-right bg-cover bg-fixed min-h-screen" style="background-image:url('/images/hand.jpg');">

    <!-- Main Content Container -->
    <div class="bg-white w-full sm:rounded-3xl sm:max-w-md mx-auto pt-12 pb-10 px-8 flex flex-col items-center gap-y-8 sm:px-8 lg:max-w-4xl lg:px-12 mb-10 shadow-xl mt-6">
        
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 w-full text-left">
            Apply for EnHands
        </h1>

        <div class="w-full text-lg text-gray-700 leading-relaxed space-y-4">
            <p>We are looking for new members in the winter semester!</p>
            <p>Joining EnHands gives you the special opportunity to work in a technical student club that at the same time has a strong social mission. We are a team from diverse backgrounds and degrees, involving Bachelor, Master, and PhD students as well as graduates. In our experience, it makes sense to join us if you’re at least in the 3rd Bachelor semester.</p>
            
            <h2 class="text-xl font-bold text-gray-900 mt-6">Open Positions</h2>
            <p>We are especially looking for new members in the following teams:</p>
            <ul class="list-disc list-inside space-y-2 ml-2">
                <li><b>Functional Hand subteam</b> with a focus on CAD design: <a href="#" class="text-blue-500 hover:text-blue-700">Job description</a></li>
                <li><b>Cosmetic Hand subteam</b> with a focus on <i>[TODO]</i>: <a href="#" class="text-blue-500 hover:text-blue-700">Job description</a></li>
                <li><b>User Feedback subteam</b> for data analysis and building partnerships with German hospitals: <a href="#" class="text-blue-500 hover:text-blue-700">Job description</a></li>
            </ul>
            <p class="mt-4">If you're interested in helping in a different sub-team, it is also possible to apply in general. Please let us know what you are most interested in.</p>

            <h2 class="text-xl font-bold text-gray-900 mt-6">Requirements</h2>
            <p>To work in a subteam, you should be able to:</p>
            <ul class="list-disc list-inside space-y-2 ml-2">
                <li><b>Attend the weekly online meetings:</b> Schedule depends on the subteam, see the job descriptions above.</li>
                <li><b>Invest at least 3-4h per week</b> into tasks for the subteam during the semester (except for the exam season).</li>
                <li><b>Attend the monthly workshops if possible</b> (every first Saturday of the month from 10am-3pm in Garching).</li>
            </ul>
            <p class="mt-4">If some requirements don't work for you at the moment (especially schedule conflicts), please don't hesitate to reach out either way and let us know, we will do our best to accommodate it.</p>
        </div>

        <!-- The Application Form -->
        <div class="w-full max-w-lg mt-8">
            <form onsubmit={handleSubmit} class="flex flex-col space-y-4 font-sans">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Application Form</h2>

                <div class="flex flex-col">
                    <label for="name" class="font-semibold text-sm mb-1 text-gray-800">Name</label>
                    <input type="text" id="name" required placeholder="Your full name" bind:value={formData.name} class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div class="flex flex-col">
                    <label for="degree" class="font-semibold text-sm mb-1 text-gray-800">Study Degree & Semester</label>
                    <div class="flex gap-2">
                        <input type="text" id="degree" required placeholder="e.g. B.Sc. Mechanical Engineering" bind:value={formData.degree} class="flex-2 p-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="number" id="semester" required min="1" max="20" placeholder="Sem." bind:value={formData.semester} class="flex-1 p-2.5 border border-gray-300 rounded-lg w-24 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="subteam" class="font-semibold text-sm mb-1 text-gray-800">Interested in Subteam</label>
                    <select id="subteam" required bind:value={formData.subteam} class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="" disabled>Select a subteam…</option>
                        <option value="mechanical">Cosmetic Hand Team</option>
                        <option value="electronics">Functional Hand Team</option>
                        <option value="software">User Feedback Team</option>
                        <option value="funding">Funding Team</option>
                        <option value="other">Something else/not sure yet</option>
                    </select>
                    
                    {#if formData.subteam === 'other'}
                        <textarea id="something-else" bind:value={formData.otherInterest} rows="2" placeholder="What would you most like to work on?" class="mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                    {/if}
                </div>

                <div class="flex flex-col">
                    <label for="cv" class="font-semibold text-sm mb-1 text-gray-800">CV</label>
                    <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" class="p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer" />
                </div>

                <div class="flex flex-col">
                    <label for="motivation" class="font-semibold text-sm mb-1 text-gray-800">Tell us more about you, relevant experience (if applicable), and why you want to join EnHands</label>
                    <textarea id="motivation" required bind:value={formData.motivation} rows="6" placeholder="Tell us what motivates you to join…" class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} class="mt-6 p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    </div>
</div>