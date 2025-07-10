<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";
import { onMounted, ref } from "vue";
import FilterComponent from "@/components/FilterComponent.vue";
import { useAsync } from "@/composables/useAsync";
import LoaderComponent from "@/components/LoaderComponent.vue";

const { execute, data: events, error, loading } = useAsync(getEvents);
const sortedEvents = ref();

onMounted(() => {
	execute();
});
</script>

<template>
	<h2 class="text-3xl md:text-4xl pl-10 pt-6 font-bold text-yellow">
		Събития
	</h2>
	<FilterComponent />

	<div v-if="loading"><LoaderComponent /></div>
	<div v-else-if="error" class="p-10 text-center text-red">
		Error: {{ error }}
	</div>
	<div
		v-else-if="!events || events.length === 0"
		class="p-10 text-center text-white">
		No events found
	</div>
	<div
		v-else
		class="p-10 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 justify-items-center overflow-y-auto">
		<CardComponent
			class="max-w-md"
			v-for="event in sortedEvents ?? events"
			:event="event"
			:key="event.id" />
	</div>
</template>

<style>
input[type="checkbox"] {
	accent-color: var(--color-yellow);
}
</style>
