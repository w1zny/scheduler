export const parseTime = (timeString) => {
	if (!timeString || timeString.length !== 5) return null;

	let [hours, minutes] = timeString.split(":").map(Number);

	if (isNaN(hours) || isNaN(minutes) || hours === undefined || minutes === undefined ||
		  hours < 0 || hours > 24 || minutes < 0 || minutes > 59)
		return null;

	if (hours === 24) hours = 0;

	return hours * 60 + minutes;
};

export const parseNumber = (number) => {
	const hours = Math.floor(number / 60);
	const minutes = (number % 60).toString().padStart(2, "0");

	return hours + ":" + minutes;
}