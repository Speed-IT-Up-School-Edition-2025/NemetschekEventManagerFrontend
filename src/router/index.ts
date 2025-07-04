import { createRouter, createWebHistory } from "vue-router";
import EventsView from "@/views/EventsView.vue"; // Keep this eagerly loaded if it's the main view

const CreateEvent = () => import("@/views/CreateEventView.vue");
const JoinedEventsView = () => import("@/views/JoinedEventsView.vue");
const NotFound = () => import("@/views/NotFoundView.vue");
const LogIn = () => import("@/views/LogIn.vue");
const AdminRequiredView = () => import("@/views/AdminRequiredView.vue");
const UsersView = () => import("@/views/UsersView.vue");

import { useUserStore } from "@/stores/userStore";

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
					meta: { requiredAdmin: true },
				},
			],
		},
		{
			path: "/users",
			name: "users",
			component: UsersView,
			meta: { requiresAuth: true, requiredAdmin: true },
		},
		{
			path: "/login",
			name: "login",
			component: LogIn,
			meta: { requiresGuest: true },
		},
		{
			path: "/admin-required",
			name: "admin-required",
			component: AdminRequiredView,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound,
		},
	],
});

router.beforeEach((to, _, next) => {
	const userStore = useUserStore();

	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
	const requiresAdmin = to.matched.some(record => record.meta.requiredAdmin);

	if (requiresAuth && !userStore.isAuthenticated) {
		return next("/login");
	} else if (requiresGuest && userStore.isAuthenticated) {
		return next("/events");
	}

	if (requiresAdmin && !userStore.isAdmin) {
		return next("/admin-required");
	}

	next();
});

export default router;
