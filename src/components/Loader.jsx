const Loader = () => {
	return (
		<div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50'>
			<div className='relative w-16 h-16'>
				<div className='absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin'></div>
				<div className='absolute inset-0 border-4 border-orange-300 border-t-transparent rounded-full animate-spin-slow'></div>
			</div>
		</div>
	)
}

export default Loader
