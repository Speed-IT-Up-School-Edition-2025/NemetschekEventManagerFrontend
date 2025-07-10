<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { ref, watch, onMounted } from "vue";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";
import ChevronUp from "@/components/icons/ChevronUp.vue";
import FilterIcon from "./icons/FilterIcon.vue";
import SortIcon from "./icons/SortIcon.vue";
import { apiClient } from "@/utils/api";
import type { Event } from "@/utils/types";

const search = ref("");
const filtersOpen = ref(false);
const date = ref<[Date, Date] | null>(null);
const activeEvent = ref<boolean | null>(null);
const sortOpened = ref(false);
const endPoint = "http://172.16.17.21:5000";
const sort = ref<"new" | "old" | "az" | "za" | null>(null);

const events = defineModel<Event[]>("events", { required: true });
const searchedEvents = defineModel<Event[]>("searched-events", { required: true });

onMounted(() => {
	const startDate = new Date();
	const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
	date.value = [startDate, endDate];
});

const textInputOptions = {
	format: "dd.MM.yyyy",
};

async function sortBy(text: string) {
	const keywords = text
		.toLowerCase()
		.split(" ")
		.filter(word => word.trim().length > 0);
	searchedEvents.value =
		events.value.filter(currentEvent =>
			keywords.every(
				key =>
					currentEvent.name.toLowerCase().includes(key) ||
					currentEvent.description.toLowerCase().includes(key)
			)
		) ?? null;
}
watch(search, async changedValue => {
	if (changedValue) {
		await sortBy(changedValue);
	} else {
		searchedEvents.value = [];
	}
});
async function filterBy(): Promise<void> {
	const formattedStartDate = ref("");
	const formattedEndDate = ref("");
	const parameters: string[] = [];
	if (date.value?.[0] != null && date.value?.[1] != null) {
		date.value?.[0].setHours(0);
		date.value?.[0].setMinutes(0);
		date.value?.[0].setMilliseconds(0);
		formattedStartDate.value = date.value?.[0].toISOString();

		date.value?.[1].setHours(23);
		date.value?.[1].setMinutes(59);
		date.value?.[1].setMilliseconds(59);
		formattedEndDate.value = date.value?.[0].toISOString();
	}
	parameters.push(formattedStartDate.value ? "fromDate=${formattedStartDate.value}" : "");
	parameters.push(formattedEndDate.value ? "toDate=${formatedEndDate}" : "");
	parameters.push(activeEvent.value ? "activeOnly=${activeEvent}" : "");
	switch (sort.value) {
		case "az":
			parameters.push("alphabetical=true");
			break;
		case "za":
			parameters.push("alphabetical=true");
			parameters.push("sortDescending=true");
	}
	const query = parameters.join("&");
	events.value = await apiClient.get<Event[]>(endPoint + "/events?" + query);
}
</script>
<template>
	<div class="hidden md:flex justify-between items-start">
		<span class="flex items-center">
			<div class="relative inline-block text-left sm:gap-0 md:gap-2 pl-10 pt-10">
				<button
					type="button"
					@click="filtersOpen = !filtersOpen"
					class="flex justify-between px-5 items-center h-10 w-40 border rounded border-yellow-500 text-yellow transition delay-100 duration-300 hover:ease-in-out hover:border-transparent hover:text-white/100 hover:bg-yellow">
					<span>Филтрирай</span>
					<ChevronDownIcon v-if="filtersOpen" />
					<ChevronUp v-else />
				</button>
				<TransitionRoot as="template" :show="filtersOpen">
					<TransitionChild
						as="template"
						enter="transition-opacity ease-in-out duration-300 transform"
						enter-from="opacity-0 -translate-y-5"
						enter-to="opacity-100 translate-y-0"
						leave="transition-opacity ease-in duration-300 transform"
						leave-from="opacity-100 translate-y-0"
						leave-to="opacity-0 -translate-y-3">
						<div
							class="absolute mt-1 flex flex-col h-30 w-90 rounded origin-top-left border-2 border-yellow bg-dark-grey shadow-lg z-50">
							<div
								class="flex flex-row gap-5 pt-5 pl-6 pr-4 text-yellow space-y-5 rounded-md">
								<span class="text-white text-lg self-center">Период: </span>
								<DatePicker
									class="w-md"
									v-model="date"
									placeholder="Период"
									range
									:text-input="textInputOptions"
									:enable-time-picker="false"
									:inputClass="'filterCalendar'"
									position="center"
									circle
									lang="bg"
									dark />
							</div>
							<div class="flex flex-row justify-between items-center pl-6 pr-3">
								<span class="flex gap-4">
									<input
										type="checkbox"
										name="active"
										id="active"
										v-model="activeEvent"
										class="w-5 h-5" />
									<label for="active" class="text-lg self-center"
										>Активно събитие</label
									>
								</span>
								<button
									@click="filtersOpen = false && filterBy"
									class="border rounded-2xl p-1 bg-yellow text-black hover:shadow-xl transition ease-in-out duration-200 delay-100 shadow-yellow/30">
									Запази
								</button>
							</div>
						</div>
					</TransitionChild>
				</TransitionRoot>
			</div>
			<div class="relative inline-block text-left pl-5 pt-10">
				<button
					type="button"
					@click="sortOpened = !sortOpened"
					class="px-5 text-yellow transition delay-100 duration-300 hover:ease-in-out hover:border-transparent hover:text-white/100">
					<SortIcon class="w-8 h-8" />
				</button>
				<TransitionRoot as="template" :show="sortOpened">
					<TransitionChild
						as="template"
						enter="transition-opacity ease-in-out duration-200 transform"
						enter-from="opacity-0 -translate-y-5"
						enter-to="opacity-100 translate-y-0"
						leave="transition-opacity ease-in duration-200 transform"
						leave-from="opacity-100 translate-y-0"
						leave-to="opacity-0 -translate-y-3">
						<div
							class="absolute flex justify-evenly mt-3 flex-col h-30 w-40 rounded-2xl origin-top-left border-2 border-yellow bg-dark-grey shadow-lg z-50">
							<button
								class="text-white hover:text-yellow active:text-yellow"
								@click="sort = sort === 'new' ? 'new' : null">
								Най-нови
							</button>
							<button
								class="text-white hover:text-yellow active:text-yellow"
								@click="sort = sort === 'old' ? 'old' : null">
								Най-стари
							</button>
							<button
								class="text-white hover:text-yellow active:text-yellow"
								@click="sort = sort === 'az' ? 'az' : null">
								Азбучен ред: А до Я
							</button>
							<button
								class="text-white hover:text-yellow"
								@click="sort = sort === 'za' ? 'za' : null">
								Азбучен ред: Я до А
							</button>
						</div>
					</TransitionChild>
				</TransitionRoot>
			</div>
		</span>
		<div class="flex items-center gap-4 pr-10 pt-10">
			<input
				v-model="search"
				placeholder="Потърси..."
				class="flex-1 max-w-100 h-10 px-3 border rounded focus:outline-none focus:border-white text-yellow" />
			<SearchIcon class="w-10 h-10" />
		</div>
	</div>
	<div class="md:hidden">
		<div class="flex justify-between items-start">
			<div class="flex items-center">
				<div class="relative inline-block text-left pl-4 pt-10">
					<button
						type="button"
						@click="filtersOpen = !filtersOpen"
						class="flex justify-between px-5 items-center text-yellow transition delay-100 duration-300 hover:ease-in-out">
						<FilterIcon />
					</button>
					<TransitionRoot as="template" :show="filtersOpen">
						<TransitionChild
							as="template"
							enter="transition-opacity ease-in-out duration-200"
							enter-from="opacity-0 -translate-y-5"
							enter-to="opacity-100 translate-y-0"
							leave="transition-opacity ease-in duration-200"
							leave-from="opacity-100 translate-y-0"
							leave-to="opacity-0 -translate-y-3">
							<div
								class="absolute mt-1 flex flex-1 flex-col h-30 w-90 rounded origin-top-left border-2 border-yellow bg-dark-grey shadow-lg z-50">
								<div
									class="flex flex-row gap-5 pt-5 pl-6 pr-4 text-yellow space-y-5 rounded-md">
									<span class="text-white text-lg self-center">Период: </span>
									<DatePicker
										class="w-md"
										v-model="date"
										placeholder="Период"
										range
										:text-input="textInputOptions"
										:enable-time-picker="false"
										:inputClass="'filterCalendar'"
										position="center"
										circle
										lang="bg"
										dark />
								</div>
								<div class="flex flex-row justify-between items-center pl-6 pr-3">
									<span class="flex gap-4">
										<input
											type="checkbox"
											name="active"
											id="active"
											v-model="activeEvent"
											class="w-5 h-5" />
										<label for="active" class="text-lg self-center"
											>Активно събитие</label
										>
									</span>
									<button
										@click="filtersOpen = false && filterBy"
										class="border rounded-2xl p-1 bg-yellow text-black hover:shadow-xl transition ease-in-out duration-200 delay-100 shadow-yellow/30">
										Запази
									</button>
								</div>
							</div>
						</TransitionChild>
					</TransitionRoot>
				</div>
				<div class="relative inline-block text-left pt-10">
					<button
						type="button"
						@click="sortOpened = !sortOpened"
						class="px-5 text-yellow transition delay-100 duration-300 hover:ease-in-out hover:border-transparent hover:text-white/100">
						<SortIcon class="w-8 h-8" />
					</button>
					<TransitionRoot as="template" :show="sortOpened">
						<TransitionChild
							as="template"
							enter="transition-opacity ease-in-out duration-200 transform"
							enter-from="opacity-0 -translate-y-5"
							enter-to="opacity-100 translate-y-0"
							leave="transition-opacity ease-in duration-200 transform"
							leave-from="opacity-100 translate-y-0"
							leave-to="opacity-0 -translate-y-3">
							<div
								class="absolute flex justify-evenly mt-3 flex-col h-30 w-40 rounded-2xl origin-top-left border-2 border-yellow bg-dark-grey shadow-lg z-50">
								<button class="text-white hover:text-yellow">Най-нови</button>
								<button class="text-white hover:text-yellow">Най-стари</button>
								<button class="text-white hover:text-yellow">
									Азбучен ред: А до Я
								</button>
								<button class="text-white hover:text-yellow">
									Азбучен ред: Я до А
								</button>
							</div>
						</TransitionChild>
					</TransitionRoot>
				</div>
			</div>
			<div class="flex items-center gap-4 pr-5 pt-10">
				<input
					v-model="search"
					placeholder="Потърси..."
					class="max-w-100 flex-1 h-10 px-3 border rounded focus:outline-none focus:border-white text-yellow md:w-auto md:h-10" />
				<SearchIcon class="w-10 h-10" />
			</div>
		</div>
	</div>
</template>
