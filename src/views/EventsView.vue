<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";

const events = getEvents();
</script>

<template>
	<div
		class="p-10 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 justify-items-center overflow-y-auto">
		<CardComponent class="max-w-md" v-for="event in events" :event="event" :key="event.id" />
	</div>
</template>
