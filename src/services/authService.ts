import { apiClient } from "../utils/api";
export const authApi = {
	login: (email: string, password: string) =>
		apiClient.post<{ accessToken: string }>("/auth/login", { email, password }),
	register: (email: string, password: string) =>
		apiClient.post<{ accessToken: string }>("/auth/register", { email, password }),
};
