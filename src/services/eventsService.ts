import { apiClient } from "@/utils/api";
import type { CreateEventDto, CreateEventResponse, Event } from "@/utils/types";

const events: Event[] = [
	{
		id: "1",
		name: "Tech Conference 2022",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
		fields: [],
	},
	{
		id: "2",
		name: "Tech Conference 2021",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
		fields: [],
	},
	{
		id: "3",
		name: "Tech Conference 2023",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
		fields: [],
	},
	{
		id: "4",
		name: "Tech Conference 2023",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
		fields: [],
	},
	{
		id: "5",
		date: "2025-07-17",
		description: "ewtrwthwrbrw\nb\nb\nrwb\nwb\nw\nbs\n",
		signUpDeadline: "2025-07-10",
		location: "sdfweht",
		name: "adsdgf",
		fields: [
			{
				id: 1,
				name: "Gender",
				options: ["True", "False"],
				required: true,
				type: "radio",
			},
			{
				id: 2,
				name: "Age",
				options: ["18-25", "26-35", "36-45", "46+"],
				required: true,
				type: "checkbox",
			},
			{
				id: 3,
				name: "Feedback",
				options: [],
				required: false,
				type: "text",
			},
		],
	},
];

export function createEvent(dto: CreateEventDto) {
	return apiClient.post<CreateEventResponse>("/events", dto);
}

export function getEvents() {
	return apiClient.get<Event[]>("/events");
}

export function getJoinedEvents() {
	return events.filter(event => event.id !== "1");
}

export function getEventById(id: string) {
	return apiClient.get<Event>(`/events/${id}`);
}

