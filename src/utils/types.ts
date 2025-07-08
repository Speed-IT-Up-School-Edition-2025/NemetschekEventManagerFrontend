export interface FormField {
	id: number;
	type: "checkbox" | "text" | "radio";
	name: string;
	required: boolean;
	options: string[];
}
