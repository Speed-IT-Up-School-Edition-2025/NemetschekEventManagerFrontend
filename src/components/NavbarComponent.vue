<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import HamburgerIcon from "@/components/icons/HamburgerIcon.vue";
import NemetschekIcon from "./icons/NemetschekIcon.vue";

const router = useRouter();

const userStore = useUserStore();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};

const logout = async () => {
	router.push("/login");
	try {
		await userStore.logout();
	} catch (error) {
		console.error("Logout failed:", error);
	}
};
</script>

<template>
	<nav
		v-if="userStore.isAuthenticated"
		class="bg-dark-grey text-white px-6 shadow-md relative z-50">
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-stretch justify-between">
			<!-- Left side -->
			<div class="flex items-stretch">
				<RouterLink
					to="/"
					class="flex items-center justify-center h-full mr-5 transition-all hover:scale-105">
					<NemetschekIcon />
				</RouterLink>
				<RouterLink
					to="/"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4"
					exact-active-class="text-yellow border-b-2 border-yellow">
					Събития
				</RouterLink>
				<RouterLink
					to="/events/joined"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4"
					active-class="text-yellow border-b-2 border-yellow">
					Присъединени събития
				</RouterLink>
				<RouterLink
					v-if="userStore.isAdmin"
					to="/users"
					class="hover:text-yellow transition-colors px-4 flex items-center py-4"
					active-class="text-yellow border-b-2 border-yellow">
					Потребители
				</RouterLink>
			</div>

			<!-- Right side -->
			<div class="flex items-center gap-4 py-4">
				<RouterLink
					v-if="userStore.isAdmin"
					to="/events/create"
					class="bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium"
					active-class="bg-yellow opacity-90 shadow-md">
					Създай събитие
				</RouterLink>
				<button
					@click="logout"
					class="bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium cursor-pointer">
					Излизане
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="md:hidden">
			<!-- Mobile Header -->
			<div class="flex items-center justify-between py-4">
				<HamburgerIcon @click="toggleMobileMenu" :is-mobile-menu-open="isMobileMenuOpen" />

				<RouterLink
					to="/"
					class="flex items-center justify-center h-full transition-all hover:scale-105">
					<NemetschekIcon />
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
					class="absolute top-full left-0 right-0 bg-dark-grey border-y border-white/50 shadow-lg z-40 px-6 py-4">
					<div class="space-y-2">
						<RouterLink
							to="/"
							@click="closeMobileMenu"
							class="block py-2 hover:text-yellow transition-colors"
							exact-active-class="text-yellow bg-white/10 px-2 -mx-2 rounded">
							Събития
						</RouterLink>
						<RouterLink
							to="/events/joined"
							@click="closeMobileMenu"
							class="block py-2 hover:text-yellow transition-colors"
							active-class="text-yellow bg-white/10 px-2 -mx-2 rounded">
							Присъединени събития
						</RouterLink>
						<RouterLink
							v-if="userStore.isAdmin"
							to="/users"
							@click="closeMobileMenu"
							class="block py-2 hover:text-yellow transition-colors"
							active-class="text-yellow bg-white/10 px-2 -mx-2 rounded">
							Потребители
						</RouterLink>
						<div class="pt-2 space-y-2">
							<RouterLink
								v-if="userStore.isAdmin"
								to="/events/create"
								@click="closeMobileMenu"
								class="block bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium text-center"
								active-class="bg-yellow opacity-90 shadow-md">
								Създай събитие
							</RouterLink>
							<button
								@click="logout"
								class="block bg-yellow text-dark-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium">
								Излизане
							</button>
						</div>
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
