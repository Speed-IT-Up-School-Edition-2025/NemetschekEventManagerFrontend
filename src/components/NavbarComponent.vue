<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = useUserStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};
</script>

<template>
	<nav
		v-if="userStore.isAuthenticated"
		class="bg-dark-grey text-white px-6 py-4 shadow-md">
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center justify-between">
			<!-- Left side -->
			<div class="flex items-center gap-10">
				<RouterLink
					to="/"
					class="text-yellow font-bold text-xl hover:underline">
					Event Manager
				</RouterLink>
				<RouterLink to="/" class="hover:text-yellow transition-colors">
					Events
				</RouterLink>
				<RouterLink
					to="/events/joined"
					class="hover:text-yellow transition-colors">
					Joined Events
				</RouterLink>
				<RouterLink
					v-if="userStore.isAdmin"
					to="/users"
					class="hover:text-yellow transition-colors">
					Users
				</RouterLink>
			</div>

			<!-- Right side -->
			<div class="flex items-center gap-4">
				<RouterLink
					v-if="userStore.isAdmin"
					to="/events/create"
					class="bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium">
					Create Event
				</RouterLink>
				<RouterLink
					to="/logout"
					class="bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium">
					Log Out
				</RouterLink>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="md:hidden">
			<!-- Mobile Header -->
			<div class="flex items-center justify-between">
				<button
					@click="toggleMobileMenu"
					class="text-white hover:text-yellow transition-colors">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							v-if="!isMobileMenuOpen"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16" />
						<path
							v-else
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<RouterLink
					to="/"
					class="text-yellow font-bold text-xl hover:underline">
					Event Manager
				</RouterLink>
			</div>

			<!-- Mobile Menu -->
			<div
				v-if="isMobileMenuOpen"
				class="mt-4 space-y-2 border-t border-white/20 pt-4">
				<RouterLink
					to="/"
					@click="closeMobileMenu"
					class="block py-2 hover:text-yellow transition-colors">
					Events
				</RouterLink>
				<RouterLink
					to="/events/joined"
					@click="closeMobileMenu"
					class="block py-2 hover:text-yellow transition-colors">
					Joined Events
				</RouterLink>
				<RouterLink
					v-if="userStore.isAdmin"
					to="/users"
					@click="closeMobileMenu"
					class="block py-2 hover:text-yellow transition-colors">
					Users
				</RouterLink>
				<div class="pt-2 space-y-2">
					<RouterLink
						v-if="userStore.isAdmin"
						to="/events/create"
						@click="closeMobileMenu"
						class="block bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium text-center">
						Create Event
					</RouterLink>
					<RouterLink
						to="/logout"
						@click="closeMobileMenu"
						class="block bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium text-center">
						Log Out
					</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>
