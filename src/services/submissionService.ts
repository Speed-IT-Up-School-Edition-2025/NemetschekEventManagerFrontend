import { apiClient } from "@/utils/api";
import type { FilledField, GetSubmissionDto } from "@/utils/types.ts";

export async function createSubmission(eventId: string, submission: FilledField[]) {
	return apiClient.post(`/submissions/${eventId}`, { submissions: submission });
}

export async function getSubmissions(eventId: string) {
	return apiClient.get<GetSubmissionDto[]>(`/submissions/${eventId}`);
}
