import type { Event, CreateEventDto } from "@/utils/types";
import { defineStore } from "pinia";

interface CurrentEventState {
	currentEvent: Event | null;
}

export const useCurrentEventStore = defineStore("currentEvent", {
	state: (): CurrentEventState => ({
		currentEvent: null as Event | null,
	}),
	actions: {
		setCurrentEvent(event: Event | null) {
			this.currentEvent = event;
		},
		setEventForDuplication(
			event: Omit<CreateEventDto, "fields"> & { fields: Event["fields"] }
		) {
			// Create a partial event object suitable for duplication
			this.currentEvent = {
				id: "", // Empty ID for new event
				spotsLeft: 0, // Will be calculated by backend
				...event,
				date: event.date || "",
				signUpDeadline: event.signUpDeadline || "",
			} as Event;
		},
		clearCurrentEvent() {
			this.currentEvent = null;
		},
	},
});
