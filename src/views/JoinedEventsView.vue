<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { getJoinedEvents } from "@/services/eventsService";

const joinedEvents = getJoinedEvents();
</script>

<template>
	<div class="p-6 flex flex-col gap-6">
		<h2 class="text-3xl md:text-4xl px-6 font-bold text-yellow">Присъединени събития</h2>

		<div
			class="p-6 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 justify-items-center overflow-y-auto">
			<CardComponent
				class="max-w-md"
				v-for="joinedEvent in joinedEvents"
				:event="joinedEvent"
				:key="joinedEvent.id" />
		</div>
	</div>
</template>
