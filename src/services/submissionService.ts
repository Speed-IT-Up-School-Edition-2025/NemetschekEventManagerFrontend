import { apiClient } from "@/utils/api";
import type { FilledField } from "@/utils/types.ts";

export async function createSubmission(eventId: string, submission: FilledField[]) {
	return apiClient.post(`/submits/${eventId}`, { submissions: submission });
}
