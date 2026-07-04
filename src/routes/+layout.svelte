<script>
	import './layout.css';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/#mission', label: 'Our Mission' },
		{ href: '/#prototypes', label: 'Prototypes' },
		{ href: '/#team', label: 'Team' },
		{ href: '/blog', label: 'Blog' }
	];
</script>

<div class="min-h-screen flex flex-col bg-[#f7f5f0] leading-normal tracking-normal text-gray-900"
	style="font-family: 'Source Sans Pro', sans-serif;">

	<!-- ───── Header / Navigation ───── -->
	<header class="sticky top-0 z-50 bg-[#f7f5f0]/90 backdrop-blur border-b border-gray-900/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16 sm:h-20">
				<a class="flex items-center shrink-0" href="/" aria-label="EnHands home">
					<img class="h-10 sm:h-14 w-auto" src="/images/logos/Enhands_Full_Logo.svg" alt="EnHands Logo" />
				</a>

				<!-- Desktop navigation -->
				<nav class="hidden md:flex items-center gap-8" aria-label="Main">
					{#each navLinks as link}
						<a href={link.href}
							class="text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors">
							{link.label}
						</a>
					{/each}
				</nav>

				<div class="flex items-center gap-3">
					<a href="https://instagram.com/enhands" target="_blank" rel="noopener noreferrer"
						class="hidden sm:inline-flex text-gray-500 hover:text-blue-700 transition-colors"
						aria-label="EnHands on Instagram">
						<svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path
								d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
							</path>
						</svg>
					</a>

					<a href="/#donate"
						class="inline-block px-4 sm:px-6 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm">
						Donate
					</a>

					<!-- Mobile menu toggle -->
					<button type="button"
						class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-900/5"
						aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileMenuOpen}
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
						{#if mobileMenuOpen}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile navigation -->
		{#if mobileMenuOpen}
			<nav class="md:hidden border-t border-gray-900/5 bg-[#f7f5f0] px-4 pb-4 pt-2" aria-label="Main mobile">
				{#each navLinks as link}
					<a href={link.href}
						class="block py-2.5 px-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-900/5 hover:text-blue-700"
						onclick={() => (mobileMenuOpen = false)}>
						{link.label}
					</a>
				{/each}
				<a href="https://instagram.com/enhands" target="_blank" rel="noopener noreferrer"
					class="block py-2.5 px-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-900/5 hover:text-blue-700"
					onclick={() => (mobileMenuOpen = false)}>
					Instagram
				</a>
			</nav>
		{/if}
	</header>

	<!-- ───── Page content ───── -->
	<main class="flex-1 overflow-x-hidden">
		{@render children()}
	</main>

	<!-- ───── Footer ───── -->
	<footer class="bg-gray-900 text-gray-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
			<div class="grid gap-10 md:grid-cols-3">
				<!-- Brand -->
				<div>
					<img class="h-12 w-auto mb-4 brightness-0 invert" src="/images/logos/Enhands_Full_Logo.svg"
						alt="EnHands Logo" />
					<p class="text-sm leading-relaxed text-gray-400 max-w-xs">
						A student-driven non-profit from Munich developing affordable, functional
						prosthetic hands for people who would otherwise go without.
					</p>
					<a href="https://instagram.com/enhands" target="_blank" rel="noopener noreferrer"
						class="inline-flex mt-4 text-gray-400 hover:text-white transition-colors"
						aria-label="EnHands on Instagram">
						<svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path
								d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
							</path>
						</svg>
					</a>
				</div>

				<!-- Contact / Impressum -->
				<div>
					<h3 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact &amp; Impressum</h3>
					<address class="not-italic text-sm leading-relaxed text-gray-400">
						EnHands e.V.<br />
						Freisinger Landstraße 52<br />
						85748 Garching bei München, Germany<br />
						<a href="mailto:info@enhands.de" class="hover:text-white transition-colors">info@enhands.de</a><br />
						<a href="tel:+49892892 9459" class="hover:text-white transition-colors">+49 (89) 289 - 29459</a>
					</address>
				</div>

				<!-- Links -->
				<div>
					<h3 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">Get involved</h3>
					<ul class="space-y-2 text-sm">
						<li><a href="/#donate" class="text-gray-400 hover:text-white transition-colors">Donate</a></li>
						<li><a href="/#mission" class="text-gray-400 hover:text-white transition-colors">Our mission</a></li>
						<li><a href="/blog" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
						<li>
							<a href="/about-enhands.pdf" target="_blank" rel="noopener noreferrer"
								class="text-gray-400 hover:text-white transition-colors">About us (PDF)</a>
						</li>
						<li>
							<a href="/pages/privacy.html" class="text-gray-400 hover:text-white transition-colors">Privacy
								Policy</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-10 pt-6 border-t border-white/10 text-sm text-gray-500">
				© 2026 <a href="https://enhands.de" class="hover:text-white transition-colors">EnHands e.V.</a> All rights
				reserved.
			</div>
		</div>
	</footer>
</div>
