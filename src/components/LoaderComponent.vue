<template>
	<div class="loader-container">
		<div class="custom-loader"></div>
	</div>
</template>

<script lang="ts" setup>
// No logic needed
</script>

<style scoped>
.loader-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none; /* optional: makes clicks pass through */
	background: transparent; /* no background */
	z-index: 9999; /* keep it above other content if needed */
}

.custom-loader {
	width: 50px;
	height: 50px;
	display: grid;
}

.custom-loader::before,
.custom-loader::after {
	content: "";
	grid-area: 1/1;
	--c: radial-gradient(farthest-side, #fbc02d 92%, #0000); /* yellow */
	background:
		var(--c) 50% 0,
		var(--c) 50% 100%,
		var(--c) 100% 50%,
		var(--c) 0 50%;
	background-size: 12px 12px;
	background-repeat: no-repeat;
	animation: s2 1s infinite;
}

.custom-loader::before {
	margin: 4px;
	filter: hue-rotate(15deg); /* subtle shift toward orange */
	background-size: 8px 8px;
	animation-timing-function: linear;
	--c: radial-gradient(farthest-side, #f57c00 92%, #0000); /* orange */
}

@keyframes s2 {
	100% {
		transform: rotate(0.5turn);
	}
}
</style>
