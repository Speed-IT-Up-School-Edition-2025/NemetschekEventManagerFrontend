<script setup lang="ts">
import UserIcon from "@/components/icons/UserIcon.vue";
import { RouterLink } from "vue-router";
import { apiClient } from "@/utils/api";
import { ref, onMounted } from "vue";
import ConfirmationComponent from "@/components/ConfirmationComponent.vue";
import { useUIStore } from "@/stores/uiStore";
import LoaderComponent from "@/components/LoaderComponent.vue";
interface User {
	id: string;
	email: string;
	isAdmin: boolean;
}

const uiStore = useUIStore();
const users = ref<User[]>([]);
const showConfirmDialog = ref(false);
const userToUpdate = ref<{ id: string; isAdmin: boolean } | null>(null);
const confirmMessage = ref("");
const isLoading = ref(true);
const usersNotFound = ref(false);

const fetchUsers = async () => {
	try {
		isLoading.value = true;
		const response = await apiClient.get<User[]>("/users");
		users.value = response;
	} catch (err) {
		uiStore.triggerToast(
			"Неуспешно извличане на потребители. Опитайте отново по-късно.",
			"error"
		);
		console.error("Error fetching users:", err);
	} finally {
		isLoading.value = false;
	}
};

const updateUserAdminStatus = async (userId: string, isAdmin: boolean) => {
	try {
		await apiClient.put(`/users/${userId}/admin`, { isAdmin });
		await fetchUsers();
	} catch (err) {
		usersNotFound.value = true;
		console.error("Error updating user admin status:", err);
		throw err;
	}
};

const promptConfirm = (userId: string, willBeAdmin: boolean) => {
	userToUpdate.value = { id: userId, isAdmin: willBeAdmin };
	confirmMessage.value = willBeAdmin
		? `Сигурен ли си, че искаш да направиш този потребител администратор?`
		: `Сигурен ли си, че искаш да премахнеш администраторските права на този потребител?`;
	showConfirmDialog.value = true;
};

const handleConfirm = async (confirmed: boolean) => {
	showConfirmDialog.value = false;

	if (confirmed && userToUpdate.value) {
		try {
			await updateUserAdminStatus(userToUpdate.value.id, userToUpdate.value.isAdmin);
			uiStore.triggerToast(
				userToUpdate.value.isAdmin
					? "Потребителят е направен администратор успешно!"
					: "Администраторските права са премахнати успешно!",
				"success"
			);
		} catch (err) {
			uiStore.triggerToast("Неуспешна промяна на роля. Опитай отново.", "error");
			console.error("Error updating user role:", err);
		}
	}

	userToUpdate.value = null;
};

onMounted(() => {
	fetchUsers();
});
</script>

<template>
	<div class="p-5">
		<div v-if="isLoading"><LoaderComponent /></div>
		<template v-else>
			<table class="min-w-4 divide-y divide-gray-200 ml-auto mr-auto w-1/2">
				<thead class="bg-gray-800">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-yellow uppercase tracking-wider">
							Имейл
						</th>
						<th
							scope="col"
							class="py-3 text-left text-xs font-medium text-yellow uppercase tracking-wider">
							Роля
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-yellow uppercase tracking-wider">
							Действия
						</th>
					</tr>
				</thead>
				<tbody class="bg-gray-700 divide-y divide-gray-600">
					<tr v-if="users.length === 0">
						<td colspan="3" class="text-center text-white py-4">
							Няма намерени потребители.
						</td>
					</tr>
					<tr
						v-for="user in users"
						:key="user.id"
						class="hover:bg-gray-600 transition-colors">
						<td class="px-6 py-4 whitespace-nowrap">
							<RouterLink
								:to="''"
								class="flex items-center hover:text-yellow transition-colors cursor-default">
								<UserIcon class="flex-shrink-0" />
								<span class="ml-3 text-white">{{ user.email }} </span>
							</RouterLink>
						</td>
						<td class="py-4 whitespace-nowrap">
							<RouterLink
								:to="''"
								class="flex items-start hover:text-yellow transition-colors cursor-default">
								<span v-if="user.isAdmin" class="text-white">Администратор</span>
								<span v-else class="text-white">Потребител</span>
							</RouterLink>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<RouterLink
								:to="''"
								class="flex items-start justify-between hover:text-yellow transition-colors">
								<div class="flex justify-end gap-2">
									<button
										v-if="!user.isAdmin"
										@click="promptConfirm(user.id, true)"
										class="bg-cyan text-dark-grey px-3 py-1 rounded-md hover:opacity-90 transition-colors font-medium cursor-pointer">
										Направи админ
									</button>
									<button
										v-if="user.isAdmin"
										@click="promptConfirm(user.id, false)"
										class="bg-red text-white px-3 py-1 rounded-md hover:opacity-90 transition-colors font-medium cursor-pointer">
										Премахни права
									</button>
								</div>
							</RouterLink>
						</td>
					</tr>
				</tbody>
			</table>
		</template>
	</div>
	<ConfirmationComponent
		v-if="showConfirmDialog"
		:message="confirmMessage"
		@confirm="handleConfirm(true)"
		@cancel="handleConfirm(false)"
		confirmText="Потвърди"
		cancelText="Отказ" />
</template>
