import { ArrowRight } from "lucide-react";
import {useEffect, useState} from "react";

export default function WorkingDays({ workingDays, setWorkingDays, selectedDays, setSelectedDays, handleGoForward }) {
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	const handleCheckboxChange = (day) => {
		if (selectedDays.includes(day))
			setSelectedDays(selectedDays.filter((d) => d !== day));
		else
			setSelectedDays([...selectedDays, day]);
	};

	const handleInputChange = (value, day) => {
		setWorkingDays(prev => ({
			...prev,
			[day]: value,
		}));
	};

	const handleStoreAndNext = () => {
		handleGoForward();
	};

	return (
			<div className={`w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md items-end`}>
				<div className={`flex items-end`}>
					<h1 className={`font-logoFont text-8xl text-customOrange-light`}>1</h1>
					<p className={`px-1 font-bold text-3xl`}>Choose your working days</p>
				</div>
				<p className={`text-gray-400 italic`}>Choose a time slot for when you want to start teaching that day
					(12:00-17:30)</p>
				<div className={`p-5 px-9 pb-9 flex items-end justify-between`}>
					<div className={`flex-column`}>
						{daysOfWeek.map((day, index) => (
							<div key={index} className={`mt-3 min-h-8 flex items-center justify-between`}>
								<label className={`flex items-center`}>
									<input
										className={`accent-customOrange-light`}
										type="checkbox"
										value={day}
										onChange={() => handleCheckboxChange(day)}
										checked={selectedDays.includes(day)}
									/><p className={`px-2 w-36 text-xl hover:cursor-pointer hover:text-customGray-light`}>{day}</p>
								</label>
								{selectedDays.includes(day) && <input
									className={`px-2 ml-3 rounded-md text-lg border border-customGray-light focus:outline-customOrange-light`}
									type="text"
									value={workingDays[day]}
									onChange={(e) => handleInputChange(e.target.value, day)}
									placeholder="Enter a time slot"
								/>}
							</div>
						))}
					</div>
					<button type="button" onClick={handleStoreAndNext}
									className={`px-3 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
					><ArrowRight size={40}/>
					</button>
				</div>
			</div>
	);
}