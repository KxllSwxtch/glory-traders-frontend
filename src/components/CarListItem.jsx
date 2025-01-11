import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CarListItem = ({ car }) => {
	const [KRWRUBRate, setKRWRUBRate] = useState(0)
	const [EURRUBRate, setEURRUBRate] = useState(0)
	const [carCostDetails, setCarCostDetails] = useState({
		powerHP: 0,
		customsFee: 0,
		customsDuty: 0,
		recyclingFee: 0,
		totalCost: 0,
	})

	const fuelTypes = {
		gasoline: 'Бензин',
		diesel: 'Дизель',
		electric: 'Электрический',
		hybrid: 'Гибрид',
		gas: 'Газ',
		hydrogen: 'Водородный',
	}

	const transmissionTypes = {
		manual: 'Механическая',
		automatic: 'Автоматическая',
	}

	const imageSrc = car.images?.images_original_big?.find((img) =>
		img.includes('_001'),
	)

	// Получаем текущий queryParams из URL
	const location = useLocation()

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
	const calculateRecyclingFee = (engineVolume) => {
		return 20000 * 0.26 // Базовая ставка и коэффициент для физлиц
	}

	// Рассчитываем все сборы
	useEffect(() => {
		// Расчет таможенной пошлины
		const calculateCustomsDuty = (engineVolume) => {
			if (engineVolume <= 1000) return engineVolume * 1.5 * EURRUBRate // В евро
			if (engineVolume <= 1500) return engineVolume * 1.7 * EURRUBRate
			if (engineVolume <= 1800) return engineVolume * 2.5 * EURRUBRate
			if (engineVolume <= 2300) return engineVolume * 2.7 * EURRUBRate
			if (engineVolume <= 3000) return engineVolume * 3 * EURRUBRate
			return engineVolume * 3.6 * EURRUBRate
		}

		if (car) {
			const powerHP = calculateHorsePower(car.lots.engine_volume)
			const customsFee = calculateCustomsFee(
				car.lots.original_price * KRWRUBRate,
			)
			const recyclingFee = calculateRecyclingFee(car.lots.engine_volume)
			const customsDuty = calculateCustomsDuty(car.lots.engine_volume)

			const totalCost =
				car.lots.original_price * KRWRUBRate +
				customsFee +
				recyclingFee +
				customsDuty +
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

	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between w-full max-w-[400px] md:max-w-[400px] mx-auto dark:bg-gray-800 dark:border-gray-700'>
			{/* Изображение */}
			<div className='relative h-50 w-full'>
				{imageSrc ? (
					<img
						src={imageSrc}
						alt={car.title}
						className='object-cover h-full w-full'
					/>
				) : (
					<div className='bg-gray-200 flex items-center justify-center text-gray-500 italic h-full dark:bg-gray-700 dark:text-gray-400'>
						No image available
					</div>
				)}
			</div>

			{/* Содержимое карточки */}
			<div className='p-6 flex-grow flex flex-col'>
				<h2 className='text-xl font-bold text-gray-800 mb-3 text-center uppercase dark:text-white'>
					{car.manufacturer_name} {car.title}
				</h2>
				<ul className='text-sm text-gray-600 mb-6 space-y-1 dark:text-gray-300'>
					<li>
						<strong>Год выпуска:</strong> {car.year || 'N/A'} г.
					</li>
					<li>
						<strong>Пробег:</strong>{' '}
						{car.lots?.odometer_km?.toLocaleString() || 'N/A'} км
					</li>
					<li>
						<strong>Объём:</strong>{' '}
						{car.lots?.engine_volume
							? (car.lots.engine_volume / 1000).toFixed(1) + ' л'
							: 'N/A'}
					</li>
					<li>
						<strong>Тип топлива:</strong> {fuelTypes[car.fuel_type] || 'N/A'}
					</li>
					<li>
						<strong>Тип трансмиссии:</strong>{' '}
						{transmissionTypes[car.transmission_type] || 'N/A'}
					</li>
				</ul>
				<div className='mt-auto text-center'>
					<span className='text-sm'>Цена до ключ во Владивостоке</span>
					<p className='text-lg font-bold text-red-600 dark:text-red-500'>
						{/* {car.lots?.total_all_format?.toLocaleString() || 'N/A'} ₽ */}
						{carCostDetails.totalCost.toLocaleString().split('.')[0]} ₽
					</p>
					{/* Ссылка с передачей queryParams */}
					<Link
						to={{
							pathname: `/cars/${car.id}`,
							search: location.search, // Передаём queryParams
						}}
						target='_blank'
						className='mt-4 block bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-700'
					>
						Подробнее
					</Link>
				</div>
			</div>
		</div>
	)
}

CarListItem.propTypes = {
	car: PropTypes.object.isRequired,
}

export default CarListItem
