const baseUrl = "http:/localhost:8080";

import { useUserStore } from "@/stores/authStore";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const request = async <TResponse>(
	method: HttpMethod,
	url: string,
	body?: any
): Promise<TResponse> => {
	const authStore = useUserStore();

	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	const token = authStore.accessToken;
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	let fullUrl = baseUrl + url;

	const fetchOptions: RequestInit = {
		method,
		headers,
	};

	if (body && method !== "GET") {
		fetchOptions.body = JSON.stringify(body);
	}

	const res = await fetch(fullUrl, fetchOptions);

	const contentType = res.headers.get("Content-Type");
	if (contentType?.includes("application/json")) {
		return res.json() as Promise<TResponse>;
	}

	if (!res.ok) {
		const errText = await res.json();
		throw new Error(`Request failed: ${res.status} - ${errText}`);
	}

	return res.text() as unknown as TResponse;
};

export const apiClient = {
	get: <T>(url: string) => request<T>("GET", url),
	post: <T>(url: string, body?: any) => request<T>("POST", url, body),
	put: <T>(url: string, body?: any) => request<T>("PUT", url, body),
	delete: <T>(url: string) => request<T>("DELETE", url),
};
