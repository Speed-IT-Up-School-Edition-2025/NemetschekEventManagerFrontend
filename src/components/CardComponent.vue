<template>
	<div
		class="flex flex-col items-start justify-evenly py-4 pl-4 pr-10 border-yellow rounded-lg border-2 border-solid bg-cyan-100 transition delay-100 duration-300 ease-in-out hover:shadow-xl/30">
		<h1 class="text-x1 pt-3 text-yellow text-3xl font-semibold text-center">
			{{ event.title }}
		</h1>
		<p class="flex pt-4 pl-2 gap-3 items-start">
			<span><PlaceIcon /></span>
			<span class="text-grey text-lg">{{ event.location }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><DateIcon /></span>
			<span class="text-grey text-lg">{{ event.date }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><DueDateIcon /></span>
			<span class="text-grey text-lg">{{ event.signUpDeadline }}</span>
		</p>
		<p class="flex pt-2 pl-2 gap-3 items-start">
			<span><DescriptionIcon /></span>
			<span class="text-grey text-lg">{{ shortenedDescription }}</span>
		</p>
		<RouterLink
			:to="`/events/${event.id}`"
			class="place-self-end h-10 px-4 py-2 border-2 text-black border-yellow-500 rounded-2xl border-solid transition delay-100 duration-75 ease-in-out hover:text-white hover:border-transparent hover:bg-yellow-500">
			Запиши се
		</RouterLink>
	</div>
</template>
<script setup lang="ts">
import DateIcon from "./icons/DateIcon.vue";
import DueDateIcon from "./icons/DueDateIcon.vue";
import PlaceIcon from "./icons/PlaceIcon.vue";
import DescriptionIcon from "./icons/DescriptionIcon.vue";
import type { Event } from "@/services/eventsService";

const { event } = defineProps<{ event: Event }>();

const shortenedDescription = event.description
	? event.description.slice(0, 50) + (event.description.length > 50 ? "..." : "")
	: "";
</script>
