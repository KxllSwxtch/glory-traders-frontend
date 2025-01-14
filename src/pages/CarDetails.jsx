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
	const [KRWRUBRate, setKRWRUBRate] = useState(0)
	const [EURRUBRate, setEURRUBRate] = useState(0)
	const [carCostDetails, setCarCostDetails] = useState({
		powerHP: 0,
		customsFee: 0,
		customsDuty: 0,
		recyclingFee: 0,
		totalCost: 0,
	})

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

	// Устанавливаем первый индекс изображения при изменении автомобиля
	useEffect(() => {
		if (car && car.images?.images_original_big?.length > 1) {
			setCurrentImageIndex(0)
		}
	}, [car])

	// Получаем курс воны к рублю
	useEffect(() => {
		const getRates = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json',
				)
				const data = response.data
				const krw = data.krw

				setKRWRUBRate(krw.rub)
			} catch (error) {
				console.error(error)
			}
		}

		getRates()
	}, [])

	// Получаем курс евро к рублю
	useEffect(() => {
		const getRates = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json',
				)
				const data = response.data
				const eur = data.eur

				setEURRUBRate(eur.rub)
			} catch (error) {
				console.error(error)
			}
		}

		getRates()
	}, [])

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

	// Формула для расчета лошадиных сил
	const calculateHorsePower = (engineVolume) => {
		const kW = engineVolume / 7.6
		return Math.round(kW * 1.36) // Перевод в л.с.
	}

	// Расчет таможенного сбора
	const calculateCustomsFee = (carPriceRUB) => {
		if (carPriceRUB <= 200000) return 1067
		if (carPriceRUB <= 450000) return 2134
		if (carPriceRUB <= 1200000) return 4269
		if (carPriceRUB <= 2700000) return 11746
		if (carPriceRUB <= 4200000) return 16524
		if (carPriceRUB <= 5500000) return 21344
		if (carPriceRUB <= 7000000) return 27540
		return 30000
	}

	// Расчет утилизационного сбора
	const calculateRecyclingFee = (engineVolume, age) => {
		const baseRate = 20000 // Базовая ставка

		if (age === 'до 3 лет') {
			if (engineVolume <= 1000) return baseRate * 0.17
			if (engineVolume <= 2000) return baseRate * 0.17
			if (engineVolume <= 3000) return baseRate * 0.17
			if (engineVolume <= 3500) return baseRate * 89.73
			return baseRate * 114.26
		} else {
			// Старше 3 лет
			if (engineVolume <= 1000) return baseRate * 0.26
			if (engineVolume <= 2000) return baseRate * 0.26
			if (engineVolume <= 3000) return baseRate * 0.26
			if (engineVolume <= 3500) return baseRate * 137.36
			return baseRate * 150.2
		}
	}

	// Рассчитываем все сборы
	useEffect(() => {
		// Расчет таможенной пошлины
		const calculateCustomsDuty = (engineVolume, age) => {
			if (age === 'до 3 лет') {
				if (engineVolume <= 1000) return engineVolume * 1.5 * EURRUBRate
				if (engineVolume <= 1500) return engineVolume * 1.7 * EURRUBRate
				if (engineVolume <= 1800) return engineVolume * 2.5 * EURRUBRate
				if (engineVolume <= 2300) return engineVolume * 2.7 * EURRUBRate
				if (engineVolume <= 3000) return engineVolume * 3 * EURRUBRate
				return engineVolume * 3.6 * EURRUBRate
			}

			if (age === 'от 3 до 5 лет') {
				if (engineVolume <= 1000) return engineVolume * 3 * EURRUBRate
				if (engineVolume <= 1500) return engineVolume * 3.2 * EURRUBRate
				if (engineVolume <= 1800) return engineVolume * 3.5 * EURRUBRate
				if (engineVolume <= 2300) return engineVolume * 4.8 * EURRUBRate
				if (engineVolume <= 3000) return engineVolume * 5 * EURRUBRate
				return engineVolume * 5.7 * EURRUBRate
			}

			if (age === 'старше 5 лет') {
				if (engineVolume <= 1000) return engineVolume * 3 * EURRUBRate
				if (engineVolume <= 1500) return engineVolume * 3.2 * EURRUBRate
				if (engineVolume <= 1800) return engineVolume * 3.5 * EURRUBRate
				if (engineVolume <= 2300) return engineVolume * 4.8 * EURRUBRate
				if (engineVolume <= 3000) return engineVolume * 5 * EURRUBRate
				return engineVolume * 5.7 * EURRUBRate
			}
		}

		const calculateExciseTax = (powerHP) => {
			if (powerHP <= 90) return 0
			if (powerHP <= 150) return powerHP * 61
			if (powerHP <= 200) return powerHP * 583
			if (powerHP <= 300) return powerHP * 955
			if (powerHP <= 400) return powerHP * 1628
			if (powerHP <= 500) return powerHP * 1685
			return powerHP * 1740
		}

		const getCarAgeCategory = (registrationDate) => {
			if (!registrationDate) return null

			const today = new Date()
			const registration = new Date(registrationDate)

			let age = today.getFullYear() - registration.getFullYear()

			// Если текущий месяц и день еще не достигли даты регистрации, уменьшаем возраст на 1 год
			if (
				today.getMonth() < registration.getMonth() ||
				(today.getMonth() === registration.getMonth() &&
					today.getDate() < registration.getDate())
			) {
				age--
			}

			// Возвращаем категорию возраста
			if (age < 3) {
				return 'до 3 лет'
			} else if (age >= 3 && age <= 5) {
				return 'от 3 до 5 лет'
			} else {
				return 'старше 5 лет'
			}
		}

		if (car) {
			const carAge = getCarAgeCategory(car.lots.first_registration)

			const powerHP = calculateHorsePower(car.lots.engine_volume)
			const customsFee = calculateCustomsFee(
				car.lots.original_price * KRWRUBRate,
			)
			const recyclingFee = calculateRecyclingFee(car.lots.engine_volume, carAge)
			const customsDuty = calculateCustomsDuty(car.lots.engine_volume, carAge)
			const exciseFee = calculateExciseTax(powerHP)

			const totalCost =
				car.lots.original_price * KRWRUBRate +
				customsFee +
				recyclingFee +
				customsDuty +
				exciseFee +
				110000 + // Логистика до Владивостока
				120000 + // Брокерские услуги
				440000 * KRWRUBRate +
				92279

			setCarCostDetails({
				powerHP,
				customsFee,
				customsDuty,
				recyclingFee,
				totalCost,
			})
		}
	}, [car, KRWRUBRate, EURRUBRate])

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

	const formatRegistrationDate = (dateString) => {
		if (!dateString) return 'N/A'

		// Разбиваем строку даты на день, месяц и год
		const [day, month, year] = dateString.split('.')

		// Массив месяцев
		const months = [
			'Января',
			'Февраля',
			'Марта',
			'Апреля',
			'Мая',
			'Июня',
			'Июля',
			'Августа',
			'Сентября',
			'Октября',
			'Ноября',
			'Декабря',
		]

		// Форматируем дату
		return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year} года`
	}

	// Выводим цвет автомобиля в текст
	const carColor = colors.filter((item) => item.id === car.color)[0].name

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
					<div className='mt-6 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800 w-full'>
						<h2 className='text-2xl font-bold text-orange-500 mb-4 dark:text-orange-400'>
							Описание авто
						</h2>
						<div className='grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300'>
							<div>
								<strong>Бренд:</strong> {car.manufacturer_name || 'N/A'}
							</div>
							<div>
								<strong>Модель:</strong> {car.title.toUpperCase() || 'N/A'}
							</div>
							<div>
								<strong>Комплектация:</strong> {car.generation_name || 'N/A'}
							</div>
							<div>
								<strong>Дата регистрации:</strong>{' '}
								{formatRegistrationDate(car.lots?.first_registration) || 'N/A'}
							</div>
							<div>
								<strong>Пробег:</strong>{' '}
								{car.lots?.odometer_km?.toLocaleString() || 'N/A'} км
							</div>
							<div>
								<strong>Цвет:</strong> {carColor || 'N/A'}
							</div>
							<div>
								<strong>Объём двигателя:</strong>{' '}
								{car.lots?.engine_volume?.toLocaleString() || 'N/A'} cc
							</div>
							<div>
								<strong>КПП:</strong>{' '}
								{car.transmission_type === 'automatic'
									? 'Автоматическая'
									: 'Механическая'}
							</div>
							<div>
								<strong>Тип кузова:</strong>{' '}
								{car.body_type?.toUpperCase() || 'N/A'}
							</div>
							<div>
								<strong>Год:</strong> {car.year || 'N/A'}
							</div>
							<div>
								<strong>VIN:</strong> {car.vin || 'N/A'}
							</div>
						</div>
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
					<p className='text-sm text-gray-500 mb-4 dark:text-gray-400'>
						Цена может варьироваться в зависимости от курса. Для уточнения
						пишите на
						<a
							href='https://wa.me/821023297807'
							target='_blank'
							rel='noopener noreferrer'
							className='text-green-600 font-bold hover:underline flex items-center gap-1'
						>
							<FaWhatsapp className='text-lg' />
							WhatsApp
						</a>
					</p>
					<p className='text-4xl font-bold text-red-600 mb-4 dark:text-red-400'>
						{/* {car.lots?.total_all_format?.toLocaleString()} ₽ */}
						{carCostDetails.totalCost.toLocaleString().split('.')[0]} ₽
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
									{(carCostDetails.customsDuty + carCostDetails.customsFee)
										.toLocaleString()
										.split('.')[0] || 'N/A'}{' '}
									₽
								</p>
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-2 mt-6'>
									Утильсбор
								</p>
								<p className='font-bold text-orange-500 dark:text-orange-400'>
									{carCostDetails.recyclingFee.toLocaleString().split('.')[0]} ₽
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
