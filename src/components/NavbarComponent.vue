<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import HamburgerIcon from "@/components/HamburgerIcon.vue";

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
		class="bg-dark-grey text-white px-6 shadow-md">
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-stretch justify-between">
			<!-- Left side -->
			<div class="flex items-stretch">
				<RouterLink
					to="/"
					class="text-yellow font-bold text-xl hover:underline px-4 -ml-4 flex items-center py-4">
					Event Manager
				</RouterLink>
				<RouterLink
					to="/"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4">
					Events</RouterLink
				>
				<RouterLink
					to="/events/joined"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4">
					Joined Events
				</RouterLink>
				<RouterLink
					v-if="userStore.isAdmin"
					to="/users"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4">
					Users
				</RouterLink>
			</div>

			<!-- Right side -->
			<div class="flex items-center gap-4 py-4">
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
				<HamburgerIcon
					@click="toggleMobileMenu"
					:is-mobile-menu-open="isMobileMenuOpen" />

				<RouterLink
					to="/"
					class="text-yellow font-bold text-xl hover:underline">
					Event Manager
				</RouterLink>
			</div>

			<!-- Mobile Menu -->
			<transition
				enter-active-class="transition-all duration-400 ease-out"
				enter-from-class="opacity-0 -translate-y-4"
				enter-to-class="opacity-100 translate-y-0"
				leave-active-class="transition-all duration-300 ease-in"
				leave-from-class="opacity-100 translate-y-0"
				leave-to-class="opacity-0 -translate-y-4">
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
			</transition>
		</div>
	</nav>
</template>

<style scoped>
.transition-all {
	transition-property: all;
}
</style>
