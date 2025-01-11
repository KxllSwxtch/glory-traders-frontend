import { animated, useSpring } from '@react-spring/web'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { useEffect, useState, useRef } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import { fetchCarsAsync } from '../redux/slices/carsSlice'
import colors from '../data/colors'
import { Loader, Modal } from '../components'
import 'react-photo-view/dist/react-photo-view.css'
import axios from 'axios'

const CarDetails = () => {
	const { id } = useParams()
	const location = useLocation()
	const dispatch = useDispatch()
	const thumbnailContainerRef = useRef(null)
	const [showNotification, setShowNotification] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [result, setResult] = useState({})
	const [isDetailsVisible, setIsDetailsVisible] = useState(false)
	const [USDKRWRate, setUSDKRWRate] = useState(0)
	const [USDRUBRate, setUSDRUBRate] = useState(0)

	// Анимация для появления/исчезновения блока
	const animationProps = useSpring({
		from: { height: 0, opacity: 0 },
		to: {
			height: isDetailsVisible ? 'auto' : 0,
			opacity: isDetailsVisible ? 1 : 0,
		},
		config: { tension: 400, friction: 40 },
	})

	// Данные из стора
	const { cars, loading, error, currentPage } = useSelector(
		(state) => state.cars,
	)

	// Поиск автомобиля в сторе
	const car = cars.find((car) => car.id === Number(id))

	// Текущее изображение для карусели
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const handleShare = async () => {
		const url = window.location.href

		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(url)
				setShowNotification('Ссылка скопирована в буфер обмена!')
			} catch (error) {
				setShowNotification('Ошибка при копировании ссылки.')
			}
		} else {
			// Фолбэк для старых браузеров
			const textArea = document.createElement('textarea')
			textArea.value = url
			document.body.appendChild(textArea)
			textArea.select()
			try {
				document.execCommand('copy')
				setShowNotification('Ссылка скопирована в буфер обмена!')
			} catch (error) {
				setShowNotification('Ошибка при копировании ссылки.')
			}
			document.body.removeChild(textArea)
		}

		// Убираем уведомление через 3 секунды
		setTimeout(() => setShowNotification(''), 3000)
	}

	// Запрос данных при первом рендере, если автомобиля нет в сторе
	useEffect(() => {
		if (!car) {
			const searchParams = new URLSearchParams(location.search)
			const manufacturerId = searchParams.get('manufacturerId')
			const modelId = searchParams.get('modelId') || ''
			const generationId = searchParams.get('generationId') || ''
			const colorsId = searchParams.get('colorsId') || ''
			const fuelId = searchParams.get('fuelId') || ''
			const transmissionId = searchParams.get('transmissionId') || ''
			const mountOneId = searchParams.get('mountOneId') || ''
			const mountTwoId = searchParams.get('mountTwoId') || ''
			const yearOneId = searchParams.get('yearOneId') || ''
			const yearTwoId = searchParams.get('yearTwoId') || ''
			const mileageOneId = searchParams.get('mileageOneId') || ''
			const mileageTwoId = searchParams.get('mileageTwoId') || ''

			dispatch(
				fetchCarsAsync({
					page: currentPage || 1,
					filters: {
						manufacturerId,
						modelId,
						generationId,
						colorsId,
						fuelId,
						transmissionId,
						mountOneId,
						mountTwoId,
						yearOneId,
						yearTwoId,
						mileageOneId,
						mileageTwoId,
					},
				}),
			)
		}
	}, [car, dispatch, location.search, currentPage, id])

	// Делаем расчёт по авто
	const carId = car?.lots.lot_encar // ID автомобиля
	const price = car?.lots.original_price / 10000 // Цена автомобиля в формате X,XXX
	const year = car?.year
	const month = car?.month
	const formattedDate = `01${month}${year?.toString().substr(2, year.length)}`
	const volume = car?.lots.engine_volume

	useEffect(() => {
		const url = `https://plugin-back-versusm.amvera.io/car-ab-korea/${carId}?price=${price}&date=${formattedDate}&volume=${volume}`

		const calculatePrice = async () => {
			const response = await axios.get(url)
			const data = response.data
			const result = data.result
			setResult(result)
		}

		calculatePrice()
	}, [carId, price, year, month, formattedDate, volume])

	// Устанавливаем первый индекс изображения при изменении автомобиля
	useEffect(() => {
		if (car && car.images?.images_original_big?.length > 1) {
			setCurrentImageIndex(0)
		}
	}, [car])

	// Получаем курс воны к рублю
	// useEffect(() => {
	// 	const getRates = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json',
	// 			)
	// 			const data = response.data
	// 			const krw = data.krw

	// 			setKRWRUBRate(krw.rub)
	// 		} catch (error) {
	// 			console.error(error)
	// 		}
	// 	}

	// 	getRates()
	// }, [])

	// Получаем курс доллара к воне
	// Плюс курс доллара к рублю
	useEffect(() => {
		const getRates = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
				)
				const data = response.data
				const usd = data.usd
				setUSDKRWRate(usd.krw)
				setUSDRUBRate(usd.rub)
			} catch (error) {
				console.error(error)
			}
		}

		getRates()
	}, [])

	// Авто-прокрутка миниатюр при смене изображения
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

	// Обработка ошибок и загрузки
	if (error)
		return <p className='text-red-500'>Ошибка загрузки данных: {error}</p>
	if (loading) return <Loader />
	if (!car) return <p>Данные автомобиля не найдены.</p>

	// Переключение изображений
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

	// Выводим цвет автомобиля в текст
	const carColor = colors.filter((item) => item.id === car.color)[0].name

	// Форматирование цены под ключ
	// 1. Конвертация из цены в Корее в доллары
	// 2. Конвертация в рубли
	// 3. Прибавляем 110,000 рублей - доставка до Владивостока
	// 4. Прибавляем 120,000 рублей - брокер
	// 5. Прибавляем таможня + утильсбор с объекта result
	const formattedPrice = Math.round(
		(car.lots?.original_price / USDKRWRate) * (USDRUBRate + 0.02) +
			110000 +
			120000 +
			(result?.price?.russian?.duty?.rub -
				result?.price?.russian?.svhAndExpertise?.rub -
				result?.price?.russian?.sbkts?.rub -
				result?.price?.russian?.registration?.rub) +
			result?.price?.russian?.recyclingFee?.rub,
	)
		.toLocaleString()
		.split('.')[0]

	return (
		<div className='container mx-auto p-4 dark:bg-gray-900 dark:text-white'>
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
								<PhotoProvider key={index}>
									<PhotoView src={img}>
										<img
											src={img}
											alt={`Car preview ${index + 1}`}
											className='w-full h-auto rounded-lg'
										/>
									</PhotoView>
								</PhotoProvider>
							))}
						</div>
						<button
							onClick={handlePrevImage}
							className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 dark:bg-gray-800 dark:hover:bg-gray-700'
						>
							&#8592;
						</button>
						<button
							onClick={handleNextImage}
							className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 dark:bg-gray-800 dark:hover:bg-gray-700'
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
										? 'border-red-500 dark:border-red-400'
										: 'border-gray-300 dark:border-gray-600'
								}`}
								onClick={() => setCurrentImageIndex(index)}
							/>
						))}
					</div>

					{/* Описание */}
					<div className='mt-6'>
						<h2 className='text-xl font-bold text-red-500 mb-4 dark:text-red-400'>
							Описание авто
						</h2>
						<ul className='text-gray-700 dark:text-gray-300'>
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
								<strong>Цвет:</strong> {carColor || 'N/A'}
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
								<strong>Тип кузова:</strong>{' '}
								{car.body_type?.toUpperCase() || 'N/A'}
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

				{/* Правая часть - информация */}
				<div className='w-full md:w-1/3 p-4'>
					<h1 className='text-3xl font-bold mb-4 dark:text-orange-400'>
						{car.manufacturer_name} {car.title.toUpperCase()}
					</h1>
					<p className='text-lg font-semibold text-gray-600 mb-2 dark:text-gray-300'>
						Цена под ключ во Владивостоке
					</p>
					<p className='text-4xl font-bold text-red-600 mb-4 dark:text-red-400'>
						{/* {car.lots?.total_all_format?.toLocaleString()} ₽ */}
						{formattedPrice} ₽
					</p>

					<button
						onClick={() => setIsDetailsVisible((prev) => !prev)}
						className='w-full bg-orange-500 text-white py-2 rounded-md mb-4 font-medium hover:bg-orange-700 transition text-sm dark:bg-orange-600 dark:hover:bg-orange-700'
					>
						{isDetailsVisible
							? 'Скрыть детали расчёта'
							: 'Показать детали расчёта'}
					</button>

					{/* Детализация расчёта */}
					{isDetailsVisible && (
						<animated.div
							style={{ ...animationProps, overflow: 'hidden' }}
							className={'overflow-hidden will-change-transform'}
						>
							<div className='bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800'>
								<h3 className='text-lg font-bold mb-2 text-black dark:text-white'>
									Детализация Расчёта
								</h3>

								{/* Логистика с Кореи до Владивостока */}
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
									Логистика с Кореи до Владивостока:
								</p>
								<ul className='list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300'>
									<li>1000 $ (может меняться)</li>
									<li>Комиссия компании: 250 $</li>
								</ul>

								{/* Расходы по РФ */}
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
									Расходы по РФ:
								</p>
								<ul className='list-disc pl-6 mb-2 text-gray-700 dark:text-gray-300'>
									<li>Услуги брокера</li>
									<li>Выгрузка</li>
									<li>СВХ (в порту)</li>
									<li>Лаборатория</li>
									<li>Получение ЭСБГТС и ЭПТС</li>
								</ul>
								<p className='font-bold text-orange-500 dark:text-orange-400 mb-4'>
									Итого: от 80 000 до 120 000 ₽
								</p>

								{/* Логистика с Владивостока до Москвы */}
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-2 mt-6'>
									Логистика с Владивостока до Москвы:
								</p>
								<p className='font-bold text-orange-500 dark:text-orange-400'>
									от 200 000 до 300 000 ₽
								</p>

								{/* Таможенная ставка и утильсбор */}
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-2 mt-6'>
									Таможенная ставка
								</p>
								<p className='font-bold text-orange-500 dark:text-orange-400'>
									{result?.price.russian.duty?.rub
										?.toLocaleString()
										.split('.')[0] || 'N/A'}{' '}
									₽
								</p>
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-2 mt-6'>
									Утильсбор
								</p>
								<p className='font-bold text-orange-500 dark:text-orange-400'>
									{result?.price.russian.recyclingFee?.rub
										?.toLocaleString()
										.split('.')[0] || 'N/A'}{' '}
									₽
								</p>
							</div>
						</animated.div>
					)}

					<p className='text-md font-normal text-gray-600 mb-6 dark:text-gray-300'>
						Стоимость автомобиля в Южной Корее:{' '}
						<span className='font-bold text-orange-600'>
							{car.lots?.original_price?.toLocaleString()} ₩
						</span>
					</p>

					<p className='text-lg font-semibold text-gray-600 mb-2 dark:text-gray-300'>
						Задать вопрос менеджеру:
					</p>
					<div className='flex gap-4 mb-6'>
						<a
							href='https://t.me/GLORY_TRADERS'
							className='text-blue-500 text-2xl hover:text-blue-600 transition dark:text-blue-400 dark:hover:text-blue-500'
							aria-label='Telegram'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaTelegramPlane />
						</a>
						<a
							href='https://wa.me/821023297807'
							className='text-green-500 text-2xl hover:text-green-600 transition dark:text-green-400 dark:hover:text-green-500'
							aria-label='WhatsApp'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaWhatsapp />
						</a>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className='w-full bg-orange-500 text-white py-2 rounded-md mb-4 font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2 dark:bg-orange-600 dark:hover:bg-orange-700'
					>
						Получить предложение
					</button>
					<button
						onClick={handleShare}
						className='w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2 dark:bg-orange-600 dark:hover:bg-orange-700'
					>
						Поделиться ссылкой
					</button>
					<Link
						to={`http://fem.encar.com/cars/detail/${car.lot_encar}`}
						target='_blank'
						className='mt-4 w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition flex items-center justify-center gap-2 dark:bg-red-600 dark:hover:bg-red-700'
					>
						Посмотреть авто на сайте Encar
					</Link>
				</div>
			</div>

			{showNotification && (
				<div
					className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md text-center dark:bg-green-600 transition-opacity duration-500 ${
						showNotification ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{showNotification}
				</div>
			)}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	)
}

export default CarDetails
