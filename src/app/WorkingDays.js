import { ArrowRight } from "lucide-react";

export default function WorkingDays({ workingDays, setWorkingDays, handleGoForward }) {
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	const handleCheckboxChange = (day) => {
		setWorkingDays((prev) => {
			const tmpWorkingDays = { ...prev };

			if (day in tmpWorkingDays)
				delete tmpWorkingDays[day];
			else
				tmpWorkingDays[day] = "";

			return tmpWorkingDays;
		});
	};

	return (
			<div className={`w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md items-end`}>
				<div className={`flex items-end`}>
					<h1 className={`font-logoFont text-8xl text-customOrange-light`}>1</h1>
					<p className={`px-1 font-bold text-3xl`}>Choose your working days</p>
				</div>
				<div className={`p-5 px-9 pb-9 flex items-end justify-between`}>
					<div className={`flex-column`}>
						{daysOfWeek.map((day, index) => (
								<label key={index} className={`flex items-center mt-3 min-h-8 justify-between`}>
									<input
										className={`accent-customOrange-light`}
										type="checkbox"
										value={day}
										onChange={() => handleCheckboxChange(day)}
										checked={day in workingDays}
									/><p className={`px-2 w-36 text-2xl hover:cursor-pointer hover:text-customGray-light`}>{day}</p>
								</label>
						))}
					</div>
					<button type="button" onClick={handleGoForward}
									className={`px-3 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
					><ArrowRight size={40}/>
					</button>
				</div>
			</div>
	);
}