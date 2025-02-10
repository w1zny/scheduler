import { parseNumber} from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function Students({ result, handleGoBack }) {
	const getHeight = (length) => {
		return { height: `${length*3}px` };
	};

	const breakCheck = (name) => {
		return name === "break" || name === "prestavka" || name === "prestávka" || name === "pauza" || name === "pause";
	}

	const getMinTime = () => {
		let minTime = Infinity;

		for (let schedule of Object.values(result)) {
			if (schedule.length > 0 && schedule[0].time < minTime) minTime = schedule[0].time;
		}

		return minTime;
	}

	return (
		<div className={`w-full mx-16 mb-12 py-2 px-9 bg-customWhite rounded-md shadow-md`}>
			<div className={`w-full flex justify-around`}>
				{Object.keys(result).map((day, index) => (
					<div key={index} className={`flex flex-col items-center`}>
						<p className={`my-3 mb-5 font-extrabold text-3xl text-customGray`}>{day}</p>
						<div className={`w-full`}
								 style={getHeight(result[day].length > 0 ? result[day][0].time - getMinTime() : 0)}></div>
						{result[day].map((student, index) => (
							<div key={index} className={`flex flex-col`}>
								{student.gap > 0 && index !== 0 &&
									<div className={`my-1 w-full border-2 rounded border-customOrange-light`}
											 style={getHeight(student.gap)}></div>}
								<div
									className={`my-1 min-w-40 px-4 bg-customWhite-light rounded shadow-md flex flex-col items-center justify-center hover:shadow-sm hover:cursor-pointer`}
									style={getHeight(student.length)}
								>
									<p className={`text-2xl text-customGray font-medium`}>{student.name}</p>
									<p
										className={`text-xl text-customGray-light font-light`}>{parseNumber(student.time)} - {parseNumber(student.time + student.length)}</p>
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			<div className={`mx-9 my-8 flex items-end justify-between`}>
				<button type="button" onClick={handleGoBack}
								className={`px-2 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
				><ArrowLeft size={40}/>
				</button>
			</div>
		</div>
	);
};