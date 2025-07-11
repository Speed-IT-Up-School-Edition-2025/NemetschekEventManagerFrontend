<script setup lang="ts">
import EventInformationFormComponent from "@/components/EventInformationFormComponent.vue";
import CreateForm from "@/components/FormCreator/CreateForm.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { updateEvent, getEventById } from "@/services/eventsService";
import { useCurrentEventStore } from "@/stores/currentEventStore";
import { useUIStore } from "@/stores/uiStore";
import { useAsync } from "@/composables/useAsync";
import { useTemplateRef, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const { setCurrentEvent, clearCurrentEvent } = useCurrentEventStore();
const { triggerToast } = useUIStore();

const router = useRouter();

const route = useRoute();

const editEventInformationRef = useTemplateRef("editEventInformationRef");
const editEventFormRef = useTemplateRef("editEventFormRef");

const {
	execute: loadEvent,
	data: currentEvent,
	loading: isLoading,
	error: loadError,
} = useAsync(async () => {
	const eventId = route.params.id as string;

	if (!eventId || typeof eventId !== "string") {
		throw new Error("Event ID is required");
	}

	const event = await getEventById(eventId);
	setCurrentEvent(event);
	return event;
});

onMounted(async () => {
	try {
		await loadEvent();
	} catch (error) {
		console.error("Грешка при зареждане на събитието:", error);

		triggerToast("Възникна грешка при зареждане на събитието.", "error");

		router.push("/events");
	}
});

function handleSubmit() {
	const eventInformation = editEventInformationRef.value?.getState();
	const formFields = editEventFormRef.value?.getState();

	updateEvent(route.params.id as string, {
		...eventInformation!,
		fields: formFields!,
	})
		.then(() => {
			triggerToast("Събитието е обновено успешно!", "success");

			router.push(`/events/${route.params.id}`);

			clearCurrentEvent();
		})
		.catch(error => {
			console.error("Грешка при обновяване на събитието:", error);
			triggerToast(
				"Възникна грешка при обновяване на събитието. Моля, опитайте отново.",
				"error"
			);
		});
}
</script>

<template>
	<TwoPanelLayout action-name="Редактиране на събитие">
		<template #left>
			<div v-if="isLoading"><LoaderComponent /></div>
			<div v-else-if="loadError" class="p-10 text-center text-red-500">
				Error: {{ loadError }}
			</div>
			<EventInformationFormComponent
				v-else
				ref="editEventInformationRef"
				v-bind="{ event: currentEvent ?? undefined }" />
		</template>
		<template #right>
			<div v-if="isLoading"><LoaderComponent /></div>
			<div v-else-if="loadError" class="p-10 text-center text-red-500">
				Error: {{ loadError }}
			</div>
			<form v-else @submit.prevent="handleSubmit">
				<CreateForm
					ref="editEventFormRef"
					v-bind="{ fields: currentEvent?.fields ?? [] }" />

				<button
					type="submit"
					class="w-full bg-yellow text-dark-grey py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer mt-6">
					Запази промените
				</button>
			</form>
		</template>
	</TwoPanelLayout>
</template>
