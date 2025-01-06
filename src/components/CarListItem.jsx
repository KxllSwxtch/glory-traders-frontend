import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const CarListItem = ({ car }) => {
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

	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between w-full max-w-[300px] md:max-w-[400px] mx-auto'>
			{/* Изображение */}
			<div className='relative h-50 w-full'>
				{imageSrc ? (
					<img
						src={imageSrc}
						alt={car.title}
						className='object-cover h-full w-full'
					/>
				) : (
					<div className='bg-gray-200 flex items-center justify-center text-gray-500 italic h-full'>
						No image available
					</div>
				)}
			</div>

			{/* Содержимое карточки */}
			<div className='p-6 flex-grow flex flex-col'>
				<h2 className='text-xl font-bold text-gray-800 mb-3 text-center uppercase'>
					{car.title}
				</h2>
				<ul className='text-sm text-gray-600 mb-6 space-y-1'>
					<li>
						<strong>Тип топлива:</strong> {fuelTypes[car.fuel_type] || 'N/A'}
					</li>
					<li>
						<strong>Год выпуска:</strong> {car.year || 'N/A'} г.
					</li>
					<li>
						<strong>Тип Трансмиссии:</strong>{' '}
						{transmissionTypes[car.transmission_type || 'N/A']}
					</li>
					<li>
						<strong>Пробег:</strong>{' '}
						{car.lots?.odometer_km.toLocaleString() || 'N/A'} км
					</li>
				</ul>
				<div className='mt-auto text-center'>
					<p className='text-lg font-bold text-red-600'>
						{car.lots?.original_price?.toLocaleString() || 'N/A'} ₩
					</p>
					{/* Ссылка с передачей queryParams */}
					<Link
						to={{
							pathname: `/cars/${car.id}`,
							search: location.search, // Передаём queryParams
						}}
						className='mt-4 block bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition'
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
