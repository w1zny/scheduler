import Image from "next/image";

export default function WorkingDays({ submittedForms, setSubmittedForms, studentList, setStudentList }) {

	const handleInputChange = (index, value) => {
		const tmpStudentList = [...studentList];
		tmpStudentList[index] = value;
		setStudentList(tmpStudentList);
	}

	const handleAddStudent = () => {
		setStudentList([...studentList, ""]);
	}

	const handleRemoveStudent = (index) => {
		setStudentList(studentList.filter((_, i) => i !== index));
	};

	const handleGoBack = () => {
		setSubmittedForms(submittedForms - 1);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmittedForms(submittedForms + 1);
		setStudentList(studentList.filter(student => student !== ""));
		console.log(studentList);
	}

	return (
		<form onSubmit={handleSubmit} className={`w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md`}>
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>2</h1>
				<p className={`px-1 font-bold text-3xl`}>List all students</p>
			</div>
			<p className={`text-gray-400 italic`}>Here you should also list every extra lesson like Class Period or Chamber Music</p>
			<div className={`p-5 px-9 pb-9 flex items-end justify-between`}>
				<div className={`flex-column`}>
					{studentList.map((student, index) => (
						<div key={index} className={`flex items-center`}>
							<input
								type="text"
								value={studentList[index]}
								onChange={(e) => handleInputChange(index, e.target.value)}
								placeholder="Enter student's name"
								className="border px-2 my-1 text-xl rounded-md focus:outline-customOrange-light"/>
							<button type="button" onClick={() => handleRemoveStudent(index)} className={`mx-3`}>
								<Image src="cross.svg" alt="cross icon" width={20} height={20}/>
							</button>
						</div>
					))}
					<button type="button"
									onClick={handleAddStudent}
									className={`mt-4 py-1 px-5 text-xl bg-customGray-light rounded-md text-customWhite-dark shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
					>Add student
					</button>
				</div>
			</div>
			<div className={`mx-9 mb-8 flex items-end justify-between`}>
				<button type="button"
								onClick={handleGoBack}
								className={`py-1 px-5 text-xl bg-customOrange-light rounded-md text-customWhite-dark shadow-md hover:bg-customOrange hover:shadow-none active:bg-customOrange-dark`}
				>Back
				</button>
				<button type="submit"
								className={`py-1 px-5 text-xl bg-customOrange-light rounded-md text-customWhite-dark shadow-md hover:bg-customOrange hover:shadow-none active:bg-customOrange-dark`}
				>Next
				</button>
			</div>
		</form>
	);
}