import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
	state: () => ({
		accessToken: null as string | null,
		profile: null,
	}),
	getters: {
		isAuthenticated: state => !!state.accessToken,
	},
	actions: {
		setAccessToken(token: string) {
			this.accessToken = token;
		},
		logout() {
			this.accessToken = null;
			this.profile = null;
		},
		fetchUserProfile() {},
	},
});
