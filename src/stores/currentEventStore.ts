import type { Event } from "@/utils/types";
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
		clearCurrentEvent() {
			this.currentEvent = null;
		},
	},
});
