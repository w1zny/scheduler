import { ArrowRight, ArrowLeft } from "lucide-react";

export default function DailyTimeSlots({ workingDays, setWorkingDays, handleGoBack, handleGoForward }) {

	const handleInputChange = (value, day) => {
		setWorkingDays((prev) => {
			const tmpWorkingDays = {...prev};
			tmpWorkingDays[day] = value;
			return tmpWorkingDays;
		});
	};

	return (
		<div className={`w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md`}>
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>2</h1>
				<p className={`px-1 font-bold text-3xl`}>When do you want to work?</p>
			</div>
			<p className={`text-gray-400 italic`}>Format: 12:00-17:30</p>
			<div className={`flex flex-col p-8 px-16`}>
				{Object.keys(workingDays).map((day, index) => (
					<div key={index} className={`flex h-12 items-center`}>
						<p className={`text-2xl w-44`}>{day}</p>
						<input type="text"
									 className={`border w-44 px-3 py-1 text-center text-xl rounded-md border-customGray-light focus:outline-customOrange-light`}
									 placeholder="Enter Time Slot"
									 value={workingDays[day]}
									 onChange={(e) => {handleInputChange(e.target.value, day)}}
						/>
					</div>
				))}
			</div>
			<div className={`mx-9 mb-8 flex items-end justify-between`}>
				<button type="button" onClick={handleGoBack}
								className={`px-2 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
				><ArrowLeft size={40}/>
				</button>
				<button type="button" onClick={handleGoForward}
								className={`px-2 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
				><ArrowRight size={40}/>
				</button>
			</div>
		</div>
	);
};