import { parseTime } from "@/utils";

export const checkWorkingDays = (workingDays) => {
	if (Object.keys(workingDays).length === 0)
		return { msg: "You didn't select any day as your working day!", page: 0 };

	for (const day of Object.keys(workingDays)) {
		const timeSlot = workingDays[day].trim().split(" ").join("");

		if (timeSlot.length === 0)
			return { msg: "No time slot given for " + day + "!", page: 1 };

		const startTime = parseTime(timeSlot.slice(0, 5));
		const endTime = parseTime(timeSlot.slice(6));

		if (startTime === null || endTime === null || startTime >= endTime)
			return { msg: "The time span of your working days is incorrect!", page: 1 };
	}

	return null;
};

export const checkStudentsData = (workingDays, studentsData) => {
	if (Object.keys(studentsData).length === 0)
		return { msg: "There are no students listed!", page: 2 };

	for (const student of studentsData) {
		const lessons = student.lessons.trim().split(" ").join("").split(",");
		let timeSlotCounter = 0;

		if (lessons.some(lesson => isNaN(parseInt(lesson))))
			return { msg: student.name + "'s lesson lengths are invalid!", page: 3 };

		for (const day of Object.keys(student.days)) {
			if (!(day in workingDays) || student.days[day].length === 0) continue;

			let prevEndTime = parseTime("00:00");

			for (let timeSlot of student.days[day]) {
				if (timeSlot.length === 0) continue;
				timeSlot = timeSlot.trim().split(" ").join("");
				console.log(timeSlot);

				const startTime = parseTime(timeSlot.slice(0, 5));
				const endTime = parseTime(timeSlot.slice(6));

				if (startTime === null || endTime === null || startTime >= endTime)
					return { msg: "Some of " + student.name + "'s time slots are incorrect!", page: 4 };

				if (prevEndTime > startTime)
					return { msg: student.name + "'s time slots are in an incorrect order!", page: 4 };

				timeSlotCounter++;
				prevEndTime = endTime;
			}
		}
		if (timeSlotCounter === 0)
			return { msg: "There are no time slots given for " + student.name +"!", page: 4 };
	}

	return null;
};