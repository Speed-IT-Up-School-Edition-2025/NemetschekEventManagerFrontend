<template>
	<div
		class="flex flex-col h-full py-4 pl-6 pr-10 gap-5 border-yellow rounded-lg border-2 border-solid bg-dark-grey transition delay-100 duration-300 ease-in-out hover:shadow-xl/30 cursor-pointer"
		@click="redirect">
		<h1
			class="w-full pt-3 text-yellow text-3xl font-semibold text-center break-words hyphens-auto leading-tight">
			{{ event.name }}
		</h1>
		<div class="flex flex-col gap-3 flex-grow">
			<p class="flex pl-2 gap-3 items-start">
				<span><LocationIcon /></span>
				<span class="text-white text-lg break-words min-w-0 flex-1">{{
					event.location
				}}</span>
			</p>
			<p class="flex pl-2 gap-3 items-start">
				<span><CalendarIcon /></span>
				<span class="text-white text-lg break-words min-w-0 flex-1">{{
					formatDate(event.date)
				}}</span>
			</p>
			<p class="flex pl-2 gap-3 items-start">
				<span><ClockIcon /></span>
				<span class="text-white text-lg break-words min-w-0 flex-1">{{
					formatDate(event.signUpDeadline)
				}}</span>
			</p>
			<p
				v-if="event.peopleLimit && event.peopleLimit > 0"
				class="flex pl-2 gap-3 items-start">
				<span><UserIcon /></span>
				<span class="text-white text-lg break-words min-w-0 flex-1">
					{{
						event.spotsLeft === 0
							? "Няма свободни места"
							: `${event.spotsLeft} свободни места`
					}}
				</span>
			</p>
			<p class="flex pl-2 gap-3 items-start flex-grow">
				<span><InfoIcon /></span>
				<span class="text-white text-lg break-words min-w-0 flex-1">{{
					shortenedDescription
				}}</span>
			</p>
			<div class="mt-auto flex justify-end">
				<RouterLink
					:to="`/events/${event.id}`"
					class="h-10 px-4 py-2 border-2 text-white border-yellow-500 rounded-2xl border-solid transition delay-100 duration-75 ease-in-out hover:text-white hover:border-transparent hover:bg-yellow-500"
					@click.stop>
					{{ buttonName }}
				</RouterLink>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import CalendarIcon from "./icons/CalendarIcon.vue";
import type { Event } from "@/utils/types";
import LocationIcon from "./icons/LocationIcon.vue";
import ClockIcon from "./icons/ClockIcon.vue";
import InfoIcon from "./icons/InfoIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import { useRouter } from "vue-router";

const { event, buttonName } = defineProps<{
	event: Event;
	buttonName: string;
}>();
const router = useRouter();
const shortenedDescription = event.description
	? event.description.slice(0, 50) + (event.description.length > 50 ? "..." : "")
	: "";

function formatDate(dateString: string) {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

function redirect() {
	router.push(`/events/${event.id}`);
}
</script>
