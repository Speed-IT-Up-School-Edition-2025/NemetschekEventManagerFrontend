const baseUrl = "http://localhost:8080";

import { useUserStore } from "@/stores/userStore";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const request = async <TResponse, TBody = unknown>(
	method: HttpMethod,
	endpoint: string,
	body?: TBody,
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

	const fullUrl = `${baseUrl}${endpoint}`;

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
			return request<TResponse, TBody>(method, endpoint, body, false);
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
	get: <TResponse>(url: string) => request<TResponse>("GET", url),
	post: <TResponse, TBody = unknown>(url: string, body?: TBody) =>
		request<TResponse, TBody>("POST", url, body),
	put: <TResponse, TBody = unknown>(url: string, body?: TBody) =>
		request<TResponse, TBody>("PUT", url, body),
	delete: <TResponse, TBody = unknown>(url: string, body?: TBody) =>
		request<TResponse, TBody>("DELETE", url, body),
};
