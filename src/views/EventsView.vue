<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";
import { onMounted, ref } from "vue";
import FilterComponent from "@/components/FilterComponent.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import type { Event } from "@/utils/types";

const events = ref<Event[]>([]);
const searchedEvents = ref<Event[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchEvents() {
	loading.value = true;
	error.value = null;
	try {
		const result = await getEvents();
		events.value = result;
	} catch (e: any) {
		error.value = e?.message || "Грешка при зареждане на събитията.";
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	fetchEvents();
});
</script>

<template>
	<h2 class="text-3xl md:text-4xl pl-10 pt-6 font-bold text-yellow">Събития</h2>

	<div v-if="loading"><LoaderComponent /></div>
	<div v-else-if="error" class="p-10 text-center text-red">Възникна грешка: {{ error }}</div>
	<div v-else-if="!events || events.length === 0" class="p-10 text-center text-white">
		Няма намерени събития
	</div>
	<div v-else>
		<FilterComponent v-model:events="events" v-model:searched-events="searchedEvents" />
		<div
			class="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto auto-rows-fr">
			<CardComponent
				class="w-full min-h-[400px]"
				v-for="event in searchedEvents.length === 0 ? events : searchedEvents"
				:event="event"
				button-name="Запиши се"
				:key="event.id" />
		</div>
	</div>
</template>

<style>
input[type="checkbox"] {
	accent-color: var(--color-yellow);
}
</style>
