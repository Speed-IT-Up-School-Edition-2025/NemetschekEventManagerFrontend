import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { useUserStore } from "@/stores/userStore";
import App from "./App.vue";
import router from "./router";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

const userStore = useUserStore();

console.log(
	"App initialization - checking refresh token:",
	userStore.refreshToken
);

if (userStore.refreshToken) {
	console.log("Refreshing access token...");
	const refreshSuccess = await userStore.refreshAccessToken();
	console.log(
		"Refresh token result:",
		refreshSuccess,
		"Access token:",
		!!userStore.accessToken
	);

	if (userStore.accessToken) {
		console.log("Fetching user profile...");
		await userStore.fetchUser();
		console.log("User profile after fetch:", userStore.profile);
	}
} else {
	console.log("No refresh token found, skipping authentication");
}

app.mount("#app");
