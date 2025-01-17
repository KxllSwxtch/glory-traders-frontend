import { FaCarAlt, FaExclamationCircle } from 'react-icons/fa'

const AdvantagesSection = () => {
	return (
		<section className='py-16 bg-white dark:bg-gray-900 transition-colors duration-300'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Левая колонка */}
					<div className='flex flex-col items-start'>
						<div className='flex items-center space-x-4 mb-4'>
							<FaCarAlt className='text-orange-600 dark:text-orange-400 text-3xl' />
							<h2 className='text-lg font-bold text-orange-600 dark:text-orange-400'>
								Преимущества покупки автомобилей с дилерской стоянки Glory
								Traders
							</h2>
						</div>
						<ul className='space-y-4'>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Юридически чистый авто
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Чистый пробег, чистая история автомобиля.
								</p>
							</li>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Экономия средств
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Покупка авто дешевле рыночной цены в РФ.
								</p>
							</li>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Авто без пробега по РФ
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Без пробега и износа по дорогам России, без плохого топлива.
								</p>
							</li>
						</ul>
					</div>

					{/* Правая колонка */}
					<div className='flex flex-col items-start'>
						<div className='flex items-center space-x-4 mb-4'>
							<FaExclamationCircle className='text-orange-600 dark:text-orange-400 text-3xl' />
							<h2 className='text-lg font-bold text-orange-600 dark:text-orange-400'>
								При покупке с рук в РФ
							</h2>
						</div>
						<ul className='space-y-4'>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Подделка документов
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Угнанный или арестованный автомобиль.
								</p>
							</li>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Смотанный пробег
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Смотать для увеличения стоимости стоит 500₽.
								</p>
							</li>
							<li>
								<strong className='text-gray-800 dark:text-white'>
									Восстановленные авто
								</strong>
								<p className='text-gray-600 dark:text-gray-300'>
									Перекупы покупают битые авто с зарубежных аукционов,
									восстанавливают и продают по рыночным ценам.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdvantagesSection
