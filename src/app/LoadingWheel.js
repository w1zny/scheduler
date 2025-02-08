export default function LoadingWheel() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<div className="w-16 h-16 border-4 border-t-4 border-customOrange-light border-solid rounded-full animate-spin"></div>
			<p className={`text-customGray-light`}>Depending on the input this might take a few minutes.</p>
		</div>
	);
}