<template>
	<div class="flex items-end space-x-4 pt-4">
		<div class="relative flex-grow">
			<label for="new-field-select" class="absolute text-grey-200 text-xs left-3 top-1 z-10"
				>Field Type</label
			>
			<div class="relative">
				<select
					id="new-field-select"
					v-model="newFieldType"
					class="block appearance-none w-full bg-grey-400 border-b-2 border-grey-200 text-white pt-5 pb-2 px-3 rounded-t-lg focus:outline-none focus:ring-0 focus:border-yellow">
					<option value="text">Text</option>
					<option value="radio">Radio</option>
					<option value="checkbox">Checkbox</option>
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
					<svg
						class="fill-current h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20">
						<path
							d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
		</div>
		<button
			@click.prevent="$emit('add-field', newFieldType)"
			class="flex-shrink-0 px-6 py-2.5 bg-yellow text-grey-900 font-medium rounded-full shadow-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-dark-grey transition-colors duration-150 ease-in-out">
			Add Field
		</button>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const newFieldType = ref<"text" | "checkbox" | "radio">("text");
</script>
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
