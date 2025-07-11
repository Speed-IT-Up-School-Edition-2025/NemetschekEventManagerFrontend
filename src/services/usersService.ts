import { apiClient } from "@/utils/api";
import type { User } from "@/utils/types";

export function getUsers() {
	return apiClient.get<User[]>("/users/info");
}

export function getMe() {
	return apiClient.get<User>("/users/me");
}
