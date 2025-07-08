<script setup lang="ts">
import { ref } from "vue";
import InputField from "@/components/FormCreator/InputField.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import FieldAdder from "@/components/FormCreator/FieldAdder.vue";

interface FormField {
	id: string;
	option: "checkbox" | "text" | "radio";
	name: string;
	required: boolean;
	options: string[];
}

const fields = ref<FormField[]>([
	{
		id: "name",
		option: "text",
		name: "ljgl",
		required: true,
		options: [],
	},
	{
		id: "random",
		option: "radio",
		name: "random",
		required: true,
		options: ["random", "random2", "random3"],
	},
	{
		id: "hilary",
		option: "checkbox",
		name: "hilary",
		required: true,
		options: ["hilary", "hilary2", "hilary3"],
	},
]);

const handleSubmit = () => {
	console.log(fields.value);
	alert("Form submitted!");
};
const addField = (fieldType: "text" | "checkbox" | "radio") => {
	const newField: FormField = {
		id: `${fieldType}-${Date.now()}`,
		option: fieldType,
		name: "new field",
		required: false,
		options: [],
	};

	if (fieldType === "checkbox" || fieldType === "radio") {
		newField.options.push("Option 1");
	}

	fields.value.push(newField);
};
</script>

<template>
	<div class="p-6 bg-dark-grey shadow-lg rounded-lg max-w-4xl mx-auto my-8">
		<form @submit.prevent="handleSubmit" class="space-y-6">
			<h1 class="text-2xl font-semibold text-white text-center">Form Creator</h1>
			<div
				v-for="(field, index) in fields"
				:key="field.id"
				class="bg-grey-800 p-4 rounded-lg shadow-md border-l-4 border-yellow transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-xl/30 hover:z-10">
				<div class="flex items-center justify-between mb-2 gap-4">
					<label :for="field.id" class="flex text-lg font-medium text-white flex-1">
						<InputField class="flex-1" :id="field.id" v-model="field.name"></InputField>
					</label>
					<label
						:for="`${field.id}-required`"
						class="relative inline-flex items-center cursor-pointer">
						<input
							v-model="field.required"
							:id="`${field.id}-required`"
							type="checkbox"
							class="sr-only peer" />
						<div
							class="w-11 h-6 bg-grey-400 rounded-full peer peer-focus:ring-3 peer-focus:ring-yellow peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
						<span class="ml-3 text-sm font-medium text-white-900">Required</span>
					</label>
					<button
						class="border border-red text-red hover:bg-red hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-1.5 text-center transition-colors"
						@click="fields.splice(index, 1)">
						Remove field
					</button>
				</div>

				<div v-if="field.option === 'text'">
					<input
						type="text"
						disabled
						class="text-white mt-1 block w-full px-4 py-2 border-b border-outline bg-dark-grey rounded-t-md shadow-sm focus:border-primary focus:ring-yellow sm:text-base transition duration-150 ease-in-out"
						:placeholder="`Enter ${field.name.toLowerCase()}`" />
				</div>

				<div
					v-else-if="field.option === 'checkbox' || field.option === 'radio'"
					class="space-y-2">
					<div
						v-for="(option, index) in field.options"
						:key="`${field.id}-${index}`"
						class="flex items-center">
						<input
							:id="`${field.id}-${index}`"
							:type="field.option"
							:name="field.id"
							class="h-5 w-5 text-white border-outline focus:ring-yellow rounded-sm" />
						<label :for="`${field.id}-${index}`" class="ml-3 text-base text-white">
							<InputField
								:id="`${field.id}-${index}`"
								v-model="field.options[index]"></InputField>
						</label>
						<button
							class="ml-3 w-8 h-8 flex-shrink-0 flex items-center justify-center text-red-400 rounded-full hover:bg-red-400/20 transition-colors"
							@click.prevent="field.options.splice(index, 1)">
							<CancelIcon class="fill-red" />
						</button>
					</div>
					<button
						class="mt-2 text-yellow-400 hover:bg-yellow-400/20 text-sm font-medium rounded-md px-3 py-1.5 transition-colors"
						@click.prevent="field.options.push(`Option ${field.options.length + 1}`)">
						Add Option
					</button>
				</div>
			</div>

			<FieldAdder @add-field="arg => addField(arg)" />

			<div class="pt-4">
				<button
					@click.prevent="handleSubmit"
					class="inline-flex justify-center py-3 px-8 shadow-md text-base font-medium rounded-full text-gray-900 bg-yellow hover:bg-yellow-900 transition duration-150 ease-in-out">
					Create Form
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
