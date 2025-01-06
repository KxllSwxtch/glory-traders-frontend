import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import HEROVIDEO_SRC from '../assets/herovideo.mp4'

const brands = [
	{ id: 8, name: 'Aston Martin' },
	{ id: 9, name: 'Audi' },
	{ id: 16, name: 'BMW' },
	{ id: 48, name: 'Ford' },
	{ id: 140, name: 'Toyota' },
]

const models = {
	9: [
		{ id: 'a3', name: 'A3' },
		{ id: 'a4', name: 'A4' },
		{ id: 'q5', name: 'Q5' },
	],
	16: [
		{ id: 'x1', name: 'X1' },
		{ id: 'x3', name: 'X3' },
		{ id: 'x5', name: 'X5' },
	],
}

const generations = {
	a3: ['8L', '8P', '8V'],
	a4: ['B6', 'B7', 'B8'],
	x5: ['E53', 'E70', 'F15'],
}

const HeroSection = () => {
	const [selectedBrand, setSelectedBrand] = useState('')
	const [availableModels, setAvailableModels] = useState([])
	const [selectedModel, setSelectedModel] = useState('')
	const [availableGenerations, setAvailableGenerations] = useState([])
	const [selectedGeneration, setSelectedGeneration] = useState('')

	const navigate = useNavigate()

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
		navigate('/catalog', {
			state: {
				manufacturerId: selectedBrand,
				modelId: selectedModel,
				generationId: selectedGeneration,
			},
		})
	}

	return (
		<section className='relative h-[75vh]'>
			{/* Видео на заднем плане */}
			<video
				className='absolute inset-0 w-full h-full object-cover'
				src={HEROVIDEO_SRC}
				autoPlay
				loop
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
				<div className='bg-white p-4 rounded-lg shadow-lg mb-6'>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						<select
							className='p-2 border rounded'
							value={selectedBrand}
							onChange={(e) => setSelectedBrand(e.target.value)}
						>
							<option value='' disabled>
								Выберите марку
							</option>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>

						<select
							className='p-2 border rounded'
							value={selectedModel}
							onChange={(e) => setSelectedModel(e.target.value)}
							disabled={!selectedBrand}
						>
							<option value='' disabled>
								Выберите модель
							</option>
							{availableModels.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</select>

						<select
							className='p-2 border rounded'
							value={selectedGeneration}
							onChange={(e) => setSelectedGeneration(e.target.value)}
							disabled={!selectedModel}
						>
							<option value='' disabled>
								Выберите поколение
							</option>
							{availableGenerations.map((gen) => (
								<option key={gen} value={gen}>
									{gen}
								</option>
							))}
						</select>
					</div>

					<button
						className='bg-red-500 text-white p-2 rounded mt-4 w-full hover:bg-red-600 transition'
						onClick={handleSearch}
						disabled={!selectedBrand}
					>
						Поиск
					</button>
				</div>

				<div className='flex space-x-4'>
					<a
						href='https://t.me/+HMBi9tn_wKw1OGVl'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition space-x-2'
					>
						<FaTelegramPlane className='text-lg' />
						<span>Telegram</span>
					</a>
					<a
						href='https://wa.me/821023297807'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center bg-orange-700 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition space-x-2'
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
