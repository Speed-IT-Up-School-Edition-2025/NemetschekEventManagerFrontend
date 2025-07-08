<template>
	<CreateForm action-name="CreateForm" :fields="fields" @submit-form="console.log" />
</template>
<script setup lang="ts">
import CreateForm from "@/components/FormCreator/CreateForm.vue";
import type { FormField } from "@/utils/types.ts";

const fields: FormField[] = [
	{
		name: "fddfs",
		required: true,
		option: "text",
		id: "dfdfsdfs",
		options: [],
	},
];
</script>
