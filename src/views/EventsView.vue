<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";

const events = getEvents();
</script>

<template>
	<div class="pl-5 pt-10 pr-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto">
		<CardComponent v-for="event in events" :event="event" :key="event.id" />
	</div>
</template>
