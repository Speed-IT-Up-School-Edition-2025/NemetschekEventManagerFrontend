import { apiClient } from "@/utils/api";
import type { CreateEventDto, CreateEventResponse, Event } from "@/utils/types";

export function createEvent(dto: CreateEventDto) {
	return apiClient.post<CreateEventResponse>("/events", dto);
}

export function getEvents() {
	return apiClient.get<Event[]>("/events");
}

export function getJoinedEvents() {
	return apiClient.get<Event[]>("/events/joined");
}

export function getEventById(id: string) {
	return apiClient.get<Event>(`/events/${id}`);
}
