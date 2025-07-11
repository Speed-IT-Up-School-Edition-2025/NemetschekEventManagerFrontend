<script setup lang="ts">
import EventInformationComponent from "@/components/EventInformationComponent.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute, useRouter } from "vue-router";
import FormSubmit from "@/components/FormSubmit.vue";
import { useAsync } from "@/composables/useAsync";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { onMounted, ref, watch } from "vue";
import { createSubmission } from "@/services/submissionService.ts";
import type { FilledField } from "@/utils/types.ts";

const router = useRouter();
const submission = ref<FilledField[]>();

const {
	execute,
	data: event,
	loading,
	error,
} = useAsync(() => {
	const route = useRoute();

	if (!route.params.id || typeof route.params.id !== "string") {
		throw new Error("Event ID is required");
	}

	return getEventById(route.params.id);
});

const { execute: executeCreate } = useAsync(() => {
	const route = useRoute();

	// console.log("here");
	console.log(route.params.id);
	if (!route.params.id || typeof route.params.id !== "string") {
		throw new Error("Event ID is required");
	}
	console.log("here2");
	if (!submission.value) {
		throw new Error("Submission is required");
	}

	return createSubmission(route.params.id, submission.value);
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
				@submit-form="
					fields => {
						submission = fields;
						executeCreate();
					}
				" />
		</template>
	</TwoPanelLayout>
</template>
