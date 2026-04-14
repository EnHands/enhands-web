<script>
    import { onMount } from 'svelte';

    /** @type {{ data: import('./$types').PageData }} */
    let {data} = $props();

    // --- HORIZONTAL SCROLL LOGIC ---
    /** @type {HTMLElement} */
    let carouselElement; // This will hold the reference to our carousel div

    /** @type {Element[]} */
    let pages = $state([]); // This will hold our carousel items
    
    let activeIndex = $state(0); // This tracks which dot is blue

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
     * @param {number} index - The position of the dot clicked
     */
    function scrollToItem(index) {
        pages[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
</script>

<!--Main-->
<div class="pt-8 pb-10 sm:pt-20 md:pt-40 sm:px-6 mx-10 flex flex-wrap flex-col md:flex-row items-center">
    <!--Left Col-->
    <div class="flex flex-col w-full xl:w-1/2 justify-center mb-4 lg:items-start px-2 overflow-y-hidden">
        <h1
            class="slide-in-bottom mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Enabling <span
                class="underline underline-offset-4 decoration-3 hover:decoration-blue-600 hover:text-indigo-600">accessible</span>
            prosthetic hands</h1>
        <p class="leading-normal text-base md:text-2xl mb-8 md:text-left slide-in-bottom-subtitle">Trying to
            help others, regardless of location or circumstance, one hand at a time.</p>

        <div class="flex flex-col lg:flex-row lg:w-100"> <!-- Increased width to accommodate 3 buttons -->
            <a href="mailto:info@enhands.de?subject=%F0%9F%8C%8D%F0%9F%A6%BE%F0%9F%96%90%EF%B8%8F%20Join%20us!%20%F0%9F%96%90%EF%B8%8F%F0%9F%A6%BE%F0%9F%8C%8D&body=(Hi%2C%20glad%20you%20found%20us.%20We're%20always%20happy%20to%20welcome%20new%20members!%0AWe%20meet%20regularly%20on%20Zoom%20-%20every%20Wednesday%20at%206pm%20for%20the%20technical%20team%2C%20and%20every%20Monday%20at%206pm%20for%20the%20organization%20and%20marketing%20teams.%20Once%20a%20month%20we%20meet%20for%20an%20in-person%20workshop%20day%20in%20Garching.%0A%0AThis%20is%20a%20sample%20email%20that%20you%20can%20fill%20out%20so%20we%20can%20get%20some%20information%20about%20you.)%0A%0AHi%20EnHands%20Team%2C%0A%0AI%20am%20interested%20in%20joining%20the%20student%20group.%0A%0AHere%20are%20some%20details%20about%20me%3A%0A%0AName%3A%0ADegree%20and%20semester%3A%0AInterests%3A%0APreferred%20team(s)%3A%20(Technical%2FMarketing%2FOrganization%2FI%20don't%20know%20yet)"
                class="group fade-in bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center lg:w-1/3">
                <span class="flex justify-between w-full text-white">
                    Join us!
                    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </a>

            <a href="blog"
                class="group fade-in border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 lg:mt-0 lg:ml-4 lg:w-1/3">
                <span class="flex justify-between w-full text-blue-700 group-hover:text-white">
                    Blog
                    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </a>


            <a href="/about-enhands.pdf" target="_blank" rel="noopener noreferer" 
                class="group fade-in border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 lg:mt-0 lg:ml-4 lg:w-1/3">
                <span class="flex justify-between w-full text-blue-700 group-hover:text-white">
                    About Us
                    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </a>
        </div>
    </div>

    <!--Right Col-->

</div>

<!-- Empty Section after the header-->
<div class="w-full mx-auto pt-24 items-center sm:py-8 px-8 lg:px-36 sm:px-20"></div>


<!-- Mission & About Us Section with Side Icons -->
<div class="bg-white lg:rounded-3xl w-full px-6 py-12 sm:px-8 lg:px-12 mx-auto max-w-7xl ">
    <div class="grid gap-12 md:gap-16 lg:gap-20 lg:grid-cols-2">
        <!-- Who we are Section -->
        <div class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md">
            <div class="flex flex-wrap sm:grid w-full gap-x-4 gap-y-4 sm:grid-cols-[auto_1fr]">
                <!-- row 1 · icon -->
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                        <!-- svg … -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                </div>
                <!-- row 1 · heading -->
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 self-center">
                    Who We Are
                </h2>
                <!-- row 2 · paragraph -->
                <p class="text-gray-600 leading-relaxed col-span-2 sm:col-span-1 sm:col-start-2">
                    We're a <strong>TUM student club founded in May&nbsp;2022</strong> uniting students from
                    diverse disciplines, partnering with <strong>TUM chairs and institutes</strong>
                    to bridge academic research and resourceful engineering with real-world impact.
                </p>
            </div>
        </div>
        <!-- Our Mission Section -->
        <div class="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md">
            <div class="flex flex-wrap sm:grid w-full gap-x-4 gap-y-4 sm:grid-cols-[auto_1fr]">
                <!-- row 1 · icon -->
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>

                <!-- row 1 · heading -->
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 self-center">
                    Our Mission
                </h2>

                <!-- row 2 · paragraph -->
                <p class="text-gray-600 leading-relaxed col-span-2 sm:col-span-1 sm:col-start-2">
                    EnHands develops <strong>affordable upper-limb prostheses</strong> for underserved
                    communities.
                    We partner with the <strong>Naya Qadam Trust</strong> who are experts in low-cost
                    prosthetics to deliver
                    <strong>functional, accessible designs</strong> to developing regions.
                </p>
            </div>
        </div>
    </div>
</div>

<div id="scroll-container" class="grid w-full sm:px-8 py-12 lg:py-24 lg:max-w-full">
    <div class="hidden py-1 px-8 select-none">
        <a href="#P1"
            class="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-gray-300 hover:bg-blue-light focus:outline-none active:shadow-none mr-2">V1
            Prototype</a>
        <a href="#P2"
            class="py-2 px-4 shadow-md no-underline rounded-full bg-orange text-black font-sans font-semibold text-sm border-orange btn-primary hover:text-gray-300 hover:bg-orange-light focus:outline-none active:shadow-none mr-2">Cosmetic
            Hand</a>
    </div>

    <!--  Dot bar -->
    <nav id="dotNav" class="flex justify-center gap-2 pt-2">
        {#each pages as _, i}
            <button 
                class="h-2 w-2 rounded-full transition-colors {activeIndex === i ? 'bg-blue-600' : 'bg-gray-300'}"
                aria-label="Scroll to item {i + 1}"
                onclick={() => scrollToItem(i)}
            ></button>
        {/each}
    </nav>

    <div id="carousel" class="carousel scrollable-div rounded width_overflow" bind:this={carouselElement}>
        <!-- Cosmetic prototype -->
        <div id="P3" class="carousel-item px-4 py-6">
            <div class="cardMV rounded-xl">
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
            <div class="cardMV rounded-xl">
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
            <div class="cardMV rounded-xl">
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
                                        class="underline hover:text-indigo-800 "> LN4
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

<!-- ───── Donation Hero ───── -->
<section id="donate" class="relative isolate overflow-hidden text-white"
    style="background:url('/images/donate-bg.jpg') center/cover no-repeat">

    <!-- soft blue‑to‑transparent overlay -->
    <div class="absolute inset-0 bg-linear-to-r from-blue-900/80 via-blue-800/50 to-blue-700/30"></div>
    <!-- content -->
    <div class="relative max-w-6xl mx-auto px-6 sm:px-8 py-28 lg:py-36 grid lg:grid-cols-2 gap-10">

        <!-- left column: emotion image stays visible on large screens -->
        <div class="hidden lg:block"></div>

        <!-- right column: copy + CTAs -->
        <div class="bg-gray-800 bg-opacity-80 p-8 rounded-lg backdrop-blur-sm">
            <h2 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-white drop-shadow-md">
                Give a hand.
                <span class="block text-blue-500">Change a life.</span>
            </h2>

            <p class="text-lg sm:text-xl mb-10 max-w-prose text-white/90 drop-shadow">
                Your donation helps us craft affordable prosthetic hands for
                amputees who would otherwise go without. Every Euro counts!
            </p>

            <div class="flex flex-wrap gap-4 mb-8">
                <a href="https://www.paypal.com/donate/?campaign_id=AD2ECE3P9VTVJ"
                    class="px-8 py-3 rounded-lg bg-white text-blue-800 font-semibold hover:bg-blue-50 transition">
                    Donate now
                </a>
            </div>

            <!-- bank details -->
            <div class="w-full max-w-full sm:max-w-fit
            bg-gray-900/60 backdrop-blur-sm p-4 rounded-md
            text-xs sm:text-sm leading-relaxed font-mono text-white shadow
            wrap-break-word overflow-x-auto">
                <strong>EnHands e.V.</strong><br>
                IBAN: DE74 8306 5408 0005 4605 90<br>
                GENODEF1SLR (Deutsche Skatbank)
            </div>
        </div>
    </div>
</section>

<!--About Us-->
<div
    class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-4xl">Meet
        our Team 👨‍👩‍👧‍👧</h2>
    <div id="CardList-People" class="flex gap-6 flex-wrap justify-center">
    
        {#each data.members as member}
            <div class="card w-36 sm:w-60 rounded overflow-hidden shadow-lg">
                
                <div class="card-image-area">
                    {#if member.img_hover}
                        <img class="img-nohover w-full max-h-60 object-cover" src={member.img} alt="{member.name} portrait">
                        <img class="img-hover w-full max-h-60 object-cover" src={member.img_hover} alt="{member.name} portrait">
                    
                    {:else}
                        <img class="w-full max-h-60 object-cover" src={member.img} alt="{member.name} portrait">
                    {/if}
                </div>
                
                <div class="px-3 sm:px-6 py-4">
                    <div class="font-bold text-sm sm:text-xl mb-2">{member.name}</div>
                    <p class="text-gray-700 text-xs sm:text-base">{member.job}</p>
                </div>
                
            </div>
        {/each}
    </div>
</div>

<!-- Partners Section -->
<section class="py-1 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Our Partners</h2>

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
                        <img src={partner.img} alt="{partner.name} logo" loading="lazy" class="h-12 w-auto object-contain" />
                    </a>
                {/each}
            </div>

            <div class="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>
    </div>
</section>
    

<!-- Animation CSS-->
<style>
    /* ----------------------------------------------
        * Generated by Animista
        * w: http://animista.net, t: @cssanimista
        * ---------------------------------------------- */
    html {
        scroll-behavior: smooth;
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
        background: linear-gradient(to left, #e4e2dc, #dcdfd5);
        border-radius: 0.75rem;
        /* Ensures rounded corners match the gradient */
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
        -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) both;
        animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) both
    }

    .slide-in-bottom-h1 {
        -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .5s both;
        animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .5s both
    }

    .slide-in-bottom-subtitle {
        -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .75s both;
        animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .75s both
    }

    .fade-in {
        -webkit-animation: fade-in 1.2s cubic-bezier(.39, .575, .565, 1.000) 1s both;
        animation: fade-in 1.2s cubic-bezier(.39, .575, .565, 1.000) 1s both
    }

    .bounce-top-icons {
        -webkit-animation: bounce-top .9s 1s both;
        animation: bounce-top .9s 1s both
    }

    .text-1-5xl {
        font-size: 1.35rem;
        line-height: 1.875rem;
    }

    .event {
        transition: all 0.3s;
    }

    .event:hover {
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2);
        z-index: 10;

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


    @-webkit-keyframes slide-in-bottom {
        0% {
            -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
            opacity: 0
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1
        }
    }

    @keyframes slide-in-bottom {
        0% {
            -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
            opacity: 0
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1
        }
    }

    @-webkit-keyframes bounce-top {
        0% {
            -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
            opacity: 1
        }

        24% {
            opacity: 1
        }

        40% {
            -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        65% {
            -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        82% {
            -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        93% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        25%,
        55%,
        75%,
        87% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
            opacity: 1
        }
    }

    @keyframes bounce-top {
        0% {
            -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
            opacity: 1
        }

        24% {
            opacity: 1
        }

        40% {
            -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        65% {
            -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        82% {
            -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        93% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        25%,
        55%,
        75%,
        87% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
            opacity: 1
        }
    }

    @-webkit-keyframes fade-in {
        0% {
            opacity: 0
        }

        100% {
            opacity: 1
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0
        }

        100% {
            opacity: 1
        }
    }

    #C-Grid {
        display: grid;
    }

    #AR-Block:hover+#C-Grid {
        display: none;
        background-color: black;
    }

    a {
        color: #888
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