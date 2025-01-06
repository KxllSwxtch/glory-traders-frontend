import { useEffect, useState, useRef } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCarsAsync } from '../redux/slices/carsSlice'
import { Loader } from '../components'

const CarDetails = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const thumbnailContainerRef = useRef(null)

	const { cars, loading, error, currentPage } = useSelector(
		(state) => state.cars,
	)

	const car = cars.find((car) => car.id === Number(id) || car.id === id)

	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		if (!car) {
			dispatch(fetchCarsAsync({ page: currentPage || 1, filters: {} }))
		}
	}, [car, dispatch, currentPage])

	useEffect(() => {
		if (car && car.images?.images_original_big?.length > 1) {
			setCurrentImageIndex(0)
		}
	}, [car])

	useEffect(() => {
		if (thumbnailContainerRef.current) {
			const thumbnails = thumbnailContainerRef.current.children
			const activeThumbnail = thumbnails[currentImageIndex]
			if (activeThumbnail) {
				activeThumbnail.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				})
			}
		}
	}, [currentImageIndex])

	if (error) {
		return <p className='text-red-500'>Ошибка загрузки данных: {error}</p>
	}

	if (loading) {
		return <Loader />
	}

	if (!car) {
		return <p>Данные автомобиля не найдены.</p>
	}

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex + 1 < car.images?.images_original_big.length
				? prevIndex + 1
				: 0,
		)
	}

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex - 1 >= 0
				? prevIndex - 1
				: car.images?.images_original_big.length - 1,
		)
	}

	return (
		<div className='container mx-auto p-4'>
			<div className='flex flex-wrap'>
				{/* Левая часть - карусель изображений */}
				<div className='w-full md:w-2/3 p-4'>
					<div className='relative overflow-hidden'>
						<div
							className='transition-transform duration-500'
							style={{
								transform: `translateX(-${currentImageIndex * 100}%)`,
								display: 'flex',
							}}
						>
							{car.images?.images_original_big.map((img, index) => (
								<img
									key={index}
									src={img}
									alt={`Car preview ${index + 1}`}
									className='w-full h-auto rounded-lg'
									style={{ flexShrink: 0 }}
								/>
							))}
						</div>
						<button
							onClick={handlePrevImage}
							className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75'
						>
							&#8592;
						</button>
						<button
							onClick={handleNextImage}
							className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75'
						>
							&#8594;
						</button>
					</div>
					<div
						className='flex gap-2 overflow-x-auto mt-4'
						ref={thumbnailContainerRef}
					>
						{car.images?.images_original_big.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={`Car thumbnail ${index + 1}`}
								className={`w-24 h-24 object-cover rounded cursor-pointer border ${
									currentImageIndex === index
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								onClick={() => setCurrentImageIndex(index)}
							/>
						))}
					</div>
				</div>

				{/* Правая часть - информация */}
				<div className='w-full md:w-1/3 p-4'>
					<h1 className='text-3xl font-bold mb-4'>{car.title.toUpperCase()}</h1>
					<p className='text-lg font-semibold text-gray-600 mb-2'>
						Стоимость автомобиля в Южной Корее:
					</p>
					<p className='text-4xl font-bold text-red-600 mb-4'>
						{car.lots?.original_price?.toLocaleString()} ₩
					</p>

					<button className='w-full bg-orange-500 text-white py-2 rounded-md mb-4 font-medium hover:bg-orange-700 transition text-sm'>
						Рассчитать автомобиль под ключ до Владивостока
					</button>

					<p className='text-lg font-semibold text-gray-600 mb-2'>
						Задать вопрос менеджеру:
					</p>
					<div className='flex gap-4 mb-6'>
						<a
							href='https://t.me/+HMBi9tn_wKw1OGVl'
							className='text-blue-500 text-2xl hover:text-blue-600 transition'
							aria-label='Telegram'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaTelegramPlane />
						</a>
						<a
							href='https://wa.me/821023297807'
							className='text-green-500 text-2xl hover:text-green-600 transition'
							aria-label='WhatsApp'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaWhatsapp />
						</a>
					</div>
					<button className='w-full bg-orange-500 text-white py-2 rounded-md mb-4 font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2'>
						Получить предложение
					</button>
					<button className='w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2'>
						Поделиться ссылкой
					</button>
				</div>
			</div>

			{/* Описание */}
			<div className='mt-6'>
				<h2 className='text-xl font-bold text-red-500 mb-4'>Описание авто</h2>
				<ul className='text-gray-700'>
					<li>
						<strong>Комплектация:</strong> {car.configuration || 'N/A'}
					</li>
					<li>
						<strong>Дата регистрации:</strong>{' '}
						{car.lots?.first_registration || 'N/A'}
					</li>
					<li>
						<strong>Пробег:</strong>{' '}
						{car.lots?.odometer_km?.toLocaleString() || 'N/A'} км
					</li>
					<li>
						<strong>Цвет:</strong> {car.color || 'N/A'}
					</li>
					<li>
						<strong>Объём двигателя:</strong>{' '}
						{car.lots?.engine_volume?.toLocaleString() || 'N/A'} cc
					</li>
					<li>
						<strong>КПП:</strong>{' '}
						{car.transmission_type === 'automatic'
							? 'Автоматическая'
							: 'Механическая'}
					</li>
					<li>
						<strong>Тип кузова:</strong> {car.body_type?.toUpperCase() || 'N/A'}
					</li>
					<li>
						<strong>Год:</strong> {car.year || 'N/A'}
					</li>
					<li>
						<strong>VIN:</strong> {car.vin || 'N/A'}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default CarDetails
