import axios from 'axios'
import { useState, useEffect } from 'react'

const CalculatorPage = () => {
	const [rates, setRates] = useState({ USD: 1, EUR: 1, KRW: 1, RUB: 1 })
	const [currency, setCurrency] = useState('KRW')
	const [price, setPrice] = useState('')
	const [age, setAge] = useState('')
	const [engineType, setEngineType] = useState('')
	const [engineVolume, setEngineVolume] = useState('')
	const [horsePower, setHorsePower] = useState('')
	const [forPersonalUse, setForPersonalUse] = useState(true)
	const [result, setResult] = useState(null)

	// Расчёт стоимости
	const calculatePrice = () => {
		// Удаляем запятые и приводим к числу
		const basePrice = Number(price.replace(/,/g, ''))

		if (isNaN(basePrice) || basePrice === 0) {
			alert('Введите корректную цену!')
			return
		}

		// Конвертируем цену в рубли
		const rubPrice = basePrice * rates[currency]

		// Пошлины и сборы
		const duty = rubPrice * 0.1 // 10% пошлина
		const customsFee = 11746 // Фиксированный таможенный сбор
		const recyclingFee = forPersonalUse ? 3400 : 5200 // Утилизационный сбор

		// Доставка и оформление
		const deliveryCost = 300000 // Средняя стоимость доставки
		const paperworkCost = 80000 // Средняя стоимость оформления
		const companyFee = 50000 // Комиссия компании

		// Общая стоимость
		const totalPrice =
			rubPrice +
			duty +
			customsFee +
			recyclingFee +
			deliveryCost +
			paperworkCost +
			companyFee

		// Устанавливаем результат
		setResult({
			totalPrice: totalPrice.toLocaleString(),
			details: {
				priceInKorea: rubPrice.toLocaleString(),
				duty: duty.toLocaleString(),
				customsFee: customsFee.toLocaleString(),
				recyclingFee: recyclingFee.toLocaleString(),
				deliveryCost: deliveryCost.toLocaleString(),
				paperworkCost: paperworkCost.toLocaleString(),
				companyFee: companyFee.toLocaleString(),
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

	// Конвертация в рубли
	const convertToRub = (value, currency) => {
		if (!value) return 0
		const rate = rates[currency]
		return Math.round(value.replace(/\D+/gi, '') * rate).toLocaleString()
	}

	// Получение курсов валют из Центробанка РФ
	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get(
					'https://www.cbr-xml-daily.ru/daily_json.js',
				)
				const data = response.data.Valute

				setRates({
					USD: data.USD.Value,
					EUR: data.EUR.Value,
					KRW: data.KRW.Value / 1000,
					RUB: 1,
				})
			} catch (error) {
				console.error('Ошибка загрузки курсов валют:', error)
			}
		}
		fetchRates()
	}, [])

	// Проверка, введена ли цена
	const isPriceEntered = !!price.replace(/\D+/g, '')

	return (
		<div className='container mx-auto px-4 py-8 bg-white dark:bg-gray-900 shadow-md rounded-lg max-w-3xl'>
			<h1 className='text-3xl font-bold text-center mb-8 mt-6 text-gray-900 dark:text-white'>
				Расчет стоимости авто
			</h1>

			{/* Форма */}
			<div className='space-y-6'>
				{/* Цена авто */}
				<div className='flex flex-col'>
					<label className='font-semibold mb-2 text-gray-800 dark:text-gray-300'>
						Цена авто
					</label>
					<p className='text-gray-600 dark:text-gray-400'>
						Примерная цена в рублях: {convertToRub(price, currency)} ₽
					</p>
					<div className='flex'>
						<input
							type='text'
							value={price}
							onChange={handlePriceChange}
							placeholder='Введите цену'
							className='border p-2 rounded-l w-full text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>
						<select
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
							className='border p-2 rounded-r bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600'
						>
							<option value='KRW'>₩ Воны</option>
							<option value='USD'>$ Доллары</option>
							<option value='EUR'>€ Евро</option>
						</select>
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
								age === 'Младше 3'
									? 'bg-orange-500 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
							}`}
							onClick={() => setAge('Младше 3')}
							disabled={!isPriceEntered}
						>
							Младше 3
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
								age === 'Старше 5'
									? 'bg-orange-500 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
							}`}
							onClick={() => setAge('Старше 5')}
							disabled={!isPriceEntered}
						>
							Старше 5
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

			{/* Результаты расчета */}
			{result && (
				<div className='bg-gray-100 p-4 rounded-lg mt-8'>
					<h2 className='text-xl font-bold text-orange-600 mb-4'>
						Итоговая цена с доставкой из Кореи: ~{result.totalPrice} ₽
					</h2>
					<span>
						В связи с изменением курса возможны изменения в цене. Для уточнения
						звоните или пишите нам на WhatsApp{'    '}
						<a
							href='https://wa.me/821023297807'
							className='text-gray-600 hover:text-gray-800 transition inline-block'
							target='__blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/733/733585.png' // WhatsApp
								alt='WhatsApp'
								className='h-6 w-6'
							/>
						</a>
					</span>

					<br />
					<br />

					<h2 className='font-bold'>Детали Расчёта</h2>
					<p>Цена авто в Корее: {result.details.priceInKorea} ₽</p>
					<p>Пошлина: {result.details.duty} ₽</p>
					<p>Таможенный сбор: {result.details.customsFee} ₽</p>
					<p>Утилизационный сбор: {result.details.recyclingFee} ₽</p>
					<p>Расходы на доставку: {result.details.deliveryCost} ₽</p>
					<p>Расходы на оформление: {result.details.paperworkCost} ₽</p>
					<p>Комиссия компании: {result.details.companyFee} ₽</p>
				</div>
			)}
		</div>
	)
}

export default CalculatorPage
