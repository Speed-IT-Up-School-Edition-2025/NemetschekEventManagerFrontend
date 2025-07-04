import { createRouter, createWebHistory } from "vue-router";

import CreateEvent from "@/views/CreateEventView.vue";
import EventsView from "@/views/EventsView.vue";
import JoinedEventsView from "@/views/JoinedEventsView.vue";
import NotFound from "@/views/NotFoundView.vue";
import LogIn from "@/views/LogIn.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/events",
		},
		{
			path: "/events",
			name: "events",
			meta: { requiresAuth: true },
			children: [
				{
					path: "",
					name: "events-list",
					component: EventsView,
				},
				{
					path: "joined",
					name: "joined-events",
					component: JoinedEventsView,
				},
				{
					path: "create",
					name: "create-event",
					component: CreateEvent,
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: LogIn,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound,
		},
	],
});

export default router;
