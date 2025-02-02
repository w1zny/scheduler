"use server"

import { parseTime } from "./app/checks";

/*
[
	{name: "",
	lessons: [int...],
	availability: {
		Monday: [[Time, Time], [Time, Time]],
		.
		.
		.
		}
	}
]
 */

function parseData(workingDays, studentsData) {
	return studentsData.map((student) => ({
		...student,
		lessons: student.lessons.trim().split(" ").join("").split(",")
			.map((lesson) => parseInt(lesson, 10)),
		days: Object.keys(student.days).reduce((acc, day) => {
			if (day in workingDays) {
				acc[day] = student.days[day].map((timeSlot) => {
					const times = timeSlot.trim().split(" ").join("").split("-");

					let startTime = parseTime(times[0]);
					const endTime = parseTime(times[1]);
					const workDayStartTime = parseTime(workingDays[day].trim().split(" ").join("").split("-")[0]);

					if (startTime < workDayStartTime) {
						startTime = workDayStartTime;
						if (startTime > endTime)
							return [];
					}

					return [startTime, endTime];
				});
			} else
				acc[day] = student.days[day];
			return acc;
		}, {}),
	}));
}

export async function processData(workingDays, studentsData) {
	const data = parseData(workingDays, studentsData);
	return {result: data};
}