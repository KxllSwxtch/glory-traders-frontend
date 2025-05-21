import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import manufacturers from '../data/manufacturers'
import models from '../data/models'
import generations from '../data/generations'
import colors from '../data/colors'

const months = [
	{ value: '01', label: 'Январь' },
	{ value: '02', label: 'Февраль' },
	{ value: '03', label: 'Март' },
	{ value: '04', label: 'Апрель' },
	{ value: '05', label: 'Май' },
	{ value: '06', label: 'Июнь' },
	{ value: '07', label: 'Июль' },
	{ value: '08', label: 'Август' },
	{ value: '09', label: 'Сентябрь' },
	{ value: '10', label: 'Октябрь' },
	{ value: '11', label: 'Ноябрь' },
	{ value: '12', label: 'Декабрь' },
]

const HeroSection = () => {
	const [filters, setFilters] = useState({
		manufacturerId: '',
		modelId: '',
		generationId: '',
		colorsId: '',
		fuelId: '',
		transmissionId: '',
		yearOneId: '',
		yearTwoId: '',
		mountOneId: '',
		mountTwoId: '',
		mileageOneId: '',
		mileageTwoId: '',
	})

	const navigate = useNavigate()

	const handleFilterChange = (e) => {
		const { name, value } = e.target
		let updatedFilters = {
			...filters,
			[name]: value,
		}

		if (name === 'manufacturerId') {
			updatedFilters.modelId = ''
			updatedFilters.generationId = ''
		}

		setFilters(updatedFilters)
	}

	// Обработчик поиска
	const applyFilters = () => {
		const queryParams = new URLSearchParams()

		if (filters.manufacturerId)
			queryParams.append('manufacturerId', filters.manufacturerId)
		if (filters.modelId) queryParams.append('modelId', filters.modelId)
		if (filters.generationId)
			queryParams.append('generationId', filters.generationId)
		if (filters.colorsId) queryParams.append('colorsId', filters.colorsId)
		if (filters.fuelId) queryParams.append('fuelId', filters.fuelId)
		if (filters.transmissionId)
			queryParams.append('transmissionId', filters.transmissionId)
		if (filters.yearOneId) queryParams.append('yearOneId', filters.yearOneId)
		if (filters.yearTwoId) queryParams.append('yearTwoId', filters.yearTwoId)
		if (filters.mountOneId) queryParams.append('mountOneId', filters.mountOneId)
		if (filters.mountTwoId) queryParams.append('mountTwoId', filters.mountTwoId)
		if (filters.mileageOneId)
			queryParams.append('mileageOneId', filters.mileageOneId)
		if (filters.mileageTwoId)
			queryParams.append('mileageTwoId', filters.mileageTwoId)

		navigate(`/catalog?${queryParams.toString()}`)
	}

	const resetFilters = () => {
		setFilters({
			manufacturerId: '',
			modelId: '',
			generationId: '',
			colorsId: '',
			fuelId: '',
			transmissionId: '',
			yearOneId: '',
			yearTwoId: '',
			mountOneId: '',
			mountTwoId: '',
			mileageOneId: '',
			mileageTwoId: '',
		})

		navigate('/catalog')
	}

	const currentYear = new Date().getUTCFullYear()
	const years = Array.from(
		{ length: currentYear - 1979 },
		(_, i) => 1980 + i,
	).sort((a, b) => (a > b ? -1 : 1))

	return (
		<>
			<section className='relative min-h-screen flex items-center justify-center pb-10 pt-10'>
				{/* Видео на заднем плане */}
				<video
					className='absolute inset-0 w-full h-full object-cover'
					src='/herovideo.mp4'
					loop
					playsInline
					autoPlay
					muted
					preload='metadata'
				>
					Ваш браузер не поддерживает видео
				</video>
				{/* Затемнение поверх видео */}
				<div className='absolute inset-0 bg-black bg-opacity-50'></div>
				{/* Контент поверх видео */}
				<div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4'>
					<h1 className='text-4xl font-bold mb-4 mt-10' id='herosection'>
						Автомобили из Южной Кореи под заказ
					</h1>
					<p className='text-lg mb-6'>
						Выгодная доставка автомобилей и техники с дилерских стоянок и
						аукционов Южной Кореи.
					</p>
					{/* Форма поиска */}
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
						{/* Марка, модель, поколение */}
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
							<select
								className='p-2 border rounded text-black dark:text-white dark:bg-gray-700'
								value={filters.manufacturerId}
								name='manufacturerId'
								onChange={handleFilterChange}
							>
								<option value='' disabled>
									Выберите марку
								</option>
								{manufacturers
									.sort((a, b) => (a.name > b.name ? 1 : -1))
									.map((brand) => (
										<option key={brand.id} value={brand.id}>
											{brand.name}
										</option>
									))}
							</select>

							<select
								className='p-2 border rounded text-black dark:text-white dark:bg-gray-700'
								name='modelId'
								value={filters.modelId}
								onChange={handleFilterChange}
								disabled={!filters.manufacturerId}
							>
								<option value='' disabled>
									Выберите модель
								</option>
								{Object.values(models[filters.manufacturerId] || [])
									.sort((a, b) => (a.name > b.name ? 1 : -1))
									.map((model) => (
										<option key={model.id} value={model.id}>
											{model.name}
										</option>
									))}
							</select>

							<select
								className='p-2 border rounded text-black dark:text-white dark:bg-gray-700'
								value={filters.generationId}
								onChange={handleFilterChange}
								disabled={!filters.modelId}
								name='generationId'
							>
								<option value='' disabled>
									Выберите поколение
								</option>
								{Object.values(generations[filters.modelId] || []).map(
									(gen) => (
										<option key={gen.id} value={gen.id}>
											{gen.name}
										</option>
									),
								)}
							</select>
						</div>

						{/* Цвет */}
						<select
							name='colorsId'
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mt-4'
						>
							<option value=''>Выберите цвет</option>
							{colors.map((color) => (
								<option key={color.id} value={color.id}>
									{color.name}
								</option>
							))}
						</select>

						{/* Тип топлива */}
						<select
							name='fuelId'
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mt-4'
						>
							<option value=''>Тип топлива</option>
							<option value='1'>Дизель</option>
							<option value='2'>Электрический</option>
							<option value='3'>Гибрид</option>
							<option value='4'>Бензин</option>
							<option value='5'>Газ</option>
							<option value='6'>Водородный</option>
						</select>

						{/* Тип трансмиссии */}
						<select
							name='transmissionId'
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mt-4 mb-4'
						>
							<option value=''>Тип трансмиссии</option>
							<option value='1'>Автоматическая</option>
							<option value='2'>Механическая</option>
						</select>

						{/* Год от */}
						<select
							name='yearOneId'
							value={filters.yearOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mb-4'
						>
							<option value=''>Год от</option>
							{years
								.filter(
									(year) => !filters.yearTwoId || year <= filters.yearTwoId,
								)
								.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
						</select>

						{/* Год до */}
						<select
							name='yearTwoId'
							value={filters.yearTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mb-4'
						>
							<option value=''>Год до</option>
							{years
								.filter(
									(year) => !filters.yearOneId || year >= filters.yearOneId,
								)
								.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
						</select>

						{/* Месяц от */}
						<select
							name='mountOneId'
							value={filters.mountOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full mb-4'
						>
							<option value=''>Месяц от</option>
							{months
								.filter((month) => {
									// Если год совпадает, фильтруем месяцы
									if (filters.yearOneId === filters.yearTwoId) {
										return (
											!filters.mountTwoId || month.value <= filters.mountTwoId
										)
									}
									return true
								})
								.map((month) => (
									<option key={month.value} value={month.value}>
										{month.label}
									</option>
								))}
						</select>

						{/* Месяц до */}
						<select
							name='mountTwoId'
							value={filters.mountTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full'
						>
							<option value=''>Месяц до</option>
							{months
								.filter((month) => {
									// Если год совпадает, фильтруем месяцы
									if (filters.yearOneId === filters.yearTwoId) {
										return (
											!filters.mountOneId || month.value >= filters.mountOneId
										)
									}
									return true
								})
								.map((month) => (
									<option key={month.value} value={month.value}>
										{month.label}
									</option>
								))}
						</select>

						{/* Пробег от и до */}
						<div className='grid grid-cols-2 gap-4 mt-4'>
							<input
								type='number'
								name='mileageOneId'
								placeholder='Пробег от (км)'
								className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full'
								onChange={handleFilterChange}
							/>
							<input
								onChange={handleFilterChange}
								type='number'
								name='mileageTwoId'
								placeholder='Пробег до (км)'
								className='p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full'
							/>
						</div>

						{/* Кнопки */}
						<button
							className='bg-orange-500 text-white p-2 rounded mt-4 w-full hover:bg-orange-600 transition cursor-pointer'
							onClick={applyFilters}
						>
							Поиск
						</button>

						<button
							className='bg-red-500 text-white p-2 rounded mt-4 w-full hover:bg-red-600 transition cursor-pointer'
							onClick={resetFilters}
						>
							Сбросить
						</button>
					</div>

					<div className='flex space-x-4'>
						<a
							href='https://t.me/GLORY_TRADERS'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition space-x-2'
						>
							<FaTelegramPlane className='text-lg' />
							<span>Телеграм</span>
						</a>
						<a
							href='https://wa.me/821023297807'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition space-x-2'
						>
							<FaWhatsapp className='text-lg' />
							<span>WhatsApp</span>
						</a>
					</div>
				</div>
			</section>
		</>
	)
}

export default HeroSection
