import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarsAsync, setFilters } from '../redux/slices/carsSlice'
import CarListItem from './CarListItem'
import Pagination from './Pagination'
import Loader from './Loader'

// filters
import manufacturers from '../data/manufacturers'
import models from '../data/models'
import colors from '../data/colors'

const CarList = () => {
	const dispatch = useDispatch()
	const { cars, loading, error, currentPage, totalPages } = useSelector(
		(state) => state.cars,
	)

	const [filters, setFiltersState] = useState({
		manufacturerId: '',
		modelId: '',
		generationId: '',
		colorsId: '',
		fuelId: '',
		transmissionId: '',
		mountOneId: '',
		mountTwoId: '',
		yearOneId: '',
		yearTwoId: '',
		mileageOneId: '',
		mileageTwoId: '',
	})

	const [availableModels, setAvailableModels] = useState([])
	const [availableGenerations, setAvailableGenerations] = useState([])
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)

	// Подгружаем модели на основе выбранного производителя
	useEffect(() => {
		if (filters.manufacturerId) {
			const modelsForBrand = models[filters.manufacturerId] || []
			setAvailableModels(modelsForBrand)
		} else {
			setAvailableModels([])
		}
	}, [filters.manufacturerId])

	// Подгружаем поколения на основе выбранной модели
	useEffect(() => {
		if (filters.modelId) {
			const generationsForModel =
				manufacturers[filters.modelId]?.generations || []
			setAvailableGenerations(generationsForModel)
		} else {
			setAvailableGenerations([])
		}
	}, [filters.modelId])

	// Функция для отправки запроса с применёнными фильтрами
	const applyFilters = () => {
		const queryParams = {
			page: currentPage,
			filters: {
				...Object.fromEntries(
					Object.entries(filters).filter(([_, value]) => value !== ''),
				),
			},
		}
		dispatch(fetchCarsAsync(queryParams))
	}

	// Обработчик изменений фильтров
	const handleFilterChange = (e) => {
		const { name, value } = e.target
		setFiltersState((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	// Сброс фильтров
	const resetFilters = () => {
		const initialFilters = {
			manufacturerId: '',
			modelId: '',
			generationId: '',
			colorsId: '',
			fuelId: '',
			transmissionId: '',
			mountOneId: '',
			mountTwoId: '',
			yearOneId: '',
			yearTwoId: '',
			mileageOneId: '',
			mileageTwoId: '',
		}
		setFiltersState(initialFilters)
		setAvailableModels([])
		setAvailableGenerations([])
		dispatch(setFilters(initialFilters))
	}

	const currentYear = new Date().getUTCFullYear()
	const yearTwoPlaceholder = `до ${currentYear}`

	return (
		<div className='container mx-auto flex flex-col lg:flex-row'>
			{/* Кнопка для мобильных устройств */}
			<div className='lg:hidden mb-4'>
				<button
					className='bg-red-500 text-white p-2 rounded'
					onClick={() => setIsFiltersOpen(!isFiltersOpen)}
				>
					{isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
				</button>
			</div>

			{/* Фильтры */}
			<div
				className={`transition-all duration-300 lg:w-1/4 lg:block ${
					isFiltersOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
				} lg:max-h-none lg:border-r lg:pr-4`}
			>
				<div className='p-4 border rounded-lg bg-gray-100 lg:bg-white lg:border-0'>
					<h2 className='text-lg font-bold mb-4'>Фильтры</h2>
					<div className='grid grid-cols-1 gap-4'>
						{/* Марка */}
						<select
							name='manufacturerId'
							value={filters.manufacturerId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						>
							<option value=''>Выберите марку</option>
							{manufacturers.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>

						{/* Модель */}
						<select
							name='modelId'
							value={filters.modelId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
							disabled={!filters.manufacturerId}
						>
							<option value=''>Выберите модель</option>
							{availableModels.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</select>

						{/* Поколение */}
						<select
							name='generationId'
							value={filters.generationId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
							disabled={!filters.modelId}
						>
							<option value=''>Выберите поколение</option>
							{availableGenerations.map((generation) => (
								<option
									key={generation.GENERATIONID}
									value={generation.GENERATIONID}
								>
									{generation.NAME}
								</option>
							))}
						</select>

						{/* Цвет */}
						<select
							name='colorsId'
							value={filters.colorsId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
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
							value={filters.fuelId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
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
							value={filters.transmissionId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						>
							<option value=''>Тип трансмиссии</option>
							<option value='1'>Автоматическая</option>
							<option value='2'>Механическая</option>
						</select>

						{/* Год от */}
						<input
							type='number'
							name='yearOneId'
							placeholder='от 1950 и выше'
							value={filters.yearOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						{/* Год до */}
						<input
							type='number'
							name='yearTwoId'
							placeholder={yearTwoPlaceholder}
							value={filters.yearTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						{/* Пробег от */}
						<input
							type='number'
							name='mileageOneId'
							placeholder='Пробег от'
							value={filters.mileageOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						{/* Пробег до */}
						<input
							type='number'
							name='mileageTwoId'
							placeholder='Пробег до'
							value={filters.mileageTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						{/* Кнопка "Применить фильтры" */}
						<button
							onClick={applyFilters}
							className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
						>
							Применить фильтры
						</button>

						{/* Кнопка сброса фильтров */}
						<button
							onClick={resetFilters}
							className='bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2'
						>
							Сбросить фильтры
						</button>
					</div>
				</div>
			</div>

			{/* Список автомобилей */}
			<div className='lg:w-3/4 lg:pl-4'>
				{error && <p className='text-red-500'>Ошибка: {error}</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{cars.map((car, index) => (
						<CarListItem key={index} car={car} />
					))}
				</div>
				{loading && <p>Загрузка...</p>}
				{!loading && cars.length === 0 && (
					<p className='text-center text-gray-500'>
						Нет подходящих автомобилей.
					</p>
				)}
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) =>
							dispatch({ type: 'cars/setCurrentPage', payload: page })
						}
					/>
				)}
			</div>
		</div>
	)
}

export default CarList
