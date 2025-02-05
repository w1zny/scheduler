"use server"

import { parseTime } from "./app/checks"

class Node {
	constructor(value) {
		this.value = value;
		this.next = [];
	}

	toString() {
		return this.value;
	}
}

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
					let endTime = parseTime(times[1]);
					const workDayStartTime = parseTime(workingDays[day].trim().split(" ").join("").split("-")[0]);
					const workDayEndTime = parseTime(workingDays[day].trim().split(" ").join("").split("-")[1]);

					if (endTime > workDayEndTime) {
						endTime = workDayEndTime;
						if (endTime < startTime)
							return [];
					}

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

function getNextStudents(data, day, time) {
	let nextStudents =[];
	let minGap = Infinity;

	data.forEach(student => {
		const lessons = [];
		let gap;
		if (!student.lessons) return;

		student.lessons.forEach(lesson => {
			for (const timeSlot of student.days[day]) {
				if ((time >= timeSlot[0] && time + lesson <= timeSlot[1]) ||
					  (time < timeSlot[0] && timeSlot[0] + lesson <= timeSlot[1])) {
					lessons.push(lesson);
					gap = Math.max(0, timeSlot[0] - time);
				}
			}
		})

		if (lessons.length === 0 || gap === undefined || gap > minGap) return;

		if (gap < minGap) nextStudents = [];
		minGap = gap;

		lessons.forEach(lesson => {
			nextStudents.push(new Node({
				name: student.name,
				length: lesson,
				time: time + gap,
				gap: gap
			}));
		})
	})

	if (nextStudents.length === 0) return null;

	nextStudents.forEach(student => {
		const newData = removeFromData(data, student, 1);
		student.next = getNextStudents(newData, day, student.value.time + student.value.length);
	})

	return nextStudents;
}

function removeFromData(data, student, del) {
	const newData = [];

	data.forEach(item => {
		if (!item || !item.lessons) return;

		let lessons = JSON.parse(JSON.stringify(item.lessons));
		if (item.name === student.value.name) {
			lessons = item.lessons.filter(value => value !== student.value.length);
			if (del === 1 || lessons.length === 0)
				return;
		}
		newData.push({...item, lessons: lessons});
	})

	return newData;
}

function findMinPath(node, currentPath = [], currentGapSum = 0, minPathData = { path: [], minGap: Infinity }) {
	currentPath.push(node);

	if (node.value.gap) currentGapSum += node.value.gap;

	if (!node.next || node.next.length === 0) {
		if (currentGapSum < minPathData.minGap) {
			minPathData.minGap = currentGapSum;
			minPathData.path = [...currentPath];
		}
	} else {
		node.next.forEach(child => {
			findMinPath(child, currentPath, currentGapSum, minPathData);
		});
	}

	currentPath.pop();

	return minPathData;
}

export async function processData(workingDays, studentsData) {
	const data = parseData(workingDays, studentsData);
	let result = {
		Monday: null,
		Tuesday: null,
		Wednesday: null,
		Thursday: null,
		Friday: null,
	}

	const trees = [];
	let cpyData = JSON.parse(JSON.stringify(data));

	Object.keys(workingDays).forEach(day => {
		const root = new Node(day);
		trees.push(root);

		root.next = getNextStudents(cpyData, day, 0);
		const path = findMinPath(root).path;

		for (let student of path) cpyData = removeFromData(cpyData, student, 0);
	})

	return {result: result};
}