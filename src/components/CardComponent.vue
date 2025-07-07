<template>
	<div
		class="flex flex-col items-start justify-evenly py-4 pl-4 pr-10 border-yellow rounded-lg border-2 border-solid bg-dark-grey transition delay-100 duration-300 ease-in-out hover:shadow-xl/30">
		<h1 class="text-x1 place-self-center pt-3 text-yellow text-3xl font-semibold text-center">
			{{ event.title }}
		</h1>
		<p class="flex pt-4 pl-2 gap-3 items-start">
			<span><LocationIcon /></span>
			<span class="text-white text-lg">{{ event.location }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><CalendarIcon /></span>
			<span class="text-white text-lg">{{ event.date }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><ClockIcon /></span>
			<span class="text-white text-lg">{{ event.signUpDeadline }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><InfoIcon /></span>
			<span class="text-white text-lg">{{ shortenedDescription }}</span>
		</p>
		<RouterLink
			:to="`/events/${event.id}`"
			class="place-self-end h-10 px-4 py-2 border-2 text-white border-yellow-500 rounded-2xl border-solid transition delay-100 duration-75 ease-in-out hover:text-white hover:border-transparent hover:bg-yellow-500">
			Запиши се
		</RouterLink>
	</div>
</template>
<script setup lang="ts">
import CalendarIcon from "./icons/CalendarIcon.vue";
import type { Event } from "@/services/eventsService";
import LocationIcon from "./icons/LocationIcon.vue";
import ClockIcon from "./icons/ClockIcon.vue";
import InfoIcon from "./icons/InfoIcon.vue";

const { event } = defineProps<{ event: Event }>();

const shortenedDescription = event.description
	? event.description.slice(0, 50) + (event.description.length > 50 ? "..." : "")
	: "";
</script>
