<script setup lang="ts">
import type { Event } from "@/utils/types";

import CalendarIcon from "./icons/CalendarIcon.vue";
import LocationIcon from "./icons/LocationIcon.vue";
import ClockIcon from "./icons/ClockIcon.vue";

const { event } = defineProps<{
	event: Event;
}>();

// Helper function to format datetime
const formatDateTime = (isoString: string) => {
	return new Date(isoString).toLocaleDateString("bg-BG", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
</script>

<template>
	<div class="sticky top-6 space-y-6">
		<!-- Event Title -->
		<div class="border-b border-white/20 pb-4">
			<h1 class="text-3xl font-bold text-yellow">{{ event.name }}</h1>
		</div>

		<!-- Event Details Grid -->
		<div class="space-y-4">
			<!-- Date -->
			<div class="flex items-start gap-3">
				<CalendarIcon />
				<div>
					<h3 class="text-lg font-semibold text-white">
						Дата и час на събитие
					</h3>
					<p class="text-white/80">
						{{ formatDateTime(event.date) }}
					</p>
				</div>
			</div>

			<!-- Location -->
			<div class="flex items-start gap-3">
				<LocationIcon />
				<div>
					<h3 class="text-lg font-semibold text-white">Място</h3>
					<p class="text-white/80">{{ event.location }}</p>
				</div>
			</div>

			<!-- Sign Up Deadline -->
			<div class="flex items-start gap-3">
				<ClockIcon />
				<div>
					<h3 class="text-lg font-semibold text-white">
						Краен срок на записване
					</h3>
					<p class="text-white/80">
						{{ formatDateTime(event.signUpDeadline) }}
					</p>
				</div>
			</div>
		</div>

		<!-- Event Description -->
		<div class="border-t border-white/20 pt-6">
			<h3 class="text-xl font-semibold text-yellow mb-3">За събитието</h3>
			<p class="text-white/90 leading-relaxed whitespace-pre-wrap">
				{{ event.description }}
			</p>
		</div>
	</div>
</template>
