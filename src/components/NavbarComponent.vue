<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
	<nav
		v-if="userStore.isAuthenticated"
		class="bg-dark-grey text-white px-6 py-4 flex items-center justify-between shadow-md">
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
		<div class="flex items-center gap-10">
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
	</nav>
</template>
