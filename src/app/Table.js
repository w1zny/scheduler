import { parseNumber} from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function Students({ result, handleGoBack }) {

	const getHeight = (length) => {
		return { height: `${length*3}px` };
	};

	const breakCheck = (name) => {
		return name === "break" || name === "prestavka" || name === "prestávka" || name === "pauza" || name === "pause";
	}

	return (
		<div className={`flex flex-col justify-center w-10/12 py-2 px-9 bg-customWhite rounded-md shadow-md `}>
			<div className={`flex justify-around`}>
				{Object.keys(result).map((day, index) => (
					<div key={index} className={`flex justify-around w-full`}>
						<table className={`mb-2 min-w-52 items-center justify-start border-separate border-spacing-2`}>
							<thead>
							<tr>
								<th className={`text-2xl py-2 font-extrabold text-customGray`}>{day}</th>
							</tr>
							</thead>
							<tbody className={`items-center justify-start`}>
							{result[day] && result[day].map((student, index) => (
								<tr key={index}>
									<td
										className={`text-center bg-customWhite-light rounded shadow-md min-w-52 hover:shadow-sm hover:cursor-pointer`}
										style={getHeight(student.length)}>

										<p className={`py-0 text-xl text-customGray-light font-medium`}>{student.name}</p>
										<p
											className={`py-0 text-xl text-customGray-light font-light`}>{parseNumber(student.time)}-{parseNumber(student.time + student.length)}</p>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				))
				}
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