import { apiClient } from "@/utils/api";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
	state: () => ({
		accessToken: null as string | null,
		profile: null as UserProfile | null,
		refreshToken: localStorage.getItem("refreshToken"),
	}),
	getters: {
		isAuthenticated: state => !!state.accessToken,
		isAdmin: state => state.profile?.isAdmin ?? false,
	},
	actions: {
		async refreshAccessToken() {
			try {
				// TODO check casing
				const res = await apiClient.post<{ accessToken: string }>(
					"/auth/refresh",
					{
						refreshToken: this.refreshToken,
					}
				);
				this.setAccessToken(res.accessToken);
				return true;
			} catch (err) {
				console.error("Failed to refresh token", err);
				this.logout();
				return false;
			}
		},
		setAccessToken(token: string) {
			this.accessToken = token;
		},
		logout() {
			this.accessToken = null;
			this.profile = null;
			this.refreshToken = null;
			localStorage.removeItem("refreshToken");
		},
		async fetchUserProfile() {
			this.profile = await apiClient.get<UserProfile>("/users/me");
		},
	},
});

interface UserProfile {
	id: string;
	username: string;
	email: string;
	isAdmin: boolean;
}
