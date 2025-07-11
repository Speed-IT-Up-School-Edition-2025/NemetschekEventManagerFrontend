<script setup lang="ts">
import EventInformationComponent from "@/components/EventInformationComponent.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute, useRouter } from "vue-router";
import FormSubmit from "@/components/FormSubmit.vue";
import { useAsync } from "@/composables/useAsync";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { onMounted, watch } from "vue";

const router = useRouter();

const {
	execute,
	data: event,
	loading,
	error,
} = useAsync(() => {
	const route = useRoute();

	if (!route.params.id || typeof route.params.id !== "string") {
		// Handle the case where the event ID is not provided or is not a string
		throw new Error("Event ID is required");
	}

	return getEventById(route.params.id);
});

watch(event, newEvent => {
	if (newEvent === null) {
		router.push("/not-found");
	}
});

onMounted(execute);
</script>

<template>
	<TwoPanelLayout action-name="">
		<template #left>
			<div v-if="loading">
				<LoaderComponent />
			</div>
			<div v-else-if="error" class="p-10 text-center text-red">
				Възникна грешка: {{ error }}
			</div>
			<EventInformationComponent v-if="event" :event="event" />
		</template>
		<template #right>
			<div v-if="loading">
				<LoaderComponent />
			</div>
			<div v-else-if="error" class="p-10 text-center text-red">
				Възникна грешка: {{ error }}
			</div>
			<FormSubmit
				v-if="event?.fields"
				:fields="event.fields"
				action-name="Запиши се"
				@submit-form="console.log" />
		</template>
	</TwoPanelLayout>
</template>
