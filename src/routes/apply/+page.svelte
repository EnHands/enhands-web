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

<!-- Link to a job description PDF, with a document icon in front of the label. -->
{#snippet pdfLink(/** @type {string} */ href, /** @type {string} */ text = 'Details')}
    <a {href} target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 align-baseline text-blue-500 hover:text-blue-700">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {text}
    </a>
{/snippet}

<!-- Note: Update image paths to point to your static folder (e.g., /images/...) -->
<div class="bg-right bg-cover bg-fixed min-h-screen" style="background-image:url('/images/hand.jpg');">

    <!-- Main Content Container -->
    <div class="bg-white w-full sm:rounded-3xl sm:max-w-md mx-auto pt-12 pb-10 px-8 flex flex-col items-center gap-y-8 sm:px-8 lg:max-w-4xl lg:px-12 mb-10 shadow-xl mt-6">
        
        <img src="/images/hiring/enhands-raithenhaslach.jpg" alt="The EnHands team making heart signs with their hands, next to a cosmetic prosthetic hand and a mechanical functional hand prototype"
            width="3760" height="1110" class="w-full h-auto shadow-sm" />

        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 w-full text-left">
            Apply for EnHands
        </h1>

        <div class="w-full text-lg text-gray-700 leading-relaxed space-y-4">
            <p>We are looking for new members in the winter semester!</p>
            <p>Joining EnHands gives you the special opportunity to work in a technical student club that has a strong social mission. We are a team from diverse backgrounds and degrees, involving Bachelor, Master, and PhD students as well as graduates.</p>
            <p>
                <b>
                We don’t have any strict requirements for new members:</b> beginners are welcome!<br>
                Our main requirement is <b>responsibility</b>: we’re building devices that real patients will use, and we need reliable team members with a strong sense of commitment.</p>
            <p>
                <i>If you're in a bachelor's program with GOP exams, in our experience it makes most sense to join us if you’re at least in the 3rd semester to avoid clashing with the exams.</i>
            </p>

            
            <h2 class="text-xl font-bold text-gray-900 mt-6">Open Positions</h2>
            <p>We are especially looking for new members in the following teams:</p>
            <h3 class="mb-1"><b>Product Team:</b></h3>
            <ul class="list-disc list-inside space-y-2 ml-2 mb-2">
                <li>{@render pdfLink('/jobs/functional-hand.pdf', 'Functional Hand team')}</li>
                <li>{@render pdfLink('/jobs/cosmetic-hand.pdf', 'Cosmetic Hand team')}</li>
                <!-- <li><u><i>Cosmetic Hand subteam:</i></u> {@render pdfLink('/jobs/cosmetic-hand.pdf')}</li> -->
                <!-- <li><i>User Feedback subteam:</i> <a href="#" class="text-blue-500 hover:text-blue-700">→ Find out more</a></li> -->
                <!-- <li><b>Funding subteam:</b> <a href="#" class="text-blue-500 hover:text-blue-700">→ Find out more</a></li>
                <li><b>Social media:</b> <a href="#" class="text-blue-500 hover:text-blue-700">→ Find out more</a></li> -->
            </ul>
            <h3 class="mb-1 mt-1"><b>Organization and Marketing Teams:</b></h3>
            <ul class="list-disc list-inside space-y-2 ml-2">
                <!-- <li><b>Functional Hand subteam:</b> {@render pdfLink('/jobs/functional-hand.pdf')}</li>
                <li><b>Cosmetic Hand subteam:</b> {@render pdfLink('/jobs/cosmetic-hand.pdf')}</li> -->
                <li>{@render pdfLink('/jobs/user-feedback.pdf', 'User Feedback team')}</li>
                <li>{@render pdfLink('/jobs/fundraising-social-media.pdf', 'Funding team')}</li>
                <li>{@render pdfLink('/jobs/fundraising-social-media.pdf', 'Social Media team')}</li>
                <!-- <li><b>Funding subteam:</b> <a href="#" class="text-blue-500 hover:text-blue-700">→ Find out more</a></li>
                <li><b>Social media:</b> <a href="#" class="text-blue-500 hover:text-blue-700">→ Find out more</a></li> -->
            </ul>

            <p class="mt-4">If you're interested in helping in a different subteam, you can also send us a general application. In that case, please let us know what you are most interested in.</p>

            <h2 class="text-xl font-bold text-gray-900 mt-6">Requirements</h2>
            <p>To work in a subteam, you should be able to:</p>
            <ul class="list-disc list-inside space-y-2 ml-2">
                <li><b>Attend the weekly online meetings</b> of your subteam</li>
                <li><b>Invest at least 3-4h per week</b> into tasks for the subteam during the semester (except exam season)</li>
                <li><b>Attend the monthly workshops if possible</b> (every first Saturday of the month on campus in Garching)</li>
            </ul>
            <p class="mt-4">If some requirements don't work for you at the moment (especially schedule conflicts), please don't hesitate to reach out either way and let us know, we will do our best to accommodate it.</p>

            <h3 class="mb-1 mt-6"><b>Weekly Schedule:</b></h3>
            <div class="overflow-x-auto">
                <table class="w-full text-base text-left border-collapse">
                    <thead class="text-sm uppercase tracking-wide text-gray-500 border-b border-gray-300">
                        <tr>
                            <th scope="col" class="py-2 pr-4 font-semibold">Subteam</th>
                            <th scope="col" class="py-2 pr-4 font-semibold">Time</th>
                            <th scope="col" class="py-2 font-semibold">Where</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 align-top">
                        <tr>
                            <th scope="row" class="py-2 pr-4 font-medium text-gray-900">Functional Hand team</th>
                            <td class="py-2 pr-4">Tuesday, 6:30–7:30pm</td>
                            <td class="py-2"><i>on Zoom</i></td>
                        </tr>
                        <tr>
                            <th scope="row" class="py-2 pr-4 font-medium text-gray-900">Organization and Marketing teams</th>
                            <td class="py-2 pr-4">Wednesday, 6–7pm <span class="text-gray-500">(every two weeks)</span></td>
                            <td class="py-2"><i>on Zoom</i></td>
                        </tr>
                        <tr>
                            <th scope="row" class="py-2 pr-4 font-medium text-gray-900">Cosmetic Hand team</th>
                            <td class="py-2 pr-4">Wednesday, 7–8pm</td>
                            <td class="py-2"><i>on Zoom</i></td>
                        </tr>
                        <tr>
                            <th scope="row" class="py-2 pr-4 font-medium text-gray-900">Monthly workshop</th>
                            <td class="py-2 pr-4">Saturday, 10am–3pm <span class="text-gray-500">(once a month)</span></td>
                            <td class="py-2"><i>TUM Venture Labs, Garching Campus</i></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Previous column-per-day layout:
            <div class="overflow-x-auto">
                <table class="w-full text-base text-left border-collapse">
                    <thead class="text-sm uppercase tracking-wide text-gray-500 border-b border-gray-300">
                        <tr>
                            <th scope="col" class="py-2 px-3 font-semibold">Tuesday</th>
                            <th scope="col" class="py-2 px-3 font-semibold">Wednesday</th>
                            <th scope="col" class="py-2 px-3 font-semibold">Saturday</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 align-top">
                        <tr>
                            <td class="py-2 px-3"><b>6:30–7:30pm</b>: Functional Hand team <i>(on Zoom)</i></td>
                            <td class="py-2 px-3"><b>6–7pm</b> (every two weeks): Organization and Marketing teams general meeting <i>(on Zoom)</i></td>
                            <td class="py-2 px-3"><b>10am–3pm</b> (once a month): Monthly workshop <i>(TUM Venture Labs, Garching Campus)</i></td>
                        </tr>
                        <tr>
                            <td class="py-2 px-3"></td>
                            <td class="py-2 px-3"><b>7–8pm</b>: Cosmetic Hand team <i>(on Zoom)</i></td>
                            <td class="py-2 px-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            -->

        </div>

        <a href="mailto:info@enhands.de?subject=%F0%9F%8C%8D%F0%9F%A6%BE%F0%9F%96%90%EF%B8%8F%20Join%20EnHands!%20%F0%9F%96%90%EF%B8%8F%F0%9F%A6%BE%F0%9F%8C%8D&body=Hi%20EnHands%20Team%2C%0Athis%20is%20my%20application%20to%20join%20EnHands%3A%0A%0A-%20Name%3A%20%20%5B...%5D%0A-%20Degree%20and%20Semester%3A%20%20%5B...%5D%0A-%20Applying%20for%20Subteam%3A%20%20%5Bplease%20put%20one%20of%20the%20subteams%20above%2C%20or%20%22Something%20else%2Fnot%20sure%20yet%22%20-%20in%20the%20latter%20case%2C%20please%20specify%20what%20you're%20interested%20in%20below%5D%0A%0A%5BPlease%20attach%20a%20CV%2C%20English%20or%20German%20are%20both%20fine%5D%0A%0ATell%20us%20more%20about%20you%2C%20relevant%20experience%20(if%20applicable)%2C%20and%20why%20you%20want%20to%20join%20EnHands%3A%0A%5B...%5D"
            class="group bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-2.5 text-center inline-flex items-center">
            <span class="flex items-center gap-2 text-white">
                Apply now!
                <svg aria-hidden="true" class="-mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </span>
        </a>

        <!-- The Application Form -->
        <!-- <div class="w-full max-w-lg mt-8">
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
        </div> -->
    </div>
</div>