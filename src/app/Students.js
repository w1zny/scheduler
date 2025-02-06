import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Students({ studentList, setStudentList, handleGoBack, handleGoForward }) {

	const [input, setInput] = useState("");

	const handleInputChange = (value) => {
		setInput(value);
	};

	const handleAddStudent = () => {
		if (input.trim() !== "") {
			setStudentList((prevList) => [...prevList, input]);
			setInput("");
		}
	};

	const handleRemoveStudent = (index) => {
		setStudentList((prevList) => prevList.filter((_, i) => i !== index));
	};

	return (
		<div className={`w-1/2 py-2 px-9 bg-customWhite rounded shadow-md`}>
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>3</h1>
				<p className={`px-1 font-bold text-3xl`}>What are the names of your students?</p>
			</div>
			<p className={`text-gray-400 py-1 italic`}>Here you should also list every extra lessons like Class Period and Breaks</p>
			<div className={`p-5 px-9 pb-9 flex items-end justify-between`}>
				<div className={`flex-column w-full`}>
					<div className={`flex items-center mx-5`}>
						<input
							type="text"
							value={input}
							onChange={(e) => handleInputChange(e.target.value)}
							placeholder="Enter student's name"
							className="border border-customGray-light w-full 2/3 px-4 py-1 text-xl rounded-md focus:outline-customOrange-light"/>
						<button type="button" onClick={handleAddStudent}
										className={`ml-3 py-1 px-5 text-lg min-w-40 bg-customGray-light rounded-md text-customWhite-dark shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
						>Add student
						</button>
					</div>
					{studentList.map((student, index) => (
						<div key={index} className={`flex items-center mt-2`}>
							<button type="button" onClick={() => handleRemoveStudent(index)}
											className={`ml-5 text-customOrange-light hover:text-customOrange-dark`}>
								<Trash2 size={24}/>
							</button>
							<div className={`flex items-center`}>
								<p className={`mr-3 text-3xl w-8 text-right font-bold`}>{index + 1}</p>
								<p className={`text-2xl`}>{student}</p>
							</div>
						</div>
					))}
				</div>
			</div>
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