const baseUrl = "http://localhost:8080";

import { useUserStore } from "@/stores/userStore";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const request = async <TResponse>(
	method: HttpMethod,
	url: string,
	body?: any,
	firstTry = true
): Promise<TResponse> => {
	const authStore = useUserStore();

	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	const token = authStore.accessToken;
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	const fullUrl = baseUrl + url;

	const fetchOptions: RequestInit = {
		method,
		headers,
	};

	if (body && method !== "GET") {
		fetchOptions.body = JSON.stringify(body);
	}

	const res = await fetch(fullUrl, fetchOptions);

	if (res.status == 401 && firstTry) {
		const success = authStore.refreshAccessToken();
		if (!success) {
			throw new Error("Unauthorized: Unable to refresh token.");
		} else {
			return request<TResponse>(method, url, body, false);
		}
	}

	if (!res.ok) {
		const errText = await res.json();
		throw new Error(`Request failed: ${res.status} - ${errText}`);
	}

	const contentType = res.headers.get("Content-Type");
	if (contentType?.includes("application/json")) {
		return res.json() as Promise<TResponse>;
	}

	//! probably not a real case
	return res.text() as unknown as TResponse;
};

export const apiClient = {
	get: <T>(url: string) => request<T>("GET", url),
	post: <T>(url: string, body?: any) => request<T>("POST", url, body),
	put: <T>(url: string, body?: any) => request<T>("PUT", url, body),
	delete: <T>(url: string) => request<T>("DELETE", url),
};
