"use server"

import {parseTime} from "@/utils"

class Node {
	constructor(value) {
		this.value = value;
		this.next = [];
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

		if (lessons.length === 0 || gap === undefined) return;

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
		if (!student || !student.value.name) return;
		const newData = removeFromData(data, student, 1);

		student.next = getNextStudents(newData, day, student.value.time + student.value.length);
	})

	return nextStudents;
}

function removeFromData(data, student, del) {
	if (!data || !student) return null;
	const newData = [];

	data.forEach(item => {
		if (!item || !item.lessons) return;

		let lessons = JSON.parse(JSON.stringify(item.lessons));
		if (item.name === student.value.name) {
			lessons = item.lessons.filter(value => value !== student.value.length);
			if (del || lessons.length === 0)
				return;
		}
		newData.push({...item, lessons: lessons});
	})

	return newData;
}

function findMinPath(node, currPath = [], currGapSum = 0, minPathData = { path: [], minGap: Infinity }) {
	currPath.push(node);

	if (node.value.gap) currGapSum += node.value.gap;

	if (!node.next || node.next.length === 0) {
		const lastGap = parseTime("24:00") - (node.value.time + node.value.length);
		currGapSum += lastGap;
		if (currGapSum < minPathData.minGap) {
			minPathData.minGap = currGapSum;
			minPathData.path = [...currPath];
		}
	} else {
		node.next.forEach(child => {
			findMinPath(child, currPath, currGapSum, minPathData);
		});
	}

	currPath.pop();

	return minPathData;
}

const getPermutations = (arr) => {
	if (arr.length === 0) return [[]];
	if (arr.length === 1) return [arr];

	let result = [];

	arr.forEach((day, index) => {
		let remaining = arr.slice(0, index).concat(arr.slice(index + 1));
		let perms = getPermutations(remaining);

		perms.forEach((perm) => result.push([day, ...perm]));
	});

	return result;
};

export async function processData(workingDays, studentsData, getBest) {
	const data = parseData(workingDays, studentsData);

	let allPermutations;
	if (getBest)
		allPermutations = getPermutations(Object.keys(workingDays));

	let cpyData;
	let result = {Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []};

	if (allPermutations) {
		let minGap = Infinity;

		allPermutations.forEach(permutation => {
			cpyData = JSON.parse(JSON.stringify(data));
			let gap = 0;
			let paths = {Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []};

			permutation.forEach(day => {
				const root = new Node(day);

				root.next = getNextStudents(cpyData, day, 0);
				if (!root.next) return;
				const holder = findMinPath(root);
				paths[day] = holder.path.slice(1).map(val => val.value);
				gap += holder.minGap;

				for (let student of holder.path) cpyData = removeFromData(cpyData, student, 0);
			})

			if (gap < minGap) {
				minGap = gap;
				result = paths;
			}
		})

		cpyData = JSON.parse(JSON.stringify(data));
		Object.keys(result).forEach(day => {
			for (let student of result[day]) cpyData = removeFromData(cpyData, new Node(student), 0);
		})
	}
	else {
		cpyData = JSON.parse(JSON.stringify(data));

		Object.keys(workingDays).forEach(day => {
			const root = new Node(day);

			root.next = getNextStudents(cpyData, day, 0);
			const holder = findMinPath(root);

			result[day] = holder.path.slice(1).map(val => val.value);

			for (let student of holder.path) cpyData = removeFromData(cpyData, student, 0);
		})
	}

	let error = {msg: ""};
	if (cpyData.length > 0) {
		error.msg += "Unable to finish the whole schedule for:";
		cpyData.forEach(student => {
			error.msg += " " + student.name + " [" + student.lessons + "],";
		})
	}

	return {result: result, error: error};
}