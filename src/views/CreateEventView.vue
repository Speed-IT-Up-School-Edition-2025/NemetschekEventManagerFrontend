<script setup lang="ts">
import EventInformationFormComponent from "@/components/EventInformationFormComponent.vue";
import CreateForm from "@/components/FormCreator/CreateForm.vue";
import FourPanelLayout from "@/components/FourPanelLayout.vue";
import type { CreateEventDto, FormField } from "@/utils/types.ts";

const fields: FormField[] = [
	{
		name: "fddfs",
		required: true,
		type: "text",
		id: 0,
		options: [],
	},
];

const eventInformationSubmitHandler = (
	formData: Omit<CreateEventDto, "fields">
) => {
	console.log(formData);
};
</script>

<template>
	<FourPanelLayout>
		<template #top>
			<h1 class="text-yellow text-3xl font-semibold text-center my-6">
				Създаване на ново събитие
			</h1>
		</template>
		<template #left>
			<EventInformationFormComponent
				@submit="eventInformationSubmitHandler"
				form-ref="eventInformationForm"
				:event="{
					name: '',
					date: '',
					location: '',
					signUpDeadline: '',
					description: '',
				}" />
		</template>
		<template #right>
			<CreateForm
				action-name="CreateForm"
				:fields="fields"
				@submit-form="console.log" />
		</template>
	</FourPanelLayout>
</template>
