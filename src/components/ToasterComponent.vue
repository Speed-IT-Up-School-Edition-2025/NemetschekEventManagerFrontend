<template>
	<div
		v-if="ui.showToast"
		:class="[
			'fixed bottom-4 right-4 md:right-1/3 text-white p-4 rounded shadow-lg w-64 z-10',
			toastBgClass,
		]">
		{{ ui.toastMessage }}
		<div class="mt-2 h-1 bg-white rounded-full overflow-hidden">
			<div
				:key="animationKey"
				:style="{ animationDuration: `${duration}ms` }"
				class="h-full bg-gray-300 rounded-full animate-progress"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useUIStore } from "@/stores/uiStore";

const ui = useUIStore();
const animationKey = ref(0);
const duration = 3000; // milliseconds

const toastBgClass = computed(() => {
	switch (ui.toastType) {
		case "success":
			return "bg-gradient-to-r from-green-500 to-emerald-400";
		case "error":
			return "bg-gradient-to-r from-red-500 to-pink-500";
		case "warning":
			return "bg-gradient-to-r from-yellow-500 to-orange-400 text-black";
		case "info":
		default:
			return "bg-gradient-to-r from-purple-500 to-pink-500";
	}
});

let timeoutId: ReturnType<typeof setTimeout> | null = null;

watch(
	() => ui.toastMessage,
	newVal => {
		if (newVal) {
			ui.showToast = true;
			animationKey.value++;
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				ui.showToast = false;
				ui.toastMessage = "";
				timeoutId = null;
			}, duration);
		}
	}
);
</script>

<style scoped>
@keyframes progress {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}

.animate-progress {
	animation-name: progress;
	animation-timing-function: linear;
	animation-fill-mode: forwards;
	animation-direction: normal;
	transform: translateX(-100%);
}
</style>
