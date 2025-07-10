<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";
import "@vuepic/vue-datepicker/dist/main.css";
import FilterComponent from "@/components/FilterComponent.vue";
import type { Event } from "@/utils/types";
import { ref } from "vue";

const events = ref(getEvents());
const searchedEvents = ref<Event[]>([]);

</script>

<template>
	<h2 class="text-3xl md:text-4xl pl-10 pt-6 font-bold text-yellow">Събития</h2>
	<FilterComponent v-model:events = "events" v-model:searched-events = "searchedEvents" />
	<div
		class="p-10 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 justify-items-center overflow-y-auto">
		<CardComponent
			class="max-w-md"
			v-for="event in searchedEvents ?? events"
			:event="event"
			:key="event.id" />
	</div>
</template>

<style>
input[type="checkbox"] {
	accent-color: var(--color-yellow);
}
</style>
