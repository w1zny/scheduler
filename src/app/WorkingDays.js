export default function WorkingDays({ submittedForms, setSubmittedForms, selectedDays, setSelectedDays }) {
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	const handleCheckboxChange = (day) => {
		if (selectedDays.includes(day))
			setSelectedDays(selectedDays.filter((d) => d !== day));
		else
			setSelectedDays([...selectedDays, day]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmittedForms(submittedForms + 1);
		console.log(selectedDays);
	}

	return (
		<form onSubmit={handleSubmit} className={`w-1/2 py-2 px-9 m-9 bg-customWhite rounded shadow-md`}>
				<div className={`flex items-end`}>
					<h1 className={`font-logoFont text-8xl text-customOrange-light`}>1</h1>
					<p className={`px-1 font-bold text-3xl`}>Choose your working days</p>
				</div>
			<div className={`p-5 px-9 pb-9 flex items-end justify-between`}>
				<div className={`flex-column`}>
					{daysOfWeek.map((day, index) => (
						<label key={index} className={`flex items-center`}>
							<input
								className={`accent-customOrange-light`}
								type="checkbox"
								value={day}
								onChange={() => handleCheckboxChange(day)}
								checked={selectedDays.includes(day)}
							/><p className={`px-2 text-xl hover:cursor-pointer hover:text-customGray-light`}>{day}</p>
						</label>
					))}
				</div>
				<button type="submit"
								className={`py-1 px-5 bg-customOrange-light rounded-md text-customWhite-dark text-xl shadow-md hover:bg-customOrange hover:shadow-none active:bg-customOrange-dark`}
				>
					Next
				</button>
			</div>
		</form>
	);
}