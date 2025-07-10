<script setup lang="ts">
import { ref } from "vue";
import type { GetSubmissionDto, CreateEventDto, FilledField } from "@/utils/types.ts";
import { useRoute } from "vue-router";
import { baseUrl } from "@/utils/api.ts";
import { downloadFile } from "@/services/exportsService.ts";

const event = ref<CreateEventDto>({
	name: "Event 1",
	description: "Event 1 description",
	location: "Event 1 location",
	date: "2025-07-10",
	signUpDeadline: "2025-07-10",
	fields: [
		{
			id: 1,
			type: "text",
			name: "Full Name",
			required: true,
			options: [],
		},
		{
			id: 2,
			type: "radio",
			name: "Age Group",
			required: true,
			options: ["18-24", "25-34", "35-44", "45+"],
		},
		{
			id: 3,
			type: "checkbox",
			name: "Interests",
			required: false,
			options: ["Reading", "Sports", "Programming", "Music", "Travel"],
		},
		{
			id: 4,
			type: "text",
			name: "Email",
			required: true,
			options: [],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 5,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
		{
			id: 60,
			type: "radio",
			name: "Are you gay",
			required: false,
			options: ["Yes", "No"],
		},
	],
});
const data = ref<GetSubmissionDto[]>([
	{
		submissions: [
			{ id: 1, name: "Full Name", options: ["John Doe"] },
			{ id: 2, name: "Age Group", options: ["25-34"] },
			{
				id: 3,
				name: "Interests",
				options: ["Reading", "Sports", "Programming", "Music", "Travel"],
			},
		],
		date: "2025-07-10",
		userId: "user123",
	},
	{
		submissions: [
			{ id: 1, name: "Full Name", options: ["Jane Smith"] },
			{ id: 2, name: "Age Group", options: ["18-24"] },
			{ id: 3, name: "Interests", options: ["Programming"] },
		],
		date: "2025-07-09",
		userId: "user456",
	},
	{
		submissions: [
			{ id: 1, name: "Full Name", options: ["Janette Smith"] },
			{ id: 2, name: "Age Group", options: ["18-24"] },
			{ id: 60, name: "sdds", options: ["Yes"] },
		],
		date: "2025-07-10",
		userId: "user789",
	},
]);

const getSubmissionField = (submission: FilledField[], fieldId: number): string => {
	return submission.find(s => s.id === fieldId)?.options.join(", ") || "-";
};

const route = useRoute();
const eventId = ref(route.params.id);

const exportToCSV = () => {
	downloadFile("/csv/" + eventId.value, "submissions.csv", "text/csv;charset=utf-8,");
};

const exportToXLSX = () => {
	console.log(baseUrl + "/xlsx/" + eventId.value);
	downloadFile("/xlsx/" + eventId.value, "submissions.xlsx", "xlsx");
};
</script>

<template>
	<div class="m-6">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold text-yellow">Event Submissions</h1>
			<div class="space-x-4">
				<button
					@click="exportToCSV"
					class="px-4 py-2 bg-cyan hover:bg-cyan-800 text-white rounded transition-colors">
					Export to CSV
				</button>
				<button
					@click="exportToXLSX"
					class="px-4 py-2 bg-cyan hover:bg-cyan-800 text-white rounded transition-colors">
					Export to XLSX
				</button>
			</div>
		</div>
		<table class="min-w-4 divide-y divide-gray-200 overflow-auto">
			<thead class="bg-gray-800">
				<tr>
					<th
						v-for="field in event.fields"
						:key="field.id"
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-yellow tracking-wider max-h-16"
						:data-tooltip="field.name">
						<div class="truncate max-w-[200px] uppercase">
							{{ field.name }}
						</div>
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-yellow uppercase tracking-wider"
						data-tooltip="Submission Date">
						Submission Date
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-yellow uppercase tracking-wider"
						data-tooltip="User ID">
						User ID
					</th>
				</tr>
			</thead>
			<tbody class="bg-gray-700 divide-y divide-gray-600">
				<tr v-if="data.length === 0">
					<td :colspan="event.fields.length + 2" class="text-center text-white py-4">
						No submissions found.
					</td>
				</tr>
				<tr v-for="submission in data" :key="submission.userId" class="transition-colors">
					<td
						v-for="field in event.fields"
						:key="field.id"
						class="px-6 py-4 whitespace-nowrap text-white"
						:data-tooltip="getSubmissionField(submission.submissions, field.id)">
						<div class="truncate max-w-[200px]">
							{{ getSubmissionField(submission.submissions, field.id) }}
						</div>
					</td>
					<td
						class="px-6 py-4 whitespace-nowrap text-white"
						:data-tooltip="submission.date">
						<div class="truncate max-w-[200px]">
							{{ submission.date }}
						</div>
					</td>
					<td
						class="px-6 py-4 whitespace-nowrap text-white"
						:data-tooltip="submission.userId">
						<div class="truncate max-w-[200px]">
							{{ submission.userId }}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
[data-tooltip] {
	position: relative;
}

[data-tooltip]:hover::after {
	content: attr(data-tooltip);
	position: absolute;
	top: 100%;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 0.5rem 0.75rem;
	border-radius: 0.25rem;
	font-size: 0.875rem;
	white-space: normal;
	max-width: 300px;
	z-index: 1000;
	word-break: break-word;
	opacity: 1;
	transition: opacity 300ms ease-in-out;
}
</style>
