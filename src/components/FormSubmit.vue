<script setup lang="ts">
import { defineProps, ref, watch, onMounted, defineEmits } from "vue";
import InputField from "@/components/FormCreator/InputField.vue";
import type { FilledField, FormField } from "@/utils/types.ts";
import { createSubmission, updateSubmission, getSubmission } from "@/services/submissionService";
import { useUIStore } from "@/stores/uiStore";

const uiStore = useUIStore();
const props = defineProps<{
	actionName: string;
	fields: FormField[];
	eventId: number;
	userSignedUp: boolean;
	onCancel?: () => void;
}>();
const emit = defineEmits(["signed-up"]);

const formField = (fields: FormField[]): FilledField[] => {
	return fields.map(
		field =>
			({
				id: field.id,
				name: field.name,
				options: [],
			}) as FilledField
	);
};

const submission = ref<FilledField[]>(formField(props.fields));

// Fetch previous submission if user is signed up
const fetchSubmission = async () => {
	if (props.userSignedUp && props.eventId) {
		try {
			const prevSubmission = await getSubmission(props.eventId.toString());
			if (prevSubmission) {
				submission.value = prevSubmission.submissions;
			}
		} catch (error) {
			uiStore.triggerToast(
				`Грешка при зареждане на предишния формуляр: ${(error as Error).message}`,
				"error"
			);
		}
	}
};

onMounted(fetchSubmission);
watch(() => props.userSignedUp, fetchSubmission);

const submitForm = async () => {
	try {
		if (!props.eventId) {
			throw new Error("Event ID is required for submission.");
		}
		if (!props.userSignedUp) {
			await createSubmission(props.eventId, submission.value);

			emit("signed-up");
		} else {
			await updateSubmission(props.eventId, submission.value);
		}

		uiStore.triggerToast("Формулярът беше изпратен успешно!", "success");
	} catch (error: unknown) {
		let errorMessage = "Възникна грешка при изпращането на формуляра";

		// Check for error property in response data first
		if (error && typeof error === "object" && "response" in error) {
			const errorResponse = error as {
				response?: { data?: { error?: string } };
			};
			if (errorResponse.response?.data?.error) {
				errorMessage = errorResponse.response.data.error;
			}
		} else if (error instanceof Error && error.message) {
			errorMessage = `${errorMessage}: ${error.message}`;
		}

		uiStore.triggerToast(errorMessage, "error");
		console.error("Submission error:", error);
	}
};
</script>

<template>
	<div class="p-6 bg-dark-grey shadow-lg rounded-lg max-w-4xl mx-auto my-8">
		<form class="space-y-6" @submit.prevent="submitForm()">
			<h1 class="text-2xl font-semibold text-white text-center">Преглед на формуляр</h1>
			<div v-if="props.userSignedUp" class="text-green-400 text-center mb-4 text-xl">
				Вече сте записани за това събитие.
			</div>
			<div
				v-for="(field, fieldIndex) in fields"
				:key="fieldIndex"
				class="bg-grey-800 p-4 rounded-lg shadow-md border-l-4 border-yellow transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-xl/30 hover:z-10">
				<div class="justify-between mb-2">
					<h1 class="flex text-lg font-medium text-white flex-1 min-w-0 flex-row gap-2">
						<span class="flex-1 min-w-0 break-words text">{{ field.name }}</span>
						<span v-if="field.required" class="text-red-500 ml-1">*</span>
					</h1>
				</div>

				<div v-if="field.type === 'text'">
					<InputField
						:required="field.required"
						id="`field-${field.id}`"
						v-model="submission[fieldIndex].options[0]" />
				</div>
				<div
					v-else-if="field.type === 'checkbox' || field.type === 'radio'"
					class="space-y-2">
					<div
						v-for="(option, index) in field.options"
						:key="`field-${field.id}-${index}`"
						class="flex items-center">
						<input
							v-if="field.type === 'checkbox'"
							:id="`${field.id}-${index}`"
							:type="field.type"
							:name="`field-${field.id}`"
							:value="field.options[index]"
							:required="
								field.required && submission[fieldIndex].options.length === 0
							"
							v-model="submission[fieldIndex].options"
							class="h-5 w-5 text-white border-outline focus:ring-yellow rounded-sm" />
						<input
							v-else-if="field.type === 'radio'"
							:id="`${field.id}-${index}`"
							:type="field.type"
							:name="`field-${field.id}`"
							:required="field.required"
							:value="option"
							v-model="submission[fieldIndex].options[0]"
							class="h-5 w-5 text-white border-outline focus:ring-yellow rounded-sm" />
						<label :for="`${field.id}-${index}`" class="ml-3 text-base text-white">
							{{ field.options[index] }}
						</label>
					</div>
				</div>
				<button
					v-if="
						field.type === 'radio' &&
						!field.required &&
						submission[fieldIndex].options.length !== 0
					"
					class="mt-3 text-black bg-yellow hover:bg-yellow-900 text-sm font-medium rounded-md px-3 py-1.5 transition-colors cursor-pointer"
					@click.prevent="submission[fieldIndex].options = []">
					Премахни избраната опция
				</button>
			</div>

			<div class="pt-4 flex flex-wrap justify-center gap-4">
				<button
					v-if="!props.userSignedUp"
					type="submit"
					class="cursor-pointer py-3 px-8 shadow-md text-base font-medium rounded-full text-gray-900 bg-yellow hover:bg-yellow-900 transition duration-150 ease-in-out whitespace-nowrap">
					{{ userSignedUp ? "Изпрати отново" : actionName }}
				</button>
				<button
					v-else-if="props.fields && props.fields.length > 0"
					type="button"
					@click="submitForm()"
					class="cursor-pointer py-3 px-8 shadow-md text-base font-medium rounded-full text-gray-900 bg-yellow hover:bg-yellow-900 transition duration-150 ease-in-out whitespace-nowrap">
					Промени отговора
				</button>
				<button
					v-if="props.userSignedUp && props.onCancel"
					type="button"
					@click="props.onCancel"
					class="cursor-pointer py-3 px-8 shadow-md text-base font-medium rounded-full text-white bg-red hover:bg-red-800 transition duration-150 ease-in-out whitespace-nowrap">
					Отпиши се
				</button>
			</div>
		</form>
	</div>
</template>

<style>
input[type="text"]:focus,
select:focus {
	outline: none;
}

input[type="checkbox"] {
	accent-color: var(--color-yellow);
}

input[type="radio"] {
	accent-color: var(--color-yellow);
}

input:focus,
button:focus,
select:focus {
	outline: none;
	box-shadow: none;
}
</style>
