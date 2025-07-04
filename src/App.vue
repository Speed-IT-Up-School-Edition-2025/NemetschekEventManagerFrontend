<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Toaster from "./components/Toaster.vue";
</script>

<template>
	<Toaster />
	<header>
		<NavBar />
	</header>

	<main>
		<RouterView />
	</main>
</template>
