<script setup lang="ts">
import EventInformationComponent from "@/components/EventInformationComponent.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute } from "vue-router";

const route = useRoute();

if (!route.params.id || typeof route.params.id !== "string") {
	// Handle the case where the event ID is not provided or is not a string
	throw new Error("Event ID is required");
}

const event = getEventById(route.params.id);
</script>

<template>
	<TwoPanelLayout>
		<template #left>
			<EventInformationComponent :event="event" />
		</template>
		<template #right>
			<div class="text-center text-white/60 py-8">
				<h3 class="text-xl font-semibold mb-2">Sign Up</h3>
				<p>Sign up form will appear here</p>
			</div>
		</template>
	</TwoPanelLayout>
</template>
