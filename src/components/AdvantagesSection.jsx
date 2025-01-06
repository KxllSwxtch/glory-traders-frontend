import { FaCarAlt, FaExclamationCircle } from 'react-icons/fa'

const AdvantagesSection = () => {
	return (
		<section className='py-16 bg-white'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Левая колонка */}
					<div className='flex flex-col items-start'>
						<div className='flex items-center space-x-4 mb-4'>
							<FaCarAlt className='text-orange-600 text-3xl' />
							<h2 className='text-lg font-bold text-orange-600'>
								При покупке с дилерской стоянки
							</h2>
						</div>
						<ul className='space-y-4'>
							<li>
								<strong>Юридически чистый авто</strong>
								<p className='text-gray-600'>
									Чистый пробег, чистая история автомобиля.
								</p>
							</li>
							<li>
								<strong>Экономия средств</strong>
								<p className='text-gray-600'>
									Покупка авто дешевле рыночной цены в РФ.
								</p>
							</li>
							<li>
								<strong>Авто без пробега по РФ</strong>
								<p className='text-gray-600'>
									Без пробега и износа по дорогам России, без плохого топлива.
								</p>
							</li>
						</ul>
					</div>

					{/* Правая колонка */}
					<div className='flex flex-col items-start'>
						<div className='flex items-center space-x-4 mb-4'>
							<FaExclamationCircle className='text-orange-600 text-3xl' />
							<h2 className='text-lg font-bold text-orange-600'>
								При покупке с рук в РФ
							</h2>
						</div>
						<ul className='space-y-4'>
							<li>
								<strong>Подделка документов</strong>
								<p className='text-gray-600'>
									Угнанный или арестованный автомобиль.
								</p>
							</li>
							<li>
								<strong>Смотанный пробег</strong>
								<p className='text-gray-600'>
									Смотать для увеличения стоимости стоит 500₽.
								</p>
							</li>
							<li>
								<strong>Восстановленные авто</strong>
								<p className='text-gray-600'>
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
