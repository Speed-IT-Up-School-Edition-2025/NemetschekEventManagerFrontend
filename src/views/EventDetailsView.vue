<script setup lang="ts">
import EventInformationComponent from "@/components/EventInformationComponent.vue";
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute, useRouter } from "vue-router";
import FormSubmit from "@/components/FormSubmit.vue";
import { useAsync } from "@/composables/useAsync";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { onMounted, watch } from "vue";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

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
			<div v-if="event" class="relative">
				<EventInformationComponent :event="event" />
				<RouterLink
					v-if="userStore.isAdmin"
					:to="{ name: 'edit-event', params: { id: event.id } }"
					class="absolute top-0 right-0 bg-yellow text-grey px-4 py-2 rounded-md hover:opacity-90 transition-colors font-medium">
					Редактиране
				</RouterLink>
			</div>
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
				:event-id="event?.id"
				:fields="event.fields"
				action-name="Запиши се"></FormSubmit>
		</template>
	</TwoPanelLayout>
</template>
