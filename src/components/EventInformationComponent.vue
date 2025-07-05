<script setup lang="ts">
import type { Event } from "@/services/eventsService";

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
				<div
					class="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-1">
					<svg
						class="w-4 h-4 text-grey"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Event Date</h3>
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
				<div
					class="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-1">
					<svg
						class="w-4 h-4 text-grey"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Location</h3>
					<p class="text-white/80">{{ event.location }}</p>
				</div>
			</div>

			<!-- Sign Up Deadline -->
			<div class="flex items-start gap-3">
				<div
					class="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-1">
					<svg
						class="w-4 h-4 text-grey"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-white">
						Registration Deadline
					</h3>
					<p class="text-white/80">
						{{
							new Date(event.signUpDeadline).toLocaleDateString(
								"en-US",
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								}
							)
						}}
					</p>
				</div>
			</div>
		</div>

		<!-- Event Description -->
		<div class="border-t border-white/20 pt-6">
			<h3 class="text-xl font-semibold text-yellow mb-3">
				About This Event
			</h3>
			<p class="text-white/90 leading-relaxed whitespace-pre-wrap">
				{{ event.description }}
			</p>
		</div>
	</div>
</template>
