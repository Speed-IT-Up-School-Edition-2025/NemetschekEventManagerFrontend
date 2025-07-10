<script setup lang="ts">
import type { CreateEventDto } from "@/utils/types";
import { ref, toRaw } from "vue";

const props = withDefaults(
	defineProps<{
		event?: Omit<CreateEventDto, "fields">;
	}>(),
	{
		event: () => ({
			name: "",
			date: "",
			location: "",
			signUpDeadline: "",
			description: "",
		}),
	}
);

defineExpose({
	getState: () => {
		const rawData = toRaw(formData.value);

		return {
			...rawData,
			signUpDeadline: rawData.signUpDeadline || undefined,
		};
	},
});

const formData = ref<Omit<CreateEventDto, "fields">>({
	...props.event,
});
</script>

<template>
	<div
		class="sticky top-6 p-6 bg-dark-grey shadow-lg rounded-lg max-w-4xl mx-auto space-y-6">
		<div class="flex flex-col gap-4">
			<h2 class="text-white text-2xl font-semibold text-center mb-3">
				Информация за събитието
			</h2>

			<div>
				<label class="text-white mb-1" for="name">
					Име <span class="text-red-500">*</span>
				</label>
				<input
					id="name"
					v-model="formData.name"
					required
					class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
			</div>

			<div>
				<label class="text-white mb-1" for="date">
					Дата <span class="text-red-500">*</span>
				</label>
				<input
					id="date"
					type="datetime-local"
					:min="new Date().toISOString().slice(0, 16)"
					v-model="formData.date"
					required
					class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
			</div>

			<div>
				<label class="text-white mb-1" for="location">
					Местоположение <span class="text-red-500">*</span>
				</label>
				<input
					id="location"
					v-model="formData.location"
					required
					class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
			</div>

			<div>
				<label class="text-white mb-1" for="signUpDeadline">
					Краен срок за записване
				</label>
				<input
					id="signUpDeadline"
					type="datetime-local"
					:min="new Date().toISOString().slice(0, 16)"
					:max="formData.date"
					v-model="formData.signUpDeadline"
					class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
			</div>

			<div>
				<label class="text-white mb-1" for="description">
					Описание <span class="text-red-500">*</span>
				</label>
				<textarea
					id="description"
					v-model="formData.description"
					required
					class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2"
					rows="2"></textarea>
			</div>
		</div>
	</div>
</template>
