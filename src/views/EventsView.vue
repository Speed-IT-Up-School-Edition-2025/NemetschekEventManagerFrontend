<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getEvents } from "@/services/eventsService";

const events = getEvents();
</script>

<template>
	<CardComponent v-for="event in events" :event="event" :key="event.id" />
</template>
