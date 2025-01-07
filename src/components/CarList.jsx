import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchCarsAsync, setFilters } from '../redux/slices/carsSlice'
import CarListItem from './CarListItem'
import Pagination from './Pagination'
// import Loader from './Loader'

// filters
import manufacturers from '../data/manufacturers'
import models from '../data/models'
import generations from '../data/generations'
import colors from '../data/colors'
import { FaFilter } from 'react-icons/fa'

const CarList = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()

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

	// Считываем фильтры из URL при первом рендере и отправляем запрос на сервер
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search)

		const initialFilters = {
			manufacturerId: searchParams.get('manufacturerId') || '',
			modelId: searchParams.get('modelId') || '',
			generationId: searchParams.get('generationId') || '',
			colorsId: searchParams.get('colorsId') || '',
			fuelId: searchParams.get('fuelId') || '',
			transmissionId: searchParams.get('transmissionId') || '',
			mountOneId: searchParams.get('mountOneId') || '',
			mountTwoId: searchParams.get('mountTwoId') || '',
			yearOneId: searchParams.get('yearOneId') || '',
			yearTwoId: searchParams.get('yearTwoId') || '',
			mileageOneId: searchParams.get('mileageOneId') || '',
			mileageTwoId: searchParams.get('mileageTwoId') || '',
		}

		setFiltersState(initialFilters)

		const timeout = setTimeout(() => {
			dispatch(
				fetchCarsAsync({
					page: 1,
					filters: initialFilters,
				}),
			)
		}, 500)

		return () => clearTimeout(timeout)
	}, [dispatch, location.search])

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
			const generationsForModel = generations[filters.modelId] || []
			setAvailableGenerations(generationsForModel)
		} else {
			setAvailableGenerations([])
		}
	}, [filters.modelId])

	const updateURLParams = (updatedFilters) => {
		const queryParams = new URLSearchParams()

		Object.entries(updatedFilters).forEach(([key, value]) => {
			if (value !== '' && value !== null) {
				queryParams.append(key, value)
			}
		})

		navigate(`/catalog?${queryParams.toString()}`)
	}

	const applyFilters = (updatedFilters = filters) => {
		const queryParams = {
			page: 1,
			filters: {
				...Object.fromEntries(
					Object.entries(updatedFilters).filter(([_, value]) => value !== ''),
				),
			},
		}

		dispatch(fetchCarsAsync(queryParams))
	}

	const handleFilterChange = (e) => {
		const { name, value } = e.target

		let updatedFilters = {
			...filters,
			[name]: value,
		}

		if (name === 'modelId') {
			updatedFilters.generationId = ''
		}

		if (name === 'manufacturerId') {
			updatedFilters = {
				...updatedFilters,
				modelId: '',
				generationId: '',
			}
		}

		setFiltersState(updatedFilters)
		updateURLParams(updatedFilters)
		applyFilters(updatedFilters)
	}

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
		navigate('/catalog')
	}

	// Обработчик открытия/закрытия фильтров на мобильных устройствах
	const toggleFilters = () => {
		setIsFiltersOpen(!isFiltersOpen)
	}

	const currentYear = new Date().getUTCFullYear()
	const yearTwoPlaceholder = `до ${currentYear}`

	return (
		<div className='container mx-auto flex flex-col lg:flex-row'>
			{/* Кнопка для мобильных устройств */}
			<div className='lg:hidden mb-4'>
				<button
					className='bg-orange-500 text-white p-2 rounded flex items-center justify-center m-auto mt-2 w-full'
					onClick={toggleFilters}
				>
					<FaFilter className='mr-2' />
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
								<option key={generation.id} value={generation.id}>
									{generation.name}
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

						{/* Кнопка "Применить" */}
						<button
							onClick={() => {
								applyFilters()
								if (window.innerWidth < 1024) {
									setIsFiltersOpen(false)
								}
							}}
							className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
						>
							Применить
						</button>

						{/* Кнопка сброса фильтров */}
						<button
							onClick={resetFilters}
							className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
						>
							Сбросить
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
