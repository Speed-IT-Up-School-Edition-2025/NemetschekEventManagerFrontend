import './assets/main.css';
<template>
  <div class="min-h-screen flex items-center justify-center bg-grey">
    <form @submit.prevent="handleLogin"
          class="bg-dark-grey p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="block text-yellow transition-colors text-2xl font-semibold text-center mb-6">Login</h2>
      <div class="flex flex-col items-center gap-8">
        <div class="w-full">
          <label class="block text-white transition-colors mb-1" for="email">Email</label>
          <input id="email" type="email" v-model="email" required
                 class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-white text-yellow" />
        </div>
        <div class="w-full">
          <label class="block text-white mb-1" for="password">Password</label>
          <input id="password" type="password" v-model="password" required
                 class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-white text-yellow" />
                 <a href="#" class="text-yellow hover:underline justify-right">Forgot your password?</a>
        </div>
        <button type="submit"
                class="w-full bg-yellow text-white py-2 rounded hover:bg-yellow">
          Sign In
        </button>
      </div>
      <div class="mt-4 text-center text-sm flex justify-center">
        <label class="block text-white transition-colors mb-1" for="email">Don't have an account? &nbsp;</label>
        <a href="#" class="text-yellow hover:underline">Register</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function handleLogin() {
  // Add your login logic here
  console.log('Logging in with', email.value, password.value);
}
</script>
