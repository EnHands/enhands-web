<script>
    import { onMount } from 'svelte';

    /** @type {{ data: import('./$types').PageData }} */
    let {data} = $props();

    const joinMailto = "mailto:info@enhands.de?subject=%F0%9F%8C%8D%F0%9F%A6%BE%F0%9F%96%90%EF%B8%8F%20Join%20us!%20%F0%9F%96%90%EF%B8%8F%F0%9F%A6%BE%F0%9F%8C%8D&body=(Hi%2C%20glad%20you%20found%20us.%20We're%20always%20happy%20to%20welcome%20new%20members!%0AWe%20meet%20regularly%20on%20Zoom%20-%20every%20Wednesday%20at%206pm%20for%20the%20technical%20team%2C%20and%20every%20Monday%20at%206pm%20for%20the%20organization%20and%20marketing%20teams.%20Once%20a%20month%20we%20meet%20for%20an%20in-person%20workshop%20day%20in%20Garching.%0A%0AThis%20is%20a%20sample%20email%20that%20you%20can%20fill%20out%20so%20we%20can%20get%20some%20information%20about%20you.)%0A%0AHi%20EnHands%20Team%2C%0A%0AI%20am%20interested%20in%20joining%20the%20student%20group.%0A%0AHere%20are%20some%20details%20about%20me%3A%0A%0AName%3A%0ADegree%20and%20semester%3A%0AInterests%3A%0APreferred%20team(s)%3A%20(Technical%2FMarketing%2FOrganization%2FI%20don't%20know%20yet)";

    // --- HORIZONTAL SCROLL LOGIC (prototype carousel) ---
    /** @type {HTMLElement} */
    let carouselElement; // This will hold the reference to our carousel div

    /** @type {Element[]} */
    let pages = $state([]); // This will hold our carousel items

    let activeIndex = $state(0); // This tracks which pill/dot is active

    const prototypeLabels = ['V2 Functional', 'Cosmetic Hand', 'V1 Functional'];

    onMount(() => {
        // 1. Grab all the .carousel-item elements inside our carousel
        const pageElements = carouselElement.querySelectorAll('.carousel-item');
        pages = Array.from(pageElements);

        // 2. Set up the Intersection Observer
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                // When an item comes into view, update the activeIndex
                activeIndex = pages.indexOf(e.target);
            });
        }, { root: carouselElement, threshold: 0.6 });

        // 3. Start observing each page
        pages.forEach(p => io.observe(p));

        // 4. CLEANUP: Always disconnect observers when the user leaves the page!
        return () => io.disconnect();
    });

    /**
     * Helper function to scroll to a specific item
     * @param {number} index - The position of the pill/dot clicked
     */
    function scrollToItem(index) {
        pages[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
</script>

<!-- ───── Hero ───── -->
<section class="hero-bg relative bg-right bg-cover bg-no-repeat">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex min-h-[70vh] lg:min-h-[80vh] items-center py-16 sm:py-24">
            <div class="max-w-2xl">
                <span class="slide-in-bottom inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-800 ring-1 ring-blue-700/10 mb-6">
                    <span class="h-2 w-2 rounded-full bg-blue-600"></span>
                    Student initiative &amp; registered non-profit (e.V.) · Munich
                </span>

                <h1 class="slide-in-bottom mb-6 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Enabling <span class="text-blue-700">accessible</span><br />
                    prosthetic hands
                </h1>

                <p class="slide-in-bottom-subtitle text-lg sm:text-2xl leading-relaxed text-gray-700 mb-10 max-w-xl">
                    We help others regardless of location or circumstance —
                    one hand at a time.
                </p>

                <div class="fade-in flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a href={joinMailto}
                        class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors">
                        Join us!
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>

                    <a href="#donate"
                        class="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 px-7 py-3 text-base font-semibold text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors">
                        Donate
                    </a>

                    <a href="/about-enhands.pdf" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center justify-center gap-1 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-700 transition-colors">
                        About us
                        <svg aria-hidden="true" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </a>
                </div>

                <!-- On smaller screens the photo moves below the text instead of behind it -->
                <img src="/images/hand.jpg" alt="" aria-hidden="true"
                    class="lg:hidden mt-10 h-52 sm:h-64 w-full max-w-md ml-auto rounded-2xl object-cover object-right" />
            </div>
        </div>
    </div>
</section>

<!-- ───── Impact stats ───── -->
<section class="bg-white border-y border-gray-900/5" aria-label="EnHands at a glance">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <dl class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
                <dt class="order-last text-sm sm:text-base text-gray-600 mt-1">target cost per prosthesis</dt>
                <dd class="text-3xl sm:text-4xl font-extrabold text-blue-700">&lt; $50</dd>
            </div>
            <div>
                <dt class="order-last text-sm sm:text-base text-gray-600 mt-1">founded at TUM in Munich</dt>
                <dd class="text-3xl sm:text-4xl font-extrabold text-blue-700">2022</dd>
            </div>
            <div>
                <dt class="order-last text-sm sm:text-base text-gray-600 mt-1">prototype generations so far</dt>
                <dd class="text-3xl sm:text-4xl font-extrabold text-blue-700">3</dd>
            </div>
            <div>
                <dt class="order-last text-sm sm:text-base text-gray-600 mt-1">volunteer-run by students</dt>
                <dd class="text-3xl sm:text-4xl font-extrabold text-blue-700">100%</dd>
            </div>
        </dl>
    </div>
</section>

<!-- ───── Mission ───── -->
<section id="mission" class="scroll-mt-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            <!-- Text -->
            <div>
                <p class="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-3">Our mission</p>
                <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                    Technology that helps, without getting in the way
                </h2>
                <p class="text-lg text-gray-600 leading-relaxed mb-10">
                    Around the world, most amputees have no access to a prosthesis — modern devices are
                    simply unaffordable. We believe a helping hand shouldn't be a luxury, so we develop
                    prostheses that are simple, robust and inexpensive enough to reach the people who
                    need them most.
                </p>

                <div class="space-y-8">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 mb-1">Who we are</h3>
                            <p class="text-gray-600 leading-relaxed">
                                A <strong>TUM student club founded in May&nbsp;2022</strong> and now a registered
                                non-profit association (e.V.), uniting students from diverse disciplines and
                                partnering with <strong>TUM chairs and institutes</strong> to bridge academic
                                research with real-world impact.
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 mb-1">What we do</h3>
                            <p class="text-gray-600 leading-relaxed">
                                We develop <strong>affordable upper-limb prostheses</strong> for underserved
                                communities, together with the <strong>Naya Qadam Trust</strong> — experts in
                                low-cost prosthetics — to deliver <strong>functional, accessible designs</strong>
                                where they are needed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Emotional image -->
            <figure class="relative">
                <img src="/blog/images/2024-01-31-nepal-header.png"
                    alt="The EnHands team together with local partners during the user study in Nepal"
                    class="w-full rounded-3xl object-cover shadow-lg" loading="lazy" />
                <figcaption
                    class="absolute bottom-4 left-4 right-4 rounded-xl bg-gray-900/70 backdrop-blur px-4 py-3 text-sm text-white">
                    Our team with local partners during the first user study in Bardibas, Nepal.
                </figcaption>
            </figure>
        </div>

        <!-- Values -->
        <div class="mt-16 sm:mt-20 grid gap-6 sm:grid-cols-3">
            <div class="rounded-2xl bg-[#f7f5f0] p-8">
                <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Affordable by design</h3>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Every design decision is driven by one target: a functional prosthetic hand
                    for under $50, so cost is never the reason someone goes without.
                </p>
            </div>
            <div class="rounded-2xl bg-[#f7f5f0] p-8">
                <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Made to be made locally</h3>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Simple materials and simple tools: our hands are designed so local workshops
                    can manufacture, fit and repair them — no high-tech supply chain required.
                </p>
            </div>
            <div class="rounded-2xl bg-[#f7f5f0] p-8">
                <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Human-centered</h3>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Function alone is not enough. We run user studies with patients and design for
                    comfort, appearance and confidence in everyday life.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ───── Prototypes (3D) ───── -->
<section id="prototypes" class="scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div class="max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-3">Our prototypes</p>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Explore our hands in 3D
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed">
                Three generations of prostheses, developed and tested with our partners.
                Rotate and zoom each model — or place it in your own room with augmented reality.
            </p>
        </div>

        <!-- Prototype pills -->
        <nav class="hidden sm:flex flex-wrap gap-2 mt-8" aria-label="Prototypes">
            {#each pages as _, i}
                <button
                    class="px-4 py-2 rounded-full text-sm font-semibold transition-colors {activeIndex === i
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'bg-white text-gray-700 ring-1 ring-gray-900/10 hover:bg-blue-50 hover:text-blue-700'}"
                    onclick={() => scrollToItem(i)}>
                    {prototypeLabels[i] ?? `Prototype ${i + 1}`}
                </button>
            {/each}
        </nav>
    </div>

    <div id="scroll-container" class="grid w-full sm:px-8 pb-16 pt-4 sm:pb-24 lg:max-w-full">
        <!--  Dot bar (mobile) -->
        <nav id="dotNav" class="flex sm:hidden justify-center gap-2 pt-2">
            {#each pages as _, i}
                <button
                    class="h-2.5 w-2.5 rounded-full transition-colors {activeIndex === i ? 'bg-blue-600' : 'bg-gray-300'}"
                    aria-label="Scroll to {prototypeLabels[i] ?? `prototype ${i + 1}`}"
                    onclick={() => scrollToItem(i)}
                ></button>
            {/each}
        </nav>

        <div id="carousel" class="carousel scrollable-div rounded width_overflow" bind:this={carouselElement}>
            <!-- V2 Functional prototype -->
            <div id="P3" class="carousel-item px-4 py-6">
                <div class="cardMV rounded-2xl">
                    <div
                        class="max-w-sm mx-auto px-4 py-5 grid items-center grid-cols-1 gap-y-8 gap-x-8 sm:px-8 sm:py-5 sm:max-w-lg lg:max-w-4xl lg:px-8 lg:grid-cols-3 xl:max-w-7xl">
                        <div class="lg:col-span-2">
                            <h2
                                class="text-3xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-4xl">
                                V2 Functional Prototype </h2>
                            <p class="mt-4 text-gray-500">
                                Our newest functional prototype is our most sophisticated development to date: Three
                                different grasping types are provided by mechanical fingers produced from sheet
                                metal, while the outside gets a realistic appearance via a silicone glove.
                            </p>

                            <dl
                                class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Product Overview</dt>
                                    <dd class="mt-2 text-sm text-gray-500">
                                        <ul style="list-style: initial; list-style-position: inside">
                                            <li><strong>What it is</strong>: Affordable, functional, and
                                                cosmetically appealing hand prosthesis for forearm amputees.</li>
                                            <li><strong>Who it&#39;s for</strong>: Designed for forearm amputees,
                                                especially in low-income countries, who seek both functionality and
                                                aesthetic appeal at low cost.</li>
                                            <li><strong>Cost:</strong> &lt; $50</li>
                                        </ul>
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Features</dt>
                                    <dd class="mt-2 text-sm text-gray-500">
                                        <ul style="list-style: initial; list-style-position: inside">
                                            <li>Affordable materials</li>
                                            <li>Locally manufactured</li>
                                            <li>Lightweight and compact</li>
                                            <li>Enhanced actuation</li>
                                            <li>Easy-release mechanism</li>
                                        </ul>
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Materials</dt>
                                    <dd class="mt-2 text-sm text-gray-500">
                                        <ul style="list-style: initial; list-style-position: inside">
                                            <li>For the mechanism structure, we consider durable, lightweight
                                                materials like sheet metal. </li>
                                            <li>For the glove, we use silicone due to its flexibility, comfort, and
                                                human-like appearance.</li>
                                        </ul>
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Prototyping and Development Process</dt>
                                    <dd class="mt-2 text-sm text-gray-500">
                                        We began by focusing solely on functionality with essential grips. We are
                                        now working on combining both functional and cosmetic elements for improved
                                        aesthetics and usability.
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <model-viewer src="/model-resources/FunctionalHand_V2.glb" ar
                            ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="aces"
                            poster="/model-resources/FunctionalHand_V2.webp" shadow-intensity="1.19" exposure="0.76"
                            shadow-softness="1">
                            <button class="Hotspot" slot="hotspot-10"
                                data-position="-49.84631579655456m 16.20571502073246m -1.2034556662798614m"
                                data-normal="-0.04574187075813724m 1.342182040734543e-7m -0.9989532928318161m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Linkage Finger</div>
                            </button><button class="Hotspot" slot="hotspot-11"
                                data-position="11.184215338300248m 0.5536238948393359m 12.511895981542509m"
                                data-normal="0m 1.3435883843274954e-7m -0.9999999999999911m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Bionic Tendon</div>
                            </button><button class="Hotspot" slot="hotspot-12"
                                data-position="43.39437182076409m 48.928094961693425m 29.863861975845488m"
                                data-normal="-0.3944188308636011m 1.6114445757118885e-7m -0.9189307840420651m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Adjustable Thumb</div>
                            </button><button class="Hotspot" slot="hotspot-13"
                                data-position="137.26516448165137m -23.493695412994168m -16.92747675006964m"
                                data-normal="0.35549421000375353m 0.20242746310612106m -0.9124949253745072m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Silicone Glove</div>
                            </button><button class="Hotspot" slot="hotspot-15"
                                data-position="117.76409572026516m 0.4877809930514836m 12.511895972695932m"
                                data-normal="0m 1.3435883843274954e-7m -0.9999999999999911m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Power Transfer Mechanism</div>
                            </button>
                            <div class="progress-bar hide" slot="progress-bar">
                                <div class="update-bar"></div>
                            </div>
                            <button slot="ar-button" id="ar-button">
                                View in your space
                            </button>
                            <div id="ar-prompt">
                                <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt=Hand>
                            </div>
                        </model-viewer>
                    </div>
                </div>
            </div>

            <!-- Cosmetic prototype -->
            <div id="P2" class="carousel-item px-4 py-6">
                <div class="cardMV rounded-2xl">
                    <div
                        class="max-w-sm mx-auto px-4 py-5 grid items-center grid-cols-1 gap-y-8 gap-x-8 sm:px-8 sm:py-5 sm:max-w-lg lg:max-w-4xl lg:px-8 lg:grid-cols-3 xl:max-w-7xl">
                        <div class="lg:col-span-2">
                            <h2
                                class="text-3xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-4xl">
                                Cosmetic Hand </h2>
                            <p class="mt-4 text-gray-500">The Cosmetic Hand is designed to offer both a natural
                                appearance and functional capabilities, focusing on aesthetics and comfort. Here are
                                the key features:</p>

                            <dl
                                class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Origin</dt>
                                    <dd class="mt-2 text-sm text-gray-500">
                                        Based on our experiences with 3d-printing fully rigid cosmetic hands,
                                        we wanted to add a bit of low-tech gripping functionality.
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Material</dt>
                                    <dd class="mt-2 text-sm text-gray-500">The cosmetic hand combines a rigid PLA
                                        core for stability with a soft, grippy silicone outer layer molded to
                                        resemble a natural hand. The silicone's shore hardness is set at 30 for a
                                        balance between realism and comfort.
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Degrees of Freedom</dt>
                                    <dd class="mt-2 text-sm text-gray-500">The hand features a guitar capo spring
                                        mechanism
                                        for controlled movement, providing one degree of freedom. Additionally, a
                                        second-degree of freedom wrist mechanism, similar to the V1 prototype,
                                        offers rotation and adaptability for various tasks.</dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Design Philosophy</dt>
                                    <dd class="mt-2 text-sm text-gray-500"> The cosmetic hand blends
                                        aesthetics and functionality. The silicone outer layer's lifelike appearance
                                        enhances user confidence, while its comfortable grip makes daily activities
                                        easy. The adjustable wrist mechanism adds versatility to suit different
                                        situations. </dd>
                                </div>
                            </dl>
                        </div>

                        <model-viewer class="modelviewer justify-end rounded-lg model" disable-zoom
                            src="/model-resources/CosmeticHand_WebModel.glb" ar
                            ar-modes="webxr scene-viewer quick-look" camera-orbit="135.8deg 78.28deg 0.6221m"
                            camera-controls poster="/model-resources/poster_P2.webp" shadow-intensity="1"
                            field-of-view="30deg">
                            <button class="Hotspot" slot="hotspot-2" data-position="-0.035m 0.03m -0.065m"
                                data-normal="-0.9999999999999981m 4.3711385337422556e-8m 4.3711385337422556e-8m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Guitar capo used as a spring</div>
                            </button><button class="Hotspot" slot="hotspot-3"
                                data-position="0.009388101366336332m 0.11980100314952985m 0.049949023917919035m"
                                data-normal="4.371137946441115e-8m -1.3435884034343458e-7m 0.99999999999999m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Silicone mold</div>
                            </button><button class="Hotspot" slot="hotspot-4" data-position="0.0100m -0.0156m 0.01m"
                                data-normal="4.371137946441115e-8m -1.3435884034343458e-7m 0.99999999999999m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Ridgid PLA core</div>
                            </button>
                            <div class="progress-bar hide" slot="progress-bar">
                                <div class="update-bar"></div>
                            </div>
                            <button slot="ar-button" id="ar-button">
                                View in your space
                            </button>
                            <div id="ar-prompt">
                                <img src="/model-resources/ar_hand_prompt.png" alt=Hand_Prompt>
                            </div>
                        </model-viewer>
                    </div>
                </div>
            </div>

            <!-- V1 prototype -->
            <div id="P1" class="carousel-item px-4 py-6">
                <div class="cardMV rounded-2xl">
                    <div
                        class="max-w-sm mx-auto px-4 py-5 grid sm:px-8 items-center grid-cols-1 gap-y-8 gap-x-8 sm:py-5 sm:max-w-lg lg:max-w-4xl lg:px-8 lg:grid-cols-3 xl:max-w-7xl ">
                        <div class="lg:col-span-2">
                            <h2
                                class="text-3xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-4xl">
                                V1 Functional Prototype </h2>
                            <p class="mt-4 text-gray-500">As a starting point, we decided to build a prosthetic hand
                                that is the
                                size
                                of the average woman's
                                hand which can perform the most important grasping types. According to research,
                                these are the ”pinch grasp” and the ”power grasp”, since they enable a person to do
                                most of
                                their everyday tasks such as grabbing tools, cooking or housekeeping tasks.</p>

                            <dl class="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-6 lg:gap-x-8">
                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Origin</dt>
                                    <dd class="mt-2 text-sm text-gray-500">Parts of the mechanics are inspired by
                                        the <a href="https://ln4handproject.org/"
                                            class="underline text-gray-500 hover:text-indigo-800"> LN4
                                        </a>
                                        hand, but with a deeper focus on anthropomorphic design and patient
                                        acceptance.</dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Material</dt>
                                    <dd class="mt-2 text-sm text-gray-500">We use polylactic acid (PLA) due to its
                                        lightweight
                                        and stiff material
                                        properties. 3D printing is our main manufacturing method during the
                                        prototyping phase,
                                        however in future designs we
                                        want to switch to more reliable methods which are better suited for
                                        developing nations.
                                    </dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Degrees of Freedom</dt>
                                    <dd class="mt-2 text-sm text-gray-500">A 3-DoF thumb, two 1-DoF fingers and a
                                        1-DoF 360°
                                        rotational wrist, all of which are actuated passively.</dd>
                                </div>

                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Design Philosophy</dt>
                                    <dd class="mt-2 text-sm text-gray-500"> Discrete passively actuated grasping
                                        positions.
                                        Anthropomorphic appearance. Rigid impact-resistant parts. Low maintenance.
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <model-viewer class="modelviewer rounded-lg " src="/model-resources/Prototype_V1_final.glb"
                            ar ar-modes="webxr scene-viewer quick-look" disable-zoom camera-controls
                            poster="/model-resources/poster_P1.webp" shadow-intensity="1">
                            <button class="Hotspot" slot="hotspot-1"
                                data-position="-3.3432793957523295m 9.641767825540473m -4.915143003948515m"
                                data-normal="0.06311197374084425m 0.7666862988569887m -0.6389123554256149m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Leather Stump Interface</div>
                            </button><button class="Hotspot" slot="hotspot-5"
                                data-position="16.061483011424425m 8.464838753797752m -9.199439335725579m"
                                data-normal="0.9290155792905795m -0.3319460028086662m -0.16352952227270126m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Passive Fingers </div>
                            </button><button class="Hotspot" slot="hotspot-7"
                                data-position="8.084792930715839m 11.83172017326169m -6.147794684262486m"
                                data-normal="-0.731214129647901m 0.5444908530979404m -0.4109204393747526m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Adjustable Thumb </div>
                            </button>
                            <button class="Hotspot" slot="hotspot-8"
                                data-position="5.076690707886618m 7.493295209078049m -3.561985378679914m"
                                data-normal="-5.198395647745263e-8m -0.21198035284745873m -0.9772739278250825m"
                                data-visibility-attribute="visible">
                                <div class="HotspotAnnotation">Rubber Ring</div>
                                <div class="progress-bar hide" slot="progress-bar">
                                    <div class="update-bar"></div>
                                </div>
                                </button>
                                <div id="ar-prompt">
                                    <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="">
                                </div>
                        </model-viewer>



                    </div>
                </div>
            </div>

        </div>

    </div>
</section>

<!-- ───── Donation Hero ───── -->
<section id="donate" class="scroll-mt-24 relative isolate overflow-hidden text-white"
    style="background:url('/images/donate-bg.jpg') center/cover no-repeat">

    <!-- soft blue‑to‑transparent overlay -->
    <div class="absolute inset-0 bg-linear-to-r from-blue-950/85 via-blue-900/60 to-blue-800/40"></div>

    <!-- content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 grid lg:grid-cols-2 gap-12 items-center">

        <!-- left column: emotional copy over the photo -->
        <div>
            <h2 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
                Give a hand.
                <span class="block text-blue-300">Change a life.</span>
            </h2>
            <p class="text-lg sm:text-xl max-w-prose text-white/90 drop-shadow">
                Your donation helps us craft affordable prosthetic hands for
                amputees who would otherwise go without. Every Euro counts!
            </p>
        </div>

        <!-- right column: donation card -->
        <div class="bg-white/95 backdrop-blur rounded-2xl p-8 sm:p-10 text-gray-900 shadow-xl lg:justify-self-end w-full max-w-lg">
            <h3 class="text-2xl font-bold mb-2">Support EnHands</h3>
            <p class="text-gray-600 mb-6">
                As a registered non-profit association, every donation goes directly
                into materials, manufacturing and fitting of our prostheses.
            </p>

            <a href="https://www.paypal.com/donate/?campaign_id=AD2ECE3P9VTVJ"
                class="block w-full text-center px-8 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors mb-6">
                Donate via PayPal
            </a>

            <!-- bank details -->
            <div class="rounded-xl bg-gray-100 p-4 text-sm leading-relaxed">
                <p class="font-semibold text-gray-900 mb-1">Prefer a bank transfer?</p>
                <p class="font-mono text-gray-700 wrap-break-word">
                    EnHands e.V.<br />
                    IBAN: DE74 8306 5408 0005 4605 90<br />
                    GENODEF1SLR (Deutsche Skatbank)
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ───── Team ───── -->
{#if data.members?.length}
    <section id="team" class="scroll-mt-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                <p class="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-3">Our team</p>
                <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    The people behind EnHands
                </h2>
                <p class="text-lg text-gray-600">
                    Students from many disciplines volunteering their time — hover over a
                    portrait to meet the person behind the role.
                </p>
            </div>

            <div id="CardList-People" class="flex gap-4 sm:gap-6 flex-wrap justify-center">
                {#each data.members as member}
                    <div
                        class="card w-36 sm:w-56 rounded-2xl overflow-hidden bg-white ring-1 ring-gray-900/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">
                        <div class="card-image-area">
                            {#if member.img_hover}
                                <img class="img-nohover w-full max-h-60 object-cover" src={member.img}
                                    alt="{member.name} portrait">
                                <img class="img-hover w-full max-h-60 object-cover" src={member.img_hover}
                                    alt="{member.name} portrait">
                            {:else}
                                <img class="w-full max-h-60 object-cover" src={member.img} alt="{member.name} portrait">
                            {/if}
                        </div>

                        <div class="px-3 sm:px-5 py-4">
                            <div class="font-bold text-sm sm:text-lg text-gray-900">{member.name}</div>
                            <p class="text-gray-600 text-xs sm:text-sm mt-0.5">{member.job}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
{/if}

<!-- ───── Partners ───── -->
{#if data.partners?.length}
    <section class="bg-white border-t border-gray-900/5 py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 mb-10">
                Our partners &amp; supporters
            </h2>

            <div class="partners-slideshow relative overflow-hidden py-0">
                <div
                    class="partners-track flex items-center gap-8 w-max"
                    style="animation-duration: {data.partners.length * 3}s"
                    aria-live="polite"
                >
                    {#each [...data.partners, ...data.partners] as partner}
                        <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="partner-logo transition-transform hover:scale-110"
                            title={partner.name}
                        >
                            <img src={partner.img} alt="{partner.name} logo" loading="lazy"
                                class="h-12 w-auto object-contain" />
                        </a>
                    {/each}
                </div>

                <div class="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div class="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>
            </div>
        </div>
    </section>
{/if}

<!-- ───── Join CTA ───── -->
<section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-blue-800 to-indigo-900 px-6 py-14 sm:px-14 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
                <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                    Become part of EnHands
                </h2>
                <p class="text-lg text-blue-100 leading-relaxed mb-8 max-w-xl">
                    Whether you study engineering, medicine, design or business — there's a place
                    for you. We meet weekly online and once a month for a hands-on workshop day
                    in Garching.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href={joinMailto}
                        class="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-base font-semibold text-blue-800 hover:bg-blue-50 transition-colors">
                        Join us!
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="/blog"
                        class="inline-flex items-center rounded-lg border border-white/40 px-7 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                        Read our blog
                    </a>
                </div>
            </div>
            <img src="/blog/images/2025-02-17-group-picture.jpg"
                alt="The EnHands team holding silicone prosthetic hands"
                class="hidden lg:block w-full rounded-2xl object-cover shadow-lg" loading="lazy" />
        </div>
    </div>
</section>

<!-- Animation CSS-->
<style>
    .hero-bg {
        background-color: #f0eee6;
    }

    /* Show the photo only where there is room next to the text,
       so the headline always stays readable on smaller screens. */
    @media (min-width: 1024px) {
        .hero-bg {
            background-image: url('/images/hand.jpg');
        }
    }

    .carousel {
        display: inline-flex;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        /* Enable smooth scrolling on iOS Safari */
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .carousel-item {
        box-sizing: content-box;
        display: flex;
        flex: none;
        width: calc(100vw - 32px);
        max-width: max-content;
        scroll-snap-align: start;
    }

    .cardMV {
        background: linear-gradient(to left, #eceada, #e4e6dd);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }

    model-viewer {
        background: transparent !important;
        --poster-color: transparent !important;
        /* Removes the default gray background while loading */
    }

    @media (min-width: 576px) {
        .carousel-item {
            width: 80vw;
        }
    }

    .carousel::-webkit-scrollbar {
        display: auto;
        height: 0.5rem;
    }

    /* Track */
    .carousel::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .carousel::-webkit-scrollbar-thumb {
        background: #afafaf;
        border-radius: 0.5rem;
    }

    /* Handle on hover */
    .carousel::-webkit-scrollbar-thumb:hover {
        background: #6b6b6b;
    }

    .slide-in-bottom {
        animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) both;
    }

    .slide-in-bottom-subtitle {
        animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .25s both;
    }

    .fade-in {
        animation: fade-in 1s cubic-bezier(.39, .575, .565, 1.000) .5s both;
    }

    .card-image-area .img-hover {
        visibility: hidden;
        position: absolute;
        width: 0;
        height: 0;
    }

    .card-image-area:hover .img-hover,
    .card-image-area:active .img-hover {
        visibility: visible;
        position: relative;
        width: unset;
        height: unset;
    }

    .card-image-area:hover .img-nohover,
    .card-image-area:active .img-nohover {
        visibility: hidden;
        position: absolute;
        width: 0;
        height: 0;
    }

    @keyframes slide-in-bottom {
        0% {
            transform: translateY(48px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    /* The Infinite Scroll Animation */
    .partners-track {
        /* The 'scroll' keyframe is defined below */
        animation: scroll linear infinite;
    }

    /* Pause the animation automatically on hover! */
    .partners-track:hover {
        animation-play-state: paused;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            /* We move exactly 50% of the total width.
            Since we duplicated the array in Svelte, 50% represents one full loop! */
            transform: translateX(-50%);
        }
    }
</style>
