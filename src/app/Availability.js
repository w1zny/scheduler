import { useState } from "react";
import {ArrowLeft, ArrowRight, Trash2} from "lucide-react";

export default function Availability({ studentsData, setStudentsData, workingDays, handleGoBack, handleSubmit }) {
	const handleAddTimeSlot = (studentIndex, day) => {
		const updatedStudents = [...studentsData];
		updatedStudents[studentIndex].days[day].push("");
		setStudentsData(updatedStudents);
	};

	const handleRemoveTimeSlot = (studentIndex, day, timeIndex) => {
		const updatedStudents = [...studentsData];
		updatedStudents[studentIndex].days[day].splice(timeIndex, 1);
		setStudentsData(updatedStudents);
	};

	const handleTimeSlotChange = (studentIndex, day, timeIndex, value) => {
		const updatedStudents = [...studentsData];
		updatedStudents[studentIndex].days[day][timeIndex] = value;
		setStudentsData(updatedStudents);
	};

	return (
		<div className="w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md">
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>5</h1>
				<p className={`px-1 font-bold text-3xl`}>What is your students&#39; availability?</p>
			</div>
			<p className={`text-gray-400 pt-1 italic`}>Format: 12:00-17:30</p>

			{studentsData.length === 0 && <p className={`text-customGray-light font-bold text-3xl px-8 py-4`}>No students listed!</p>}
			{studentsData.length !== 0 && studentsData.map((student, studentIndex) => (
				<div key={studentIndex} className={`mt-5 ml-12`}>
					<h2 className={`text-2xl mt-4 font-bold`}><span className={`text-3xl pr-2`}>{studentIndex + 1}</span>{student.name}
					</h2>
					{Object.keys(workingDays).map((day) => (
						<div key={day} className={`mt-2 ml-12 flex`}>
							<p className={`text-2xl w-36`}>{day}:</p>
							<div className={``}>
								{student.days[day].map((timeSlot, timeIndex) => (
									<div key={timeIndex} className={`flex items-center ml-8`}>
										<input
											type="text"
											value={timeSlot}
											onChange={(e) => handleTimeSlotChange(studentIndex, day, timeIndex, e.target.value)}
											placeholder="Enter Time Slot"
											className={`border border-customGray-light px-2 w-152px my-1 text-lg text-center rounded-md focus:outline-customOrange-light`}
										/>
										<button type="button" onClick={() => handleRemoveTimeSlot(studentIndex, day, timeIndex)}>
											<Trash2 size={24} className={`ml-3 text-customOrange-light hover:text-customOrange-dark`}/>
										</button>
									</div>
								))}
								<button
									type="button"
									onClick={() => handleAddTimeSlot(studentIndex, day)}
									className={`ml-8 mb-4 px-4 text-lg rounded-md bg-customGray-light text-customWhite-dark shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
								>Add Time Slot
								</button>
							</div>
						</div>
					))}
				</div>
			))}

			<div className={`mx-9 my-8 flex items-end justify-between`}>
				<button type="button" onClick={handleGoBack}
								className={`px-2 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
				><ArrowLeft size={40}/>
				</button>
				<button type="submit" onClick={handleSubmit}
								className={`px-2 text-customWhite-dark bg-customOrange-light rounded-md shadow-md hover:bg-customOrange hover:shadow-none active:bg-customOrange-dark`}
				><ArrowRight size={40}/>
				</button>
			</div>
		</div>
	);
}
