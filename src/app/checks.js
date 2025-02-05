export const parseTime = (timeString) => {
	const [hours, minutes] = timeString.split(":").map(Number);
	return hours * 60 + minutes;
};

export const checkWorkingDays = (workingDays) => {
	if (Object.keys(workingDays).length === 0)
		return "You didn't select any day as your working day!";

	let errMsg = null;
	Object.keys(workingDays).forEach((day) => {
		const timeSlot = workingDays[day].trim().split(" ").join("");

		const startTime = parseTime(timeSlot.slice(0, 5));
		const endTime = parseTime(timeSlot.slice(6));

		if (isNaN(startTime) || isNaN(endTime) || startTime > endTime)
			errMsg = "The time span of your working days is incorrect!";
	});
	return errMsg;
};

export const checkStudentsData = (workingDays, studentsData) => {
	let check = true;

	if (Object.keys(studentsData).length === 0)
		return "There are no students listed!";

	let errMsg = null;
	studentsData.forEach((student) => {
		// lessons check
		const lessons = student.lessons.trim().split(" ").join("").split(",");

		lessons.forEach((lesson) => {
			if (isNaN(parseInt(lesson)))
				errMsg = student.name + "'s lesson lengths are invalid";
		})

		if (errMsg) return errMsg

		// time slot check
		Object.keys(student.days).forEach((day) => {
			if (!(day in workingDays))
				return;

			if (student.days[day].length === 0)
				errMsg = "Some of " + student.name + "'s time slots are missing!";

			let prevEndTime = parseTime("00:00");

			student.days[day].forEach((timeSlot) => {
				const startTime = parseTime(timeSlot.slice(0, 5));
				const endTime = parseTime(timeSlot.slice(6));

				if (isNaN(startTime) || isNaN(endTime) || startTime > endTime)
					errMsg = "Some of " + student.name + "'s time slots are incorrect!" ;

				if (prevEndTime > startTime)
					errMsg = student.name + "'s time slots are in an incorrect order!";

				prevEndTime = endTime;
			});
		});
	});

	return errMsg;
};