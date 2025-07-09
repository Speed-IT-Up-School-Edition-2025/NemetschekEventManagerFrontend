<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: "Сигурен ли си?",
	},
	message: {
		type: String,
		required: true,
	},
	confirmText: {
		type: String,
		default: "Потвърди",
	},
	cancelText: {
		type: String,
		default: "Откажи",
	},
});
const emit = defineEmits(["confirm", "cancel"]);
</script>
<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-gray-800 rounded-lg p-6 max-w-md w-full">
			<h3 class="text-lg font-medium text-white mb-2">{{ title }}</h3>
			<p class="text-gray-300 mb-6">{{ message }}</p>
			<div class="flex justify-end gap-3">
				<button
					@click="emit('cancel')"
					class="px-4 py-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
					{{ cancelText }}
				</button>
				<button
					@click="emit('confirm')"
					class="cursor-pointer px-4 py-2 bg-yellow text-white rounded hover:bg-yellow-600 transition-colors">
					{{ confirmText }}
				</button>
			</div>
		</div>
	</div>
</template>
