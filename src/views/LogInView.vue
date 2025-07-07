<template>
	<div class="min-h-screen flex items-center justify-center bg-grey">
		<form
			@submit.prevent="handleSubmit"
			class="bg-dark-grey p-8 rounded-lg shadow-md w-full max-w-sm">
			<h2 class="text-yellow text-2xl font-semibold text-center mb-6">
				{{ isLogin ? "Вписване" : "Регистрация" }}
			</h2>
			<div class="flex flex-col gap-4">
				<div>
					<label class="text-white mb-1" for="email">Имейл</label>
					<input
						id="email"
						type="email"
						v-model="form.email"
						required
						class="w-full px-3 py-2 border rounded focus:outline-none focus:border-white text-yellow" />
				</div>

				<div>
					<label class="text-white mb-1" for="password"> Парола </label>
					<input
						id="password"
						type="password"
						v-model="form.password"
						required
						class="w-full px-3 py-2 border rounded focus:outline-none focus:border-white text-yellow" />
				</div>
				<div v-if="!isLogin">
					<label class="text-white mb-1" for="confirmPassword"> Потвърди парола </label>
					<input
						id="confirmPassword"
						type="password"
						v-model="form.confirmPassword"
						required
						class="w-full px-3 py-2 border rounded focus:outline-none focus:border-white text-yellow" />
				</div>
			</div>
			<button
				type="submit"
				class="mt-6 w-full bg-yellow text-dark-grey py-2 rounded hover:bg-yellow-dark cursor-pointer">
				{{ isLogin ? "Впиши се" : "Регистрирай се" }}
			</button>
			<div class="mt-4 text-center text-sm">
				<span class="text-white">
					{{ isLogin ? "Нямаш акаунт?" : "Имаш акаунт?" }}
				</span>
				<button
					type="button"
					@click="toggleMode"
					class="text-yellow hover:underline ml-2 cursor-pointer">
					{{ isLogin ? "Регистрирай се" : "Впиши се" }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const isLogin = ref(true);
const form = reactive({
	email: "",
	password: "",
	confirmPassword: "",
});
const router = useRouter();
function toggleMode() {
	isLogin.value = !isLogin.value;
	form.confirmPassword = ""; // Reset confirm password field when toggling
}
function handleSubmit() {
	if (!isLogin.value && form.password !== form.confirmPassword) {
		alert("Паролите не съвпадат!");
		return;
	}
	console.log(`${isLogin.value ? "Logging in" : "Registering"} with`, form);
	router.push("/home"); // Change to your app's route
}
</script>
