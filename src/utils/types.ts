export interface FormField {
	id: number;
	type: "checkbox" | "text" | "radio";
	name: string;
	required: boolean;
	options: string[];
}

export interface Event {
	id: string;
	name: string;
	description: string;
	date: string;
	signUpDeadline: string;
	location: string;
	fields: FormField[];
}

export interface CreateEventDto {
	name: string;
	description: string;
	date: string;
	signUpDeadline?: string;
	location: string;
	fields: FormField[];
}

export interface CreateEventResponse {
	id: string;
}
