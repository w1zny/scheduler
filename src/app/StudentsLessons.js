import { ArrowRight, ArrowLeft } from "lucide-react";

export default function DailyTimeSlots({ studentsData, setStudentsData, handleGoBack, handleGoForward }) {

	const handleInputChange = (value, studentId) => {
		setStudentsData((prev) => {
			const tmpStudentsData = [...prev];
			tmpStudentsData[studentId].lessons = value;
			return tmpStudentsData;
		});
	};

	return (
		<div className={`w-1/2 py-2 px-9 bg-customWhite rounded-md shadow-md`}>
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>4</h1>
				<p className={`px-1 font-bold text-3xl`}>How long are your students&#39; lessons?</p>
			</div>
			<p className={`text-gray-400 pt-1 italic`}>Format (in minutes): 20, 45</p>
			{studentsData.length === 0 && <p className={`text-customGray-light font-bold text-3xl px-8 py-4`}>No students listed!</p>}
			{studentsData.length !== 0 &&
				<div className={`flex flex-col p-8 px-12`}>
					{studentsData.map((student, index) => (
						<div key={index} className={`flex items-center h-12`}>
							<p className={`text-2xl min-w-56`}>{student.name}</p>
							<input type="text"
										 value={student.lessons}
										 onChange={(e) => handleInputChange(e.target.value, index)}
										 placeholder="Enter Lesson Lengths"
										 className={`px-3 h-min py-1 w-60 text-xl rounded-md border border-customGray-light focus:outline-customOrange-light`}
							/>
						</div>
					))}
				</div>
			}
			<div className={`mx-9 my-8 flex items-end justify-between`}>
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