import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import HEROVIDEO_SRC from '../assets/herovideo.mp4'
import manufacturers from '../data/manufacturers'
import models from '../data/models'
import generations from '../data/generations'

const HeroSection = () => {
	const [selectedBrand, setSelectedBrand] = useState('')
	const [availableModels, setAvailableModels] = useState([])
	const [selectedModel, setSelectedModel] = useState('')
	const [availableGenerations, setAvailableGenerations] = useState([])
	const [selectedGeneration, setSelectedGeneration] = useState('')

	const navigate = useNavigate()

	const handleBrandChange = (e) => {
		const newBrand = e.target.value
		setSelectedBrand(newBrand)

		// Сбрасываем модель и поколение при смене марки
		setSelectedModel('')
		setAvailableGenerations([])
		setSelectedGeneration('')
	}

	// Обработчик изменения модели
	const handleModelChange = (e) => {
		const newModel = e.target.value
		setSelectedModel(newModel)

		// Сбрасываем поколение при смене модели
		setSelectedGeneration('')
	}

	// Обновление моделей при выборе марки
	useEffect(() => {
		if (selectedBrand) {
			setAvailableModels(models[selectedBrand] || [])
			setSelectedModel('')
			setAvailableGenerations([])
			setSelectedGeneration('')
		} else {
			setAvailableModels([])
		}
	}, [selectedBrand])

	// Обновление поколений при выборе модели
	useEffect(() => {
		if (selectedModel) {
			setAvailableGenerations(generations[selectedModel] || [])
			setSelectedGeneration('')
		} else {
			setAvailableGenerations([])
		}
	}, [selectedModel])

	// Обработчик поиска
	const handleSearch = () => {
		const queryParams = new URLSearchParams()

		if (selectedBrand) queryParams.append('manufacturerId', selectedBrand)
		if (selectedModel) queryParams.append('modelId', selectedModel)
		if (selectedGeneration)
			queryParams.append('generationId', selectedGeneration)

		navigate(`/catalog?${queryParams.toString()}`)
	}

	return (
		<section className='relative h-[75vh]'>
			{/* Видео на заднем плане */}
			<video
				className='absolute inset-0 w-full h-full object-cover'
				src={HEROVIDEO_SRC}
				loop
				playsInline
				autoPlay
				muted
			></video>

			{/* Затемнение поверх видео */}
			<div className='absolute inset-0 bg-black bg-opacity-50'></div>

			{/* Контент поверх видео */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4'>
				<h1 className='text-4xl font-bold mb-4'>Автомобили и техника</h1>
				<p className='text-lg mb-6'>
					в наличии и под заказ с дилерских стоянок и аукционов Южной Кореи
				</p>

				{/* Форма поиска */}
				<div className='bg-white p-4 rounded-lg shadow-lg mb-6 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						<select
							className='p-2 border rounded text-black'
							value={selectedBrand}
							onChange={handleBrandChange}
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
							className='p-2 border rounded text-black'
							value={selectedModel}
							onChange={handleModelChange}
							disabled={!selectedBrand}
						>
							<option value='' disabled>
								Выберите модель
							</option>
							{availableModels
								.sort((a, b) => (a.name > b.name ? 1 : -1))
								.map((model) => (
									<option key={model.id} value={model.id}>
										{model.name}
									</option>
								))}
						</select>

						<select
							className='p-2 border rounded text-black'
							value={selectedGeneration}
							onChange={(e) => setSelectedGeneration(e.target.value)}
							disabled={!selectedModel}
						>
							<option value='' disabled>
								Выберите поколение
							</option>
							{availableGenerations.map((gen) => (
								<option key={gen.id} value={gen.id}>
									{gen.name}
								</option>
							))}
						</select>
					</div>

					<button
						className='bg-orange-500 text-white p-2 rounded mt-4 w-full hover:bg-orange-600 transition cursor-pointer'
						onClick={handleSearch}
						// disabled={!selectedBrand}
					>
						Поиск
					</button>
				</div>

				<div className='flex space-x-4'>
					<a
						href='https://t.me/GLORYTRADERS'
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
	)
}

export default HeroSection
