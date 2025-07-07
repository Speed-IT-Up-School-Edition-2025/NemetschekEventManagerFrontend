<script setup lang="ts">
import type { Event } from "@/services/eventsService";

import CalendarIcon from "./icons/CalendarIcon.vue";
import LocationIcon from "./icons/LocationIcon.vue";
import ClockIcon from "./icons/ClockIcon.vue";

const { event } = defineProps<{
	event: Event;
}>();
</script>

<template>
	<div class="space-y-6">
		<!-- Event Title -->
		<div class="border-b border-white/20 pb-4">
			<h1 class="text-3xl font-bold text-yellow">{{ event.title }}</h1>
		</div>

		<!-- Event Details Grid -->
		<div class="space-y-4">
			<!-- Date -->
			<div class="flex items-start gap-3">
				<CalendarIcon />
				<div>
					<h3 class="text-lg font-semibold text-white">Дата на събитие</h3>
					<p class="text-white/80">
						{{
							new Date(event.date).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})
						}}
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
					<h3 class="text-lg font-semibold text-white">Краен срок на регистрация</h3>
					<p class="text-white/80">
						{{
							new Date(event.signUpDeadline).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})
						}}
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
