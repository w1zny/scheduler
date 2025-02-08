import {ArrowLeft, ArrowRight} from "lucide-react";

export default function GetBestSchedule({ getBestSchedule, setGetBestSchedule, handleGoBack, handleSubmit }) {

	return (
		<div className="w-1/2 py-2 px-9 bg-customWhite rounded shadow-md">
			<div className={`flex items-end`}>
				<h1 className={`font-logoFont text-8xl text-customOrange-light`}>6</h1>
				<p className={`px-1 font-bold text-3xl`}>Do you want to get the absolute best schedule?</p>
			</div>
			<p className={`text-gray-400 pt-1 italic`}>Absolute best scheduling can take a lot of time depending on the
				input.</p>
			<p className={`text-gray-400 italic`}>It&#39;s best suited for max. of approximately 3 working days and 10 students.</p>
			<p className={`text-gray-400 italic`}>For regular purposes I DON&#39;T recommend checking this option.</p>
			<label className={`text-2xl flex items-center m-5 mx-10 hover:cursor-pointer hover:text-customGray-light`}>
				<input type="checkbox"
							 checked={getBestSchedule}
							 onChange={(e) => setGetBestSchedule(!getBestSchedule)}
							 className={`w-4 h-4 accent-customOrange-light`}
				/>
				<span className={`p-2`}>Get absolute best schedule</span>
			</label>
			<div className={`mx-9 my-8 flex items-end justify-between`}>
				<button type="button" onClick={handleGoBack}
								className={`px-2 text-customWhite-dark bg-customGray-light rounded-md shadow-md hover:bg-customGray hover:shadow-none active:bg-customGray-dark`}
				><ArrowLeft size={40}/>
				</button>
				<button type="submit" onClick={handleSubmit}
								className={`px-2 text-customWhite-dark bg-customOrange-light rounded-md shadow-md hover:bg-customOrange hover:shadow-none active:bg-customOrange-dark`}
				><ArrowRight size={40}/>
				</button>
			</div>
		</div>
	);
}
