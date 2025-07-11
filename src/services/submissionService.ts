import type { FilledField } from "@/utils/types.ts";

export async function createSubmission(eventId: string, submission: FilledField[]) {
	console.log(eventId, submission);
}
