<script setup lang="ts">
import type { CreateEventDto } from "@/utils/types";
import { reactive, toRaw } from "vue";

const emit = defineEmits<{
	(e: "submit", formData: Omit<CreateEventDto, "fields">): void;
}>();

const props = withDefaults(
	defineProps<{
		formRef: string;
		event: Omit<CreateEventDto, "fields">;
	}>(),
	{
		event: () => ({
			name: "",
			date: new Date().toISOString(),
			location: "",
			signUpDeadline: new Date().toISOString(),
			description: "",
		}),
	}
);

const formData = reactive<Omit<CreateEventDto, "fields">>({
	name: props.event.name,
	date: props.event.date,
	location: props.event.location,
	signUpDeadline: props.event.signUpDeadline,
	description: props.event.description,
});
</script>

<template>
	<div
		class="sticky top-6 p-6 bg-dark-grey shadow-lg rounded-lg max-w-4xl mx-auto">
		<form
			:ref="formRef"
			@submit.prevent="emit('submit', toRaw(formData))"
			class="space-y-6">
			<div class="flex flex-col gap-4">
				<h2 class="text-yellow text-2xl font-semibold text-center mb-6">
					Информация за събитието
				</h2>

				<div>
					<label class="text-white mb-1" for="name">Име</label>
					<input
						id="name"
						v-model="formData.name"
						required
						class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
				</div>

				<div>
					<label class="text-white mb-1" for="date">Дата</label>
					<input
						id="date"
						type="date"
						:min="new Date().toISOString().split('T')[0]"
						v-model="formData.date"
						required
						class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
				</div>

				<div>
					<label class="text-white mb-1" for="location"
						>Местоположение</label
					>
					<input
						id="location"
						v-model="formData.location"
						required
						class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
				</div>

				<div>
					<label class="text-white mb-1" for="signUpDeadline"
						>Краен срок за записване</label
					>
					<input
						id="signUpDeadline"
						type="date"
						:min="new Date().toISOString().split('T')[0]"
						:max="formData.date"
						v-model="formData.signUpDeadline"
						required
						class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2" />
				</div>

				<div>
					<label class="text-white mb-1" for="description"
						>Описание</label
					>
					<textarea
						id="description"
						v-model="formData.description"
						required
						class="w-full bg-grey-400 text-white rounded-t-lg not-focus:rounded-b-lg border-b border-grey-400 placeholder-grey-200 focus:border-yellow focus:border-b-2 focus:ring-0 focus:outline-none transition-colors duration-300 ease-in-out overflow-hidden leading-tight px-3 py-2"
						rows="4"></textarea>
				</div>
			</div>
		</form>
	</div>
</template>
