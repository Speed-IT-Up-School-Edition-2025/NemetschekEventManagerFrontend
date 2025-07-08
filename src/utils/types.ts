export interface FormField {
	id: string;
	option: "checkbox" | "text" | "radio";
	name: string;
	required: boolean;
	options: string[];
}
