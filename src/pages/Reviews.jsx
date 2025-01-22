import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import { Loader } from '../components'

const Reviews = () => {
	const [reviews, setReviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// Загрузка отзывов из папки
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const totalReviews = 2 // Предположительное количество видеофайлов
				const loadedReviews = []

				for (let i = 1; i <= totalReviews; i++) {
					const videoPath = `/src/assets/reviews/review_${i}.mp4`
					loadedReviews.push(videoPath)
				}

				setReviews(loadedReviews)
			} catch (error) {
				console.error('Ошибка загрузки видео:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchReviews()
	}, [])

	return (
		<>
			<Helmet>
				<title>Glory Traders | Отзывы наших клиентов</title>
				<link rel='canonical' href='https://www.glory-traders.org/reviews' />
				<meta
					name='description'
					content='Наши кейсы и отзывы от клиентов по автомобилям из Кореи'
				/>
			</Helmet>
			<div className='container mx-auto p-4'>
				{/* Заголовок */}
				<h1 className='text-4xl font-bold text-center mb-6 text-orange-500 mt-8'>
					Отзывы клиентов
				</h1>

				{/* Отображение загрузки */}
				{isLoading ? (
					<Loader />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{reviews.map((review, index) => (
							<div
								key={index}
								className='bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800'
							>
								{/* <h3 className='text-lg font-bold text-orange-500 mb-2'>
									Отзыв {index + 1}
								</h3> */}
								<video
									src={review}
									controls
									className='w-full h-auto rounded'
									preload='metadata'
								>
									Ваш браузер не поддерживает видео.
								</video>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default Reviews
