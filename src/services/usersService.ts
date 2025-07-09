export interface User {
	id: string;
	email: string;
	isAdmin: boolean;
}

const users: User[] = [
	{ id: "1", email: "john.doe@example.com", isAdmin: true },
	{ id: "2", email: "jane.smith@example.com", isAdmin: false },
	{ id: "3", email: "bob.johnson@example.com", isAdmin: false },
	{ id: "4", email: "alice.williams@example.com", isAdmin: true },
	{ id: "5", email: "david.brown@example.com", isAdmin: false },
];

export function getUsers() {
	return users;
}
