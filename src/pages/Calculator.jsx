import axios from 'axios'
import { useState, useEffect } from 'react'

const CalculatorPage = () => {
	const [EURRUBRate, setEURRUBRate] = useState(0)
	const [rates, setRates] = useState({ KZT: 1, RUB: 1, KGS: 1, UZS: 1 })
	const [USDRates, setUSDRates] = useState({ KZT: 1, RUB: 1, KGS: 1, UZS: 1 })
	const [currency, setCurrency] = useState('KRW')
	const [price, setPrice] = useState('')
	const [age, setAge] = useState('')
	const [engineType, setEngineType] = useState('')
	const [engineVolume, setEngineVolume] = useState('')
	const [horsePower, setHorsePower] = useState('')
	const [forPersonalUse, setForPersonalUse] = useState(true)
	const [result, setResult] = useState(null)
	const [country, setCountry] = useState('Россия')

	// Функция для расчёта таможенного сбора
	const calculateCustomsFee = (engineVolume, euroRate) => {
		let fee = 0
		if (engineVolume <= 1000) {
			fee = 1.5 * engineVolume
		} else if (engineVolume <= 1500) {
			fee = 1.7 * engineVolume
		} else if (engineVolume <= 1800) {
			fee = 2.5 * engineVolume
		} else if (engineVolume <= 3000) {
			fee = 3.2 * engineVolume
		} else {
			fee = 5.7 * engineVolume
		}
		return fee * euroRate // Конвертируем в рубли
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
			switch (age) {
				case 'Младше 3 лет':
					duty = localPrice * 0.48 // Пошлина — 48% от стоимости
					recyclingFee = 20000 * 1.34
					break

				case 'От 3 до 5 лет':
					duty = calculateCustomsFee(engineVolume, EURRUBRate) // Курс евро в рублях
					recyclingFee = 20000 * 2.66
					break

				case 'Старше 5 лет':
					duty = calculateCustomsFee(engineVolume, EURRUBRate) // Курс евро в рублях
					recyclingFee = 20000 * 3.5
					break

				default:
					alert('Выберите возраст авто!')
					return
			}
		} else {
			alert('Расчёт для выбранной страны пока недоступен.')
			return
		}

		// Общая стоимость (минимальная и максимальная)
		const totalMin =
			localPrice +
			duty +
			customsFee +
			recyclingFee +
			logisticsKorea +
			companyFeeKorea +
			localExpensesMin +
			deliveryCostMin

		const totalMax =
			localPrice +
			duty +
			customsFee +
			recyclingFee +
			logisticsKorea +
			companyFeeKorea +
			localExpensesMax +
			deliveryCostMax

		// Устанавливаем результат
		setResult({
			totalMin: totalMin.toLocaleString(),
			totalMax: totalMax.toLocaleString(),
			details: {
				priceInKorea: localPrice.toLocaleString(),
				duty: duty.toLocaleString(),
				customsFee: customsFee.toLocaleString(),
				recyclingFee: recyclingFee.toLocaleString(),
				logisticsKorea: logisticsKorea.toLocaleString(),
				companyFeeKorea: companyFeeKorea.toLocaleString(),
				localExpensesMin: localExpensesMin.toLocaleString(),
				localExpensesMax: localExpensesMax.toLocaleString(),
				deliveryCostMin: deliveryCostMin.toLocaleString(),
				deliveryCostMax: deliveryCostMax.toLocaleString(),
			},
		})
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
							setAge('')
							setEngineType('')
							setEngineVolume('')
							setResult(null)
						}}
						className='border p-2 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600'
					>
						<option value='Россия'>Россия</option>
						<option value='Казахстан'>Казахстан</option>
						<option value='Кыргызстан'>Кыргызстан</option>
						<option value='Узбекистан'>Узбекистан</option>
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
				<div>
					<label className='block text-lg font-medium mb-2 text-gray-800 dark:text-gray-300'>
						Возраст авто
					</label>
					<div className='flex flex-col gap-2'>
						<button
							className={`p-3 rounded-lg ${
								age === 'Младше 3 лет'
									? 'bg-orange-500 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
							}`}
							onClick={() => setAge('Младше 3 лет')}
							disabled={!isPriceEntered}
						>
							Младше 3 лет
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

				{/* Тип двигателя */}
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

				{/* Объем двигателя или Лошадиные силы */}
				{engineType === 'Бензин или дизель' && (
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

				{/* Цель ввоза */}
				<div className='flex items-center'>
					<input
						type='checkbox'
						checked={forPersonalUse}
						onChange={() => setForPersonalUse(!forPersonalUse)}
						className='w-5 h-5 text-orange-500 border-gray-300 dark:border-gray-600 rounded focus:ring-0'
						disabled={!isPriceEntered || !age || !engineType}
					/>
					<label className='ml-3 text-lg font-medium text-gray-800 dark:text-gray-300'>
						Для личного пользования
					</label>
				</div>

				{/* Кнопка расчета */}
				<button
					onClick={calculatePrice}
					className='w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-700'
					disabled={!isPriceEntered || !age || !engineType}
				>
					Рассчитать стоимость
				</button>
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
							{result.totalMin.split('.')[0]} {getCurrencySymbol(currency)}
						</p>
					</div>

					{/* Цена авто в Корее */}
					<div className='bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
							Цена авто в Корее
						</h3>
						<p className='text-2xl font-bold text-gray-900 dark:text-white mt-2'>
							{result.details.priceInKorea.split('.')[0]}{' '}
							{getCurrencySymbol(currency)}
						</p>
					</div>

					{/* Пошлина и сборы */}
					<div className='bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
							Пошлина и сборы на физлицо
						</h3>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							Ставки и коэффициенты от {new Date().toLocaleDateString()}
						</p>
						<ul className='mt-4 space-y-2'>
							<li className='flex justify-between'>
								<span>Пошлина</span>
								<span>
									{result.details.duty} {getCurrencySymbol(currency)}
								</span>
							</li>
							<li className='flex justify-between'>
								<span>Таможенный сбор</span>
								<span>
									{result.details.customsFee} {getCurrencySymbol(currency)}
								</span>
							</li>
							<li className='flex justify-between'>
								<span>Утилизационный сбор</span>
								<span>
									{result.details.recyclingFee} {getCurrencySymbol(currency)}
								</span>
							</li>
						</ul>
					</div>

					{/* Доставка и оформление */}
					<div className='bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
							Доставка и оформление
						</h3>
						<ul className='mt-4 space-y-2'>
							<li className='flex justify-between'>
								<span>Расходы по Корее и доставка</span>
								<span>
									{result.details.localExpensesMin}{' '}
									{getCurrencySymbol(currency)} –{' '}
									{result.details.localExpensesMax}{' '}
									{getCurrencySymbol(currency)}
								</span>
							</li>
							<li className='flex justify-between'>
								<span>Расходы по оформлению</span>
								<span>
									{result.details.deliveryCostMin} {getCurrencySymbol(currency)}{' '}
									– {result.details.deliveryCostMax}{' '}
									{getCurrencySymbol(currency)}
								</span>
							</li>
						</ul>
					</div>

					{/* Примечание */}
					<p className='text-sm text-gray-500 dark:text-gray-400 mt-6'>
						Цены варьируются в зависимости от курса валют и выбранной компании.
						Итоговая цена может изменяться.
					</p>
				</div>
			)}
		</div>
	)
}

export default CalculatorPage
