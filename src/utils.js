export const parseTime = (timeString) => {
	if (!timeString || timeString.length !== 5) return null;
	if (timeString === "24:00") return parseTime("23:59") + 1;

	let [hours, minutes] = timeString.split(":").map(Number);

	if (isNaN(hours) || isNaN(minutes) || hours === undefined || minutes === undefined ||
		  hours < 0 || hours > 23 || minutes < 0 || minutes > 59)
		return null;

	return hours * 60 + minutes;
};

export const parseNumber = (number) => {
	const hours = Math.floor(number / 60);
	const minutes = (number % 60).toString().padStart(2, "0");

	return hours + ":" + minutes;
}