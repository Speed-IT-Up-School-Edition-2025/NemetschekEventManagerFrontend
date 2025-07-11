<script setup lang="ts">
import EventInformationFormComponent from "@/components/EventInformationFormComponent.vue";
import CreateForm from "@/components/FormCreator/CreateForm.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { createEvent } from "@/services/eventsService";
import { useCurrentEventStore } from "@/stores/currentEventStore";
import { useUIStore } from "@/stores/uiStore";
import { useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const { currentEvent } = useCurrentEventStore();
const { triggerToast } = useUIStore();

const router = useRouter();

const createEventInformationRef = useTemplateRef("createEventInformationRef");
const createEventFormRef = useTemplateRef("createEventFormRef");

function handleSubmit() {
	const eventInformation = createEventInformationRef.value?.getState();
	const formFields = createEventFormRef.value?.getState();

	createEvent({
		...eventInformation!,
		fields: formFields!,
	})
		.then(({ id }) => {
			triggerToast("Събитието е създадено успешно!", "success");

			router.push(`/events/${id}`);
		})
		.catch(error => {
			console.error("Грешка при създаване на събитието:", error);

			triggerToast(
				"Възникна грешка при създаване на събитието. Моля, опитайте отново.",
				"error"
			);
		});
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
					class="w-full bg-yellow text-dark-grey py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer mt-6">
					Запази информацията
				</button>
			</template>
		</TwoPanelLayout>
	</form>
</template>
