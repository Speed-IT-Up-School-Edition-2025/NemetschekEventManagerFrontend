<script setup lang="ts">
import EventInformationComponent from "@/components/EventInformationComponent.vue";
import FourPanelLayout from "@/components/FourPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute } from "vue-router";
import FormSubmit from "@/components/FormSubmit.vue";
import type { FormField } from "@/utils/types.ts";

const route = useRoute();

if (!route.params.id || typeof route.params.id !== "string") {
	// Handle the case where the event ID is not provided or is not a string
	throw new Error("Event ID is required");
}

const event = getEventById(route.params.id);
const fields: FormField[] = [
	{
		name: "fddfs",
		required: true,
		type: "text",
		id: 0,
		options: [],
	},
	{
		name: "fddfs2",
		required: false,
		type: "radio",
		id: 1,
		options: ["Option 1", "Option 2", "Option 3"],
	},
	{
		name: "fddfs2",
		required: false,
		type: "checkbox",
		id: 2,
		options: ["Option 1", "Option 2", "Option 3"],
	},
];
</script>

<template>
	<FourPanelLayout>
		<template #left>
			<EventInformationComponent :event="event" />
		</template>
		<template #right>
			<FormSubmit :fields="fields" action-name="Hehe" @submit-form="console.log"></FormSubmit>
			<!--			<div class="text-center text-white/60 py-8">-->
			<!--				<h3 class="text-xl font-semibold mb-2">Запиши се</h3>-->
			<!--				<p>Sign up form will appear here</p>-->
			<!--			</div>-->
		</template>
	</FourPanelLayout>
</template>
