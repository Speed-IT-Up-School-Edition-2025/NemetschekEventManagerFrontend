import { useUserStore } from "@/stores/userStore.ts";
import { baseUrl } from "@/utils/api.ts";

export const downloadFile = async (endpoint: string, filename: string, type: string) => {
	try {
		const response = await fetch(baseUrl + endpoint, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${useUserStore().accessToken}`,
				"Content-Type": `application/${type}`,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`Error downloading file: ${response.status} - ${errorText}`);
			return;
		}

		const blob = await response.blob();

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.style.display = "none";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(link.href);
		console.log(`${filename} downloaded successfully.`);
	} catch (error) {
		console.error("Network or fetch error during file download:", error);
		alert(
			"An error occurred during download. Please check your internet connection and try again."
		);
	}
};

// export const exportToCSV = () => {
// 	if (!eventId.value) {
// 		console.error("Event ID is not available for CSV export.");
// 		return;
// 	}
// 	const url = `${baseUrl}/csv/${eventId.value}`;
// 	const filename = `event_${eventId.value}.csv`;
// 	const contentType = "text/csv"; // Or 'application/csv'
// 	console.log(`Exporting to CSV from: ${url}`);
// 	downloadFile(url, filename, contentType);
// };
//
// export const exportToXLSX = () => {
// 	if (!eventId.value) {
// 		console.error("Event ID is not available for XLSX export.");
// 		return;
// 	}
// 	// Assuming baseUrl is also applicable for XLSX or adjust as needed
// 	const url = `${baseUrl}/xlsx/${eventId.value}`;
// 	const filename = `event_${eventId.value}.xlsx`;
// 	const contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
// 	console.log(`Exporting to XLSX from: ${url}`);
// 	downloadFile(url, filename, contentType);
// };
