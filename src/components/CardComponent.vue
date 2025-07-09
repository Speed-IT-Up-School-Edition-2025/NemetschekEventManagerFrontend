<template>
	<div
		class="flex flex-col items-start py-4 pl-6 pr-10 gap-5 border-yellow rounded-lg border-2 border-solid bg-dark-grey transition delay-100 duration-300 ease-in-out hover:shadow-xl/30"
		@click="redirect">
		<h1
			class="text-x1 place-self-center pt-3 text-yellow text-3xl font-semibold text-center">
			{{ event.name }}
		</h1>
		<div class="flex flex-col gap-3">
			<p class="flex pl-2 gap-3 items-start">
				<span><LocationIcon /></span>
				<span class="text-white text-lg">{{ event.location }}</span>
			</p>
			<p class="flex pl-2 gap-3 items-start">
				<span><CalendarIcon /></span>
				<span class="text-white text-lg">{{ event.date }}</span>
			</p>
			<p class="flex pl-2 gap-3 items-start">
				<span><ClockIcon /></span>
				<span class="text-white text-lg">{{
					event.signUpDeadline
				}}</span>
			</p>
			<p class="flex pl-2 gap-3 items-start">
				<span><InfoIcon /></span>
				<span class="text-white text-lg">{{
					shortenedDescription
				}}</span>
			</p>
			<RouterLink
				:to="`/events/${event.id}`"
				class="place-self-end h-10 px-4 py-2 border-2 text-white border-yellow-500 rounded-2xl border-solid transition delay-100 duration-75 ease-in-out hover:text-white hover:border-transparent hover:bg-yellow-500">
				Запиши се
			</RouterLink>
		</div>
	</div>
</template>
<script setup lang="ts">
import CalendarIcon from "./icons/CalendarIcon.vue";
import type { Event } from "@/utils/types";
import LocationIcon from "./icons/LocationIcon.vue";
import ClockIcon from "./icons/ClockIcon.vue";
import InfoIcon from "./icons/InfoIcon.vue";
import { useRouter } from "vue-router";

const { event } = defineProps<{ event: Event }>();
const router = useRouter();
const shortenedDescription = event.description
	? event.description.slice(0, 50) +
		(event.description.length > 50 ? "..." : "")
	: "";

function redirect() {
	router.push(`/events/${event.id}`);
}
</script>
