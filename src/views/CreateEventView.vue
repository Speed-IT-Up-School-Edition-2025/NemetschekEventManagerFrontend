<script setup lang="ts">
import EventInformationFormComponent from "@/components/EventInformationFormComponent.vue";
import CreateForm from "@/components/FormCreator/CreateForm.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { createEvent } from "@/services/eventsService";
import { useCurrentEventStore } from "@/stores/currentEventStore";
import { useUIStore } from "@/stores/uiStore";
import { useTemplateRef, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { extractErrorMessage } from "@/utils/errorHandling";
import type { CreateEventDto } from "@/utils/types";

const { currentEvent, clearCurrentEvent } = useCurrentEventStore();
const { triggerToast } = useUIStore();

const router = useRouter();

const createEventInformationRef = useTemplateRef<{
	getState: () => CreateEventDto;
	isValid: () => boolean;
}>("createEventInformationRef");
const createEventFormRef = useTemplateRef("createEventFormRef");

// Computed property to check if form is valid
const isFormValid = computed(() => {
	// Check if the event information form is valid
	const eventInfoValid = createEventInformationRef.value?.isValid?.() ?? true;
	return eventInfoValid;
});

// Clear when leaving the page
onUnmounted(() => {
	clearCurrentEvent();
});

function handleSubmit() {
	try {
		const eventInformation = createEventInformationRef.value?.getState();
		const formFields = createEventFormRef.value?.getState();

		createEvent({
			...eventInformation!,
			fields: formFields!,
		})
			.then(({ id }) => {
				triggerToast("Събитието беше създадено успешно!", "success");
				clearCurrentEvent(); // Clear the event data after successful creation
				router.push(`/events/${id}`);
			})
			.catch(error => {
				console.error("Грешка при създаване на събитието:", error);

				triggerToast(
					extractErrorMessage(
						error,
						"Възникна грешка при създаване на събитието. Моля, опитайте отново."
					),
					"error"
				);
			});
	} catch (validationError) {
		// Handle client-side validation errors
		triggerToast(
			extractErrorMessage(
				validationError,
				"Моля, коригирайте грешките във формата"
			),
			"error"
		);
	}
}
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<TwoPanelLayout action-name="Създаване на ново събитие">
			<template #left>
				<EventInformationFormComponent
					ref="createEventInformationRef"
					v-bind="{ event: currentEvent ?? undefined }" />
			</template>
			<template #right>
				<CreateForm
					ref="createEventFormRef"
					v-bind="{ fields: currentEvent?.fields ?? [] }" />

				<button
					type="submit"
					:disabled="!isFormValid"
					:class="[
						'w-full py-3 rounded-lg font-semibold transition-all cursor-pointer mt-6',
						isFormValid
							? 'bg-yellow text-dark-grey hover:opacity-90'
							: 'bg-grey-400 text-grey-200 cursor-not-allowed',
					]">
					Запази информацията
				</button>
			</template>
		</TwoPanelLayout>
	</form>
</template>
