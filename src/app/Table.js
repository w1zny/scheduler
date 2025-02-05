import { parseNumber} from "@/utils";

export default function Students({ result }) {

	return (
		<div className={`w-10/12 py-2 px-9 m-9 bg-customWhite rounded shadow-md flex justify-around`}>
			{Object.keys(result).map((day, index) => (
				<table key={index}>
					<thead>
						<tr><th className={`text-3xl font-bold text-customGray`}>{day}</th></tr>
					</thead>
					<tbody>
					{result[day] && result[day].map((student, index) => (
						<tr key={index}>
							<th className={`flex flex-col items-center my-4`}>
								<p className={`text-2xl text-customGray-light`}>{student.name}</p>
								<p
									className={`text-xl text-customGray-light`}>{parseNumber(student.time)}-{parseNumber(student.time + student.length)}</p>
							</th>
						</tr>
					))}
					</tbody>
				</table>
			))
			}
		</div>
	);
};