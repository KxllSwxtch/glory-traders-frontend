const WhyUs = () => {
	return (
		<section className='bg-gray-200 dark:bg-gray-800 py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center text-orange-500 dark:text-orange-400 mb-8'>
					Почему стоит выбрать GloryTraders?
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{/* Карточка 1 */}
					<div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
						<div className='flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400 text-4xl'>
							<i className='fas fa-car'></i>
						</div>
						<h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-gray-200'>
							Широкий выбор автомобилей
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Мы предлагаем автомобили с лучших аукционов и дилерских стоянок
							Южной Кореи.
						</p>
					</div>
					{/* Карточка 2 */}
					<div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
						<div className='flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400 text-4xl'>
							<i className='fas fa-shield-alt'></i>
						</div>
						<h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-gray-200'>
							Надёжность и гарантия
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Мы работаем честно и прозрачно, гарантируя доставку и качество.
						</p>
					</div>
					{/* Карточка 3 */}
					<div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
						<div className='flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400 text-4xl'>
							<i className='fas fa-comments'></i>
						</div>
						<h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-gray-200'>
							Отзывы довольных клиентов
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Наши клиенты ценят нас за профессионализм и качество
							предоставляемых услуг.
						</p>
					</div>
				</div>
			</div>
			<div className='flex justify-center mt-12'>
				<a
					href='#herosection'
					className='btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-orange-400 dark:hover:bg-orange-500'
				>
					Подобрать авто
				</a>
			</div>
		</section>
	)
}

export default WhyUs
