export const formatDateTime = (isoString: string) => {
	return new Date(isoString).toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
