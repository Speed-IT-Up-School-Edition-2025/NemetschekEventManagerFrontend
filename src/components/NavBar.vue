<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
	<nav
		class="bg-grey text-white font-roboto px-6 py-4 flex items-center justify-between shadow-md">
		<!-- Left side -->
		<div class="flex items-center gap-10">
			<RouterLink
				to="/events"
				class="text-yellow font-bold text-xl hover:underline">
				Event Manager
			</RouterLink>
			<RouterLink
				to="/events"
				class="hover:text-yellow transition-colors">
				Events
			</RouterLink>
			<RouterLink
				to="/joined-events"
				class="hover:text-yellow transition-colors">
				Joined Events
			</RouterLink>
		</div>

		<!-- Right side -->
		<div>
			<RouterLink
				to="/login"
				class="bg-yellow text-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium">
				Log in
			</RouterLink>
		</div>
	</nav>
</template>
