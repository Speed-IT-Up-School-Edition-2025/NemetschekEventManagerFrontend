<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import InputField from "@/components/FormCreator/InputField.vue";
import type { FormField } from "@/utils/types.ts";

interface filledField {
	id: number;
	name: string;
	options: string[];
}

const props = defineProps<{
	actionName: string;
	fields: FormField[];
}>();

const formField = (fields: FormField[]): filledField[] => {
	return fields.map(field => {
		return {
			id: field.id,
			name: field.name,
			options: [],
		} as filledField;
	});
};
const submission = ref<filledField[]>(formField(props.fields));
defineEmits(["submit-form"]);
</script>

<template>
	<div class="p-6 bg-dark-grey shadow-lg rounded-lg max-w-4xl mx-auto my-8">
		<form class="space-y-6" @submit.prevent="$emit('submit-form', submission)">
			<h1 class="text-2xl font-semibold text-white text-center">Form Viewer</h1>
			<div
				v-for="(field, fieldIndex) in fields"
				:key="fieldIndex"
				class="bg-grey-800 p-4 rounded-lg shadow-md border-l-4 border-yellow transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-xl/30 hover:z-10">
				<div class="flex items-center justify-between mb-2 gap-4">
					<h1
						:for="`field-${field.id}`"
						class="flex text-lg font-medium text-white flex-1">
						{{ field.name }}
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
							:required="field.required"
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
			</div>

			<div class="pt-4">
				<button
					type="submit"
					class="py-3 px-8 shadow-md text-base font-medium rounded-full text-gray-900 bg-yellow hover:bg-yellow-900 transition duration-150 ease-in-out">
					{{ actionName }}
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
