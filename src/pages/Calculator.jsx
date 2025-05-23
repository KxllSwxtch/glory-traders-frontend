import axios from 'axios'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import kgsCustomsTable from '../data/kgsCustomsTable'

const CalculatorPage = () => {
	const [carYear, setCarYear] = useState(0)
	const [carType, setCarType] = useState('')
	const [EURRUBRate, setEURRUBRate] = useState(0)
	const [rates, setRates] = useState({ KZT: 1, RUB: 1, KGS: 1, UZS: 1 })
	const [USDRates, setUSDRates] = useState({ KZT: 1, RUB: 1, KGS: 1, UZS: 1 })
	const [currency, setCurrency] = useState('KRW')
	const [price, setPrice] = useState('')
	const [age, setAge] = useState('')
	const [engineType, setEngineType] = useState('')
	const [engineVolume, setEngineVolume] = useState('')
	const [horsePower, setHorsePower] = useState('')
	// const [forPersonalUse, setForPersonalUse] = useState(true)
	const [result, setResult] = useState(null)
	const [country, setCountry] = useState('Россия')

	// Сбор за таможенное оформление
	const calculateCustomsProcessingFee = (localPrice) => {
		if (localPrice <= 200000) return 1067
		if (localPrice <= 450000) return 2134
		if (localPrice <= 1200000) return 4269
		if (localPrice <= 2700000) return 11746
		if (localPrice <= 4200000) return 16524
		if (localPrice <= 5500000) return 21344
		if (localPrice <= 7000000) return 27540
		return 30000 // Свыше 7 000 000 рублей
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

	// Таможенная пошлина
	const calculateCustomsFee = (carPriceEuro, engineVolume, EURRUBRate, age) => {
		if (country === 'Россия') {
			if (age === 'до 3 лет') {
				// Учитываем стоимость автомобиля в евро
				if (carPriceEuro <= 8500) {
					return Math.max(carPriceEuro * 0.54, engineVolume * 2.5) * EURRUBRate
				} else if (carPriceEuro <= 16700) {
					return Math.max(carPriceEuro * 0.48, engineVolume * 3.5) * EURRUBRate
				} else if (carPriceEuro <= 42300) {
					return Math.max(carPriceEuro * 0.48, engineVolume * 5.5) * EURRUBRate
				} else if (carPriceEuro <= 84500) {
					return Math.max(carPriceEuro * 0.48, engineVolume * 7.5) * EURRUBRate
				} else if (carPriceEuro <= 169000) {
					return Math.max(carPriceEuro * 0.48, engineVolume * 15) * EURRUBRate
				} else {
					return Math.max(carPriceEuro * 0.48, engineVolume * 20) * EURRUBRate
				}
			}

			if (age === 'от 3 до 5 лет') {
				if (engineVolume <= 1000) return engineVolume * 1.5 * EURRUBRate
				if (engineVolume <= 1500) return engineVolume * 1.7 * EURRUBRate
				if (engineVolume <= 1800) return engineVolume * 2.5 * EURRUBRate
				if (engineVolume <= 2300) return engineVolume * 2.7 * EURRUBRate
				if (engineVolume <= 3000) return engineVolume * 3 * EURRUBRate
				return engineVolume * 3.6 * EURRUBRate
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

		if (country === 'Кыргызстан') {
			// Смещаем год на 1 (например, для 2025 года берём данные для 2024 года)
			const adjustedYear = year - 1

			// Проверяем, есть ли корректный год в таблице
			if (!kgsCustomsTable[adjustedYear]) {
				return 'Год не найден в таблице'
			}

			// Получаем платежи для данного года
			const yearData = kgsCustomsTable[adjustedYear]

			// Определяем ближайший объём двигателя
			const volumes = Object.keys(yearData).map(Number)
			const closestVolume = volumes.reduce((prev, curr) =>
				Math.abs(curr - engineVolume) < Math.abs(prev - engineVolume)
					? curr
					: prev,
			)

			// Возвращаем таможенный платеж
			return yearData[closestVolume]
		}
	}

	// Акциз
	const calculateExciseFee = (engineVolume) => {
		const engineVolumeLiters = engineVolume / 1000 // Переводим в литры

		if (engineVolumeLiters <= 1.0) {
			return 0
		} else if (engineVolumeLiters > 1.0 && engineVolumeLiters <= 1.5) {
			return 61 * engineVolumeLiters * 100 // Примерное количество л.с.
		} else if (engineVolumeLiters > 1.5 && engineVolumeLiters <= 2.0) {
			return 583 * engineVolumeLiters * 100
		} else if (engineVolumeLiters > 2.0 && engineVolumeLiters <= 3.0) {
			return 955 * engineVolumeLiters * 100
		} else if (engineVolumeLiters > 3.0 && engineVolumeLiters <= 4.0) {
			return 1628 * engineVolumeLiters * 100
		} else if (engineVolumeLiters > 4.0 && engineVolumeLiters <= 5.0) {
			return 1685 * engineVolumeLiters * 100
		} else {
			return 1740 * engineVolumeLiters * 100
		}
	}

	// Расчёт стоимости
	const calculatePrice = () => {
		const basePrice = Number(price.replace(/,/g, ''))

		if (isNaN(basePrice) || basePrice === 0) {
			alert('Введите корректную цену!')
			return
		}

		// Конвертируем цену в рубли
		const localPrice = basePrice * rates['RUB']

		let duty = 0
		let customsFee = 0
		let recyclingFee = 0
		let logisticsKorea = 0
		let companyFeeKorea = 0
		let localExpensesMin = 0
		let localExpensesMax = 0
		let deliveryCostMin = 0
		let deliveryCostMax = 0
		let exciseFee = 0
		let customsProcessingFee = 0

		// Проверяем выбранную страну
		if (country === 'Россия') {
			// Логистика и расходы по Корее
			logisticsKorea = 1000 * USDRates['RUB']
			companyFeeKorea = 250 * USDRates['RUB']

			// Расходы по РФ
			localExpensesMin = 80000
			localExpensesMax = 120000

			// Логистика по РФ
			deliveryCostMin = 200000
			deliveryCostMax = 300000

			// Пошлина и утилизационный сбор
			recyclingFee = calculateRecyclingFee(engineVolume, age)

			// Сбор за таможенное оформление
			customsProcessingFee = calculateCustomsProcessingFee(localPrice)

			const carPriceEuro = localPrice / (EURRUBRate + 1.96)

			customsFee = calculateCustomsFee(
				carPriceEuro,
				parseInt(engineVolume),
				EURRUBRate + 1.99,
				age,
			)

			exciseFee = calculateExciseFee(engineVolume)

			// Общая стоимость (минимальная и максимальная)
			const totalMin =
				localPrice +
				duty +
				customsFee +
				recyclingFee +
				logisticsKorea +
				companyFeeKorea +
				localExpensesMin +
				deliveryCostMin +
				exciseFee +
				customsProcessingFee

			const totalMax =
				localPrice +
				duty +
				customsFee +
				recyclingFee +
				logisticsKorea +
				companyFeeKorea +
				localExpensesMax +
				deliveryCostMax +
				exciseFee +
				customsProcessingFee

			// Устанавливаем результат
			setResult({
				totalMin: totalMin.toLocaleString(),
				totalMax: totalMax.toLocaleString(),
				details: {
					priceInKorea: localPrice.toLocaleString(),
					duty: duty.toLocaleString(),
					customsFee: customsFee.toLocaleString(),
					customsProcessingFee: customsProcessingFee.toLocaleString(),
					recyclingFee: recyclingFee.toLocaleString(),
					logisticsKorea: logisticsKorea.toLocaleString(),
					companyFeeKorea: companyFeeKorea.toLocaleString(),
					localExpensesMin: localExpensesMin.toLocaleString(),
					localExpensesMax: localExpensesMax.toLocaleString(),
					deliveryCostMin: deliveryCostMin.toLocaleString(),
					deliveryCostMax: deliveryCostMax.toLocaleString(),
				},
			})
		} else if (country === 'Казахстан') {
			// Конвертируем цену в KZT
			const priceKZT = basePrice * rates['KZT']

			// Основные сборы
			const vat = priceKZT * 0.12 // НДС 12%
			const customsFee = priceKZT * 0.1 // Таможенная пошлина 10%
			const customsDeclarationFee = 25152 // Таможенная декларация
			const exciseFee = engineVolume > 3000 ? (engineVolume - 3000) * 100 : 0 // Акцизный сбор
			const gloryTradersFee = 450000 // Фиксированная плата
			const brokerFee = 100000 // Услуги брокера

			// Доставка + фрахт
			const deliveryFee = 2500 * USDRates['KZT']
			const frahtFee = 500 * USDRates['KZT']

			// Сертификация
			const sbktsFee = 60000

			// Полная стоимость
			const totalCostKZT =
				priceKZT +
				vat +
				customsFee +
				exciseFee +
				customsDeclarationFee +
				gloryTradersFee +
				brokerFee +
				deliveryFee +
				frahtFee +
				sbktsFee

			setResult({
				totalMin: totalCostKZT.toLocaleString(),
				totalMax: totalCostKZT.toLocaleString(),
				details: {
					priceInKZT: priceKZT.toLocaleString(),
					vat: vat.toLocaleString(),
					customsFee: customsFee.toLocaleString(),
					exciseFee: exciseFee.toLocaleString(),
					customsDeclarationFee: customsDeclarationFee.toLocaleString(),
					gloryTradersFee: gloryTradersFee.toLocaleString(),
					brokerFee: brokerFee.toLocaleString(),
					deliveryFee: deliveryFee.toLocaleString(),
					frahtFee: frahtFee.toLocaleString(),
					sbktsFee: sbktsFee.toLocaleString(),
				},
			})
		} else if (country === 'Кыргызстан') {
			// Конвертируем цену в KGS
			const priceKGS = basePrice * rates['KGS']

			// Получаем таможенный платеж
			const customsFee = calculateCustomsFee(engineVolume, EURRUBRate, carYear)

			// Основные сборы
			const vat = priceKGS * 0.12 // НДС 12%
			const exciseFee = engineVolume > 3000 ? (engineVolume - 3000) * 100 : 0 // Акцизный сбор
			const brokerFee = 100000 // Брокерские услуги

			// Доставка
			const deliveryFee =
				carType === 'sedan'
					? 2400 * USDRates['KGS']
					: carType === 'crossover'
					? 2500 * USDRates['KGS']
					: 2600 * USDRates['KGS']

			// Полная стоимость
			const totalCostKGS =
				priceKGS + customsFee + vat + exciseFee + brokerFee + deliveryFee

			setResult({
				totalMin: totalCostKGS.toLocaleString(),
				totalMax: totalCostKGS.toLocaleString(),
				details: {
					priceInKGS: priceKGS.toLocaleString(),
					customsFee: customsFee.toLocaleString(),
					vat: vat.toLocaleString(),
					exciseFee: exciseFee.toLocaleString(),
					brokerFee: brokerFee.toLocaleString(),
					deliveryFee: deliveryFee.toLocaleString(),
				},
			})
		} else {
			alert('Расчёт для выбранной страны пока недоступен.')
			return
		}
	}

	// Форматирование числа
	const formatNumber = (num) => {
		return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	// Обработка изменения цены
	const handlePriceChange = (e) => {
		setPrice(formatNumber(e.target.value))
	}

	// Получаем курс евро к рублю
	useEffect(() => {
		const fetchEURRUBRate = async () => {
			try {
				const baseUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`
				const response = await axios.get(baseUrl)

				if (response.status === 200 && response.data.eur) {
					setEURRUBRate(response.data.eur.rub)
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchEURRUBRate()
	}, [])

	// Получаем курс валют base currency USD
	useEffect(() => {
		const getUSDRates = async () => {
			try {
				const baseUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
				const response = await axios.get(baseUrl)

				if (response.status === 200 && response.data.usd) {
					setUSDRates({
						RUB: response.data.usd.rub,
						KZT: response.data.usd.kzt,
						KGS: response.data.usd.kgs,
						UZS: response.data.usd.uzs,
					})
				}
			} catch (error) {
				console.log(error)
			}
		}

		getUSDRates()
	}, [])

	// Получаем курсы валют
	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get(
					`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json`,
				)

				if (response.status === 200 && response.data.krw) {
					setRates({
						RUB: response.data.krw.rub,
						KZT: response.data.krw.kzt,
						KGS: response.data.krw.kgs,
						UZS: response.data.krw.uzs,
					})
				}
			} catch (error) {
				console.error('Ошибка загрузки курсов валют:', error)
			}
		}

		// Запуск fetchRates при изменении валюты
		fetchRates()
	}, [currency])

	// Автоматическая смена валюты при выборе страны
	useEffect(() => {
		switch (country) {
			case 'Россия':
				setCurrency('RUB')
				break
			case 'Казахстан':
				setCurrency('KZT')
				break
			case 'Кыргызстан':
				setCurrency('KGS')
				break
			case 'Узбекистан':
				setCurrency('UZS')
				break
			default:
				setCurrency('RUB')
		}
	}, [country])

	// Проверка, введена ли цена
	const isPriceEntered = !!price.replace(/\D+/g, '')

	// Функция для конвертации цены в выбранную валюту
	const convertPriceToCurrency = (price, currency) => {
		if (!price) return '0'
		const basePrice = Number(price.replace(/,/g, ''))
		const convertedValue = basePrice * rates[currency]
		return Math.floor(convertedValue).toLocaleString(undefined, {
			maximumFractionDigits: 2,
		})
	}

	// Функция для получения символа валюты
	const getCurrencySymbol = (currency) => {
		switch (currency) {
			case 'KZT':
				return '₸'
			case 'UZS':
				return 'сум'
			case 'RUB':
				return '₽'
			case 'KGS':
				return 'сом'
			default:
				return ''
		}
	}

	return (
		<>
			<Helmet>
				<title>Glory Traders | Калькулятор</title>
				{/* <link rel='canonical' href='https://www.glory-traders.org/calculator' /> */}
				<meta
					name='description'
					content='Рассчитайте стоимость доставки автомобиля из Кореи в СНГ с помощью калькулятора Glory Traders.'
				/>
				<meta name='robots' content='index, follow' />
			</Helmet>
			<div className='container mx-auto px-4 py-8 bg-white dark:bg-gray-900 shadow-md rounded-lg max-w-3xl'>
				<h1 className='text-3xl font-bold text-center mb-8 mt-6 text-gray-900 dark:text-white'>
					Расчет стоимости авто
				</h1>

				{/* Форма */}
				<div className='space-y-6'>
					{/* Выбор страны */}
					<div className='flex flex-col mb-6'>
						<label className='font-semibold mb-2 text-gray-800 dark:text-gray-300'>
							Выберите страну
						</label>
						<select
							value={country}
							onChange={(e) => {
								setCountry(e.target.value)
								setPrice('')
								setAge('')
								setEngineType('')
								setEngineVolume('')
								setCarYear(0)
								setCarType('')
								setResult(null)
							}}
							className='border p-2 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600'
						>
							<option value='Россия'>Россия</option>
							<option value='Казахстан'>Казахстан</option>
							<option value='Кыргызстан'>Кыргызстан</option>
							{/* <option value='Узбекистан'>Узбекистан</option> */}
						</select>
					</div>
					{/* Цена авто */}
					<div className='flex flex-col'>
						<label className='font-semibold mb-2 text-gray-800 dark:text-gray-300'>
							Цена авто
						</label>
						<p className='text-gray-600 dark:text-gray-400'>
							Примерная цена: {convertPriceToCurrency(price, currency)}{' '}
							{getCurrencySymbol(currency)}
						</p>
						<div className='flex'>
							<input
								type='text'
								value={price}
								onChange={handlePriceChange}
								placeholder='Введите цену в корейских вонах (например: 25000000)'
								className='border p-2 rounded-l w-full text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
							/>
						</div>
					</div>
					{/* Возраст авто */}
					{country !== 'Кыргызстан' && (
						<div>
							<label className='block text-lg font-medium mb-2 text-gray-800 dark:text-gray-300'>
								Возраст авто
							</label>
							<div className='flex flex-col gap-2'>
								<button
									className={`p-3 rounded-lg ${
										age === 'до 3 лет'
											? 'bg-orange-500 text-white'
											: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
									}`}
									onClick={() => setAge('до 3 лет')}
									disabled={!isPriceEntered}
								>
									До 3 лет
								</button>
								<button
									className={`p-3 rounded-lg ${
										age === 'От 3 до 5 лет'
											? 'bg-orange-500 text-white'
											: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
									}`}
									onClick={() => setAge('От 3 до 5 лет')}
									disabled={!isPriceEntered}
								>
									От 3 до 5 лет
								</button>
								<button
									className={`p-3 rounded-lg ${
										age === 'Старше 5 лет'
											? 'bg-orange-500 text-white'
											: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
									}`}
									onClick={() => setAge('Старше 5 лет')}
									disabled={!isPriceEntered}
								>
									Старше 5 лет
								</button>
							</div>
						</div>
					)}

					{/* Поля для Кыргызстана */}
					{country === 'Кыргызстан' && (
						<>
							{/* Год автомобиля */}
							<div className='flex flex-col'>
								<label className='font-semibold mb-2 text-gray-800 dark:text-gray-300'>
									Год автомобиля
								</label>
								<input
									type='number'
									value={carYear}
									onChange={(e) => setCarYear(e.target.value)}
									placeholder='Введите год выпуска авто (например: 2020)'
									className='border p-2 rounded w-full text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
								/>
							</div>

							{/* Тип кузова */}
							<div className='flex flex-col'>
								<label className='font-semibold mb-2 text-gray-800 dark:text-gray-300'>
									Тип кузова
								</label>
								<select
									value={carType}
									onChange={(e) => setCarType(e.target.value)}
									className='border p-2 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600'
								>
									<option value=''>Выберите тип кузова</option>
									<option value='Седан'>Седан</option>
									<option value='Кроссовер'>Кроссовер</option>
									<option value='Габаритный авто'>Габаритный авто</option>
								</select>
							</div>
						</>
					)}

					{/* Тип двигателя */}
					{country !== 'Кыргызстан' && (
						<div>
							<label className='block text-lg font-medium mb-2 text-gray-800 dark:text-gray-300'>
								Тип двигателя
							</label>
							<div className='flex flex-col gap-2'>
								<button
									className={`p-3 rounded-lg ${
										engineType === 'Бензин или дизель'
											? 'bg-orange-500 text-white'
											: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
									}`}
									onClick={() => setEngineType('Бензин или дизель')}
									disabled={!isPriceEntered || !age}
								>
									Бензин или дизель
								</button>
								<button
									className={`p-3 rounded-lg ${
										engineType === 'Электро'
											? 'bg-orange-500 text-white'
											: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
									}`}
									onClick={() => setEngineType('Электро')}
									disabled={!isPriceEntered || !age}
								>
									Электро
								</button>
							</div>
						</div>
					)}

					{/* Объем двигателя или Лошадиные силы */}
					{(engineType === 'Бензин или дизель' || country === 'Кыргызстан') && (
						<div>
							<label className='block text-lg font-medium mb-2 text-gray-800 dark:text-gray-300'>
								Объем двигателя (см³)
							</label>
							<input
								type='number'
								value={engineVolume}
								onChange={(e) => setEngineVolume(e.target.value)}
								placeholder='Введите объем'
								className='w-full p-3 border rounded-lg text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
							/>
						</div>
					)}

					{engineType === 'Электро' && (
						<div>
							<label className='block text-lg font-medium mb-2 text-gray-800 dark:text-gray-300'>
								Мощность (л.с.)
							</label>
							<input
								type='number'
								value={horsePower}
								onChange={(e) => setHorsePower(e.target.value)}
								placeholder='Введите мощность'
								className='w-full p-3 border rounded-lg text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
							/>
						</div>
					)}

					{/* Кнопка расчета */}
					{country === 'Кыргызстан' ? (
						<button
							onClick={calculatePrice}
							className='w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-700'
							disabled={
								!isPriceEntered || !carYear || !carType || !engineVolume
							}
						>
							Рассчитать стоимость
						</button>
					) : (
						<button
							onClick={calculatePrice}
							className='w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-700'
							disabled={!isPriceEntered || !age || !engineType}
						>
							Рассчитать стоимость
						</button>
					)}
				</div>

				{/* Результаты расчёта */}
				{result && (
					<div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8 shadow-md space-y-6'>
						{/* Итоговая цена */}
						<div className='bg-yellow-100 dark:bg-yellow-400 p-4 rounded-md'>
							<h2 className='text-xl font-bold text-gray-900 dark:text-black text-center'>
								Примерная цена с доставкой из Кореи
							</h2>
							<p className='text-3xl font-bold text-orange-600 mt-2 text-center'>
								{result.totalMax ? result.totalMin.split('.')[0] : '—'}{' '}
								{getCurrencySymbol(currency)}
							</p>
						</div>

						{/* Детали расчёта для выбранной страны */}
						{country === 'Россия' && (
							<div>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
									Расчёт для России
								</h3>
								<ul className='mt-4 space-y-2'>
									{/* Пошлина и сборы */}
									<li className='flex justify-between'>
										<span>Таможенный сбор</span>
										<span>
											{result.details.customsProcessingFee
												? result.details.customsProcessingFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Таможенный пошлина</span>
										<span>
											{result.details.customsFee
												? result.details.customsFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Утилизационный сбор</span>
										<span>
											{result.details.recyclingFee
												? result.details.recyclingFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>

									{/* Логистика по Корее */}
									<li className='flex justify-between'>
										<span>Логистика до Владивостока</span>
										<span>
											{result.details.logisticsKorea
												? result.details.logisticsKorea.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Комиссия компании в Корее</span>
										<span>
											{result.details.companyFeeKorea
												? result.details.companyFeeKorea.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>

									{/* Расходы по оформлению в РФ */}
									<li className='flex justify-between'>
										<span>
											Услуги брокера, СВХ, лаборатория, получение ЭСБГТС и ЭПТС
										</span>
										<span>
											{result.details.localExpensesMin} –{' '}
											{result.details.localExpensesMax}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>

									{/* Логистика по РФ */}
									<li className='flex justify-between'>
										<span>Логистика по РФ (Владивосток → Москва)</span>
										<span>
											{result.details.deliveryCostMin} –{' '}
											{result.details.deliveryCostMax}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
								</ul>
							</div>
						)}

						{/* Детали расчёта для Казахстана */}
						{country === 'Казахстан' && (
							<div>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
									Расчёт для Казахстана
								</h3>
								<ul className='mt-4 space-y-2'>
									<li className='flex justify-between'>
										<span>НДС</span>
										<span>
											{result.details.vat
												? result.details.vat.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Акцизный сбор</span>
										<span>
											{result.details.exciseFee
												? result.details.exciseFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Брокерские услуги</span>
										<span>
											{result.details.brokerFee
												? result.details.brokerFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Доставка и фрахт</span>
										<span>
											{result.details.deliveryFee
												? result.details.deliveryFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Сертификация (СБКТС)</span>
										<span>
											{result.details.sbktsFee
												? result.details.sbktsFee.split('.')[0]
												: '—'}{' '}
											{getCurrencySymbol(currency)}
										</span>
									</li>
								</ul>
							</div>
						)}

						{/* Детали расчёта для Кыргызстана */}
						{country === 'Кыргызстан' && (
							<div>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
									Расчёт для Кыргызстана
								</h3>
								<ul className='mt-4 space-y-2'>
									<li className='flex justify-between'>
										<span>Таможенный сбор</span>
										<span>
											{result.details.customsFee} {getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Сертификация</span>
										<span>
											{result.details.sbktsFee} {getCurrencySymbol(currency)}
										</span>
									</li>
									<li className='flex justify-between'>
										<span>Доставка</span>
										<span>
											{result.details.deliveryFee} {getCurrencySymbol(currency)}
										</span>
									</li>
								</ul>
							</div>
						)}

						{/* {country === 'Узбекистан' && (
						<div>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
								Расчёт для Узбекистана
							</h3>
							<ul className='mt-4 space-y-2'>
								<li className='flex justify-between'>
									<span>Таможенный сбор</span>
									<span>
										{result.details.customsFee} {getCurrencySymbol(currency)}
									</span>
								</li>
								<li className='flex justify-between'>
									<span>Брокерские услуги</span>
									<span>
										{result.details.brokerFee} {getCurrencySymbol(currency)}
									</span>
								</li>
								<li className='flex justify-between'>
									<span>Доставка и оформление</span>
									<span>
										{result.details.localExpensesMin} –{' '}
										{result.details.localExpensesMax}{' '}
										{getCurrencySymbol(currency)}
									</span>
								</li>
							</ul>
						</div>
					)} */}

						{/* Примечание */}
						<p className='text-sm text-gray-500 dark:text-gray-400 mt-6'>
							Цены варьируются в зависимости от курса валют и выбранной
							компании. Итоговая цена может изменяться.
						</p>
					</div>
				)}
			</div>
		</>
	)
}

export default CalculatorPage
