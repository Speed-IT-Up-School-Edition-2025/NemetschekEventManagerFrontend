<script setup lang="ts">
import TwoPanelLayout from "@/components/TwoPanelLayout.vue";
import { getEventById } from "@/services/eventsService";
import { useRoute, useRouter } from "vue-router";
import FormSubmit from "@/components/FormSubmit.vue";
import { useAsync } from "@/composables/useAsync";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { onMounted, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import LocationIcon from "@/components/icons/LocationIcon.vue";
import ClockIcon from "@/components/icons/ClockIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";

const router = useRouter();
const userStore = useUserStore();

// Helper function to format datetime
const formatDateTime = (isoString: string) => {
	return new Date(isoString).toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const {
	execute,
	data: event,
	loading,
	error,
} = useAsync(() => {
	const route = useRoute();

	if (!route.params.id || typeof route.params.id !== "string") {
		throw new Error("Event ID is required");
	}

	return getEventById(route.params.id);
});

watch(event, newEvent => {
	if (newEvent === null) {
		router.push("/not-found");
	}
});

onMounted(execute);
</script>

<template>
	<TwoPanelLayout action-name="">
		<template #left>
			<div v-if="loading">
				<LoaderComponent />
			</div>
			<div v-else-if="error" class="p-10 text-center text-red">
				Възникна грешка: {{ error }}
			</div>
			<div v-if="event" class="space-y-6">
				<!-- Event Title -->
				<div class="border-b border-white/20 pb-4">
					<h1
						class="text-3xl font-bold text-yellow break-words hyphens-auto leading-tight">
						{{ event.name }}
					</h1>
				</div>

				<!-- Event Information (without title) -->
				<div class="sticky top-6 space-y-6">
					<!-- Event Details Grid -->
					<div class="space-y-4">
						<!-- Date -->
						<div class="flex items-start gap-3">
							<CalendarIcon />
							<div class="min-w-0 flex-1">
								<h3 class="text-lg font-semibold text-white">
									Дата и час на събитие
								</h3>
								<p class="text-white/80 break-words">
									{{ formatDateTime(event.date) }}
								</p>
							</div>
						</div>

						<!-- Location -->
						<div class="flex items-start gap-3">
							<LocationIcon />
							<div class="min-w-0 flex-1">
								<h3 class="text-lg font-semibold text-white">
									Място
								</h3>
								<p class="text-white/80 break-words">
									{{ event.location }}
								</p>
							</div>
						</div>

						<!-- Sign Up Deadline -->
						<div class="flex items-start gap-3">
							<ClockIcon />
							<div class="min-w-0 flex-1">
								<h3 class="text-lg font-semibold text-white">
									Краен срок на записване
								</h3>
								<p class="text-white/80 break-words">
									{{ formatDateTime(event.signUpDeadline) }}
								</p>
							</div>
						</div>

						<!-- Availability -->
						<div class="flex items-start gap-3">
							<UserIcon />
							<div class="min-w-0 flex-1">
								<h3 class="text-lg font-semibold text-white">
									Наличност
								</h3>
								<div
									class="text-white/80 break-words space-y-1">
									<p
										v-if="
											event.peopleLimit &&
											event.peopleLimit > 0
										">
										Лимит участници: {{ event.peopleLimit }}
									</p>
									<p v-else>Без лимит на участници</p>
									<p
										v-if="
											event.peopleLimit &&
											event.peopleLimit > 0 &&
											event.spotsLeft !== null &&
											event.spotsLeft !== undefined
										">
										Свободни места: {{ event.spotsLeft }}
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Event Description -->
					<div class="border-t border-white/20 pt-6">
						<h3 class="text-xl font-semibold text-yellow mb-3">
							За събитието
						</h3>
						<p
							class="text-white/90 leading-relaxed whitespace-pre-wrap break-words">
							{{ event.description }}
						</p>
					</div>
				</div>
			</div>
		</template>
		<template #right>
			<div v-if="loading">
				<LoaderComponent />
			</div>
			<div v-else-if="error" class="p-10 text-center text-red">
				Възникна грешка: {{ error }}
			</div>
			<div v-if="event" class="space-y-4">
				<!-- Admin Actions Section -->
				<div v-if="userStore.isAdmin" class="flex justify-end px-6">
					<RouterLink
						:to="{ name: 'edit-event', params: { id: event.id } }"
						class="bg-orange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium">
						Редактиране
					</RouterLink>
				</div>

				<!-- Submission Form -->
				<FormSubmit
					v-if="event?.fields"
					:event-id="event?.id"
					:fields="event.fields"
					action-name="Запиши се" />
			</div>
		</template>
	</TwoPanelLayout>
</template>
