<template>
	<div
		class="h-screen flex items-center justify-center bg-grey overflow-hidden">
		<form
			@submit.prevent="handleLogin"
			class="bg-dark-grey p-8 rounded-lg shadow-md w-full max-w-sm">
			<h2 class="text-yellow text-2xl font-semibold text-center mb-6">
				Login
			</h2>

			<div class="flex flex-col gap-6">
				<div>
					<label for="email" class="block text-white mb-1"
						>Email</label
					>
					<input
						id="email"
						type="email"
						v-model="email"
						required
						class="w-full px-3 py-2 border rounded focus:outline-none focus:border-white text-yellow bg-grey" />
				</div>

				<div>
					<label for="password" class="block text-white mb-1"
						>Password</label
					>
					<input
						id="password"
						type="password"
						v-model="password"
						required
						class="w-full px-3 py-2 border rounded focus:outline-none focus:border-white text-yellow bg-grey" />
					<a
						href="#"
						class="text-yellow hover:underline text-sm float-right mt-1"
						>Forgot your password?</a
					>
				</div>

				<button
					type="submit"
					class="w-full bg-yellow text-dark-grey py-2 rounded hover:opacity-90 transition-colors font-medium">
					Sign In
				</button>
			</div>

			<div class="mt-6 text-center text-sm text-white">
				Don't have an account?
				<a href="#" class="text-yellow hover:underline">Register</a>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

function handleLogin() {
	console.log("Logging in with", email.value, password.value);
}
</script>
