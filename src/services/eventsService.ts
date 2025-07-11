import { apiClient } from "@/utils/api";
import type {
	CreateEventDto,
	CreateEventResponse,
	Event,
	UpdateEventDto,
} from "@/utils/types";

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

export function updateEvent(id: string, dto: UpdateEventDto) {
	return apiClient.put<Event>(`/events/${id}`, dto);
}

export function deleteEvent(id: string) {
	return apiClient.delete(`/events/${id}`);
}
