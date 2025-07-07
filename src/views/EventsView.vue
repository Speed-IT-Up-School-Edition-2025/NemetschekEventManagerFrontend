<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";

const events = getEvents();
</script>

<template>
	<div class="p-6 flex flex-col gap-6">
		<h2 class="text-3xl md:text-4xl px-6 font-bold text-yellow">Събития</h2>

		<div
			class="p-6 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 justify-items-center overflow-y-auto">
			<CardComponent
				class="max-w-md"
				v-for="event in events"
				:event="event"
				:key="event.id" />
		</div>
	</div>
</template>
