import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CarListItem = ({ car }) => {
	const [totalCarCost, setTotalCarCost] = useState(0)

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

	// Делаем расчёт по авто
	const carId = car.lots.lot_encar // ID автомобиля
	const price = car.lots.original_price / 10000 // Цена автомобиля в формате X,XXX
	const year = car.year
	const month = car.month
	const formattedDate = `01${month}${year.toString().substr(2, year.length)}`
	const volume = car.lots.engine_volume

	useEffect(() => {
		const url = `https://plugin-back-versusm.amvera.io/car-ab-korea/${carId}?price=${price}&date=${formattedDate}&volume=${volume}`

		const calculatePrice = async () => {
			const response = await axios.get(url)
			const data = response.data
			const result = data.result
			const grandTotal = result.price.grandTotal
			setTotalCarCost(grandTotal.toLocaleString().split('.')[0])
		}

		calculatePrice()
	}, [carId, price, year, month, formattedDate, volume])

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
						{totalCarCost} ₽
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
