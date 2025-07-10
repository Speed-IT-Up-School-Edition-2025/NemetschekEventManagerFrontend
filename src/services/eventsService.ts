import type { Event } from "@/utils/types";

const events: Event[] = [
	{
		id: "1",
		name: "Tech Conference 2022",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
	},
	{
		id: "2",
		name: "Tech Conference 2021",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
	},
	{
		id: "3",
		name: "Tech Conference 2023",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
	},
	{
		id: "4",
		name: "Tech Conference 2023",
		description:
			"A conference for tech enthusiasts to explore the latest trends in technology.",
		date: "2025-10-15",
		signUpDeadline: "2025-10-01",
		location: "San Francisco, CA",
	},
];

export function getEvents() {
	return events;
}

export function getJoinedEvents() {
	return events.filter(event => event.id !== "1");
}

export function getEventById(id: string) {
	const event = events.find(event => event.id === id);

	if (!event) {
		throw new Error(`Event with id ${id} not found`);
	}

	return event;
}

