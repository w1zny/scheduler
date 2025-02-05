export const parseTime = (timeString) => {
	if (!timeString || timeString.length === 0) return null;

	const [hours, minutes] = timeString.split(":").map(Number);
	return hours * 60 + minutes;
};

export const parseNumber = (number) => {
	const hours = Math.floor(number / 60);
	const minutes = (number % 60).toString().padStart(2, "0");

	return hours + ":" + minutes;
}