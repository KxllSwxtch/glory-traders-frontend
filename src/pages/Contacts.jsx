import { Helmet } from 'react-helmet'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import businessCertificateImage from '../assets/business-certificate.jpeg'

const Contacts = () => {
	return (
		<>
			<Helmet>
				<title>Glory Traders | Наши контакты</title>
				<link rel='canonical' href='https://www.glory-traders.org/contacts' />
				<meta
					name='description'
					content='Свяжитесь с Glory Traders для расчета доставки автомобилей из Кореи.'
				/>
				<meta name='robots' content='index, follow' />
			</Helmet>
			<section className='px-6 py-12 max-w-6xl mx-auto'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Контакты</h1>

				{/* Блок с информацией о компании */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
					<div>
						<h2 className='text-2xl font-semibold mb-4'>Адрес:</h2>
						<p>104호, 128-1 Jigok-ro, Danwon-gu, Ansan-si, Gyeonggi-do</p>

						<h2 className='text-2xl font-semibold mt-8 mb-4'>Мы в соцсетях:</h2>
						<div className='flex space-x-4'>
							<a
								href='https://www.youtube.com/@vyacheslavkhon/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/1384/1384060.png'
									alt='YouTube'
									className='w-8 h-8'
								/>
							</a>
							{/* <a href='https://vk.com' target='_blank' rel='noopener noreferrer'>
							<img
								src='https://cdn-icons-png.flaticon.com/512/733/733579.png'
								alt='VK'
								className='w-8 h-8'
							/>
						</a> */}
							<a
								href='https://www.instagram.com/glory_traders_'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/733/733558.png'
									alt='Instagram'
									className='w-8 h-8'
								/>
							</a>
							{/* <a
							href='https://tiktok.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/733/733590.png'
								alt='TikTok'
								className='w-8 h-8'
							/>
						</a> */}
							<a
								href='https://t.me/GLORYTRADERS'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png'
									alt='Telegram'
									className='w-8 h-8'
								/>
							</a>
							<a
								href='https://wa.me/821023297807'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/733/733585.png'
									alt='WhatsApp'
									className='w-8 h-8'
								/>
							</a>
						</div>

						<h2 className='text-2xl font-semibold mt-8 mb-4'>E-mail:</h2>
						<a href='mailto:glory_traders@bk.ru' className='text-red-500'>
							glory_traders@bk.ru
						</a>
					</div>

					<div>
						<h2 className='text-2xl font-semibold mb-4'>Телефоны:</h2>
						{/* <p>
						<a href='tel:+79955009112' className='text-red-500'>
							+7 (995) 500-91-12
						</a>{' '}
						— Никита
					</p> */}
						<p>
							<a href='tel:+79035957700' className='text-red-500'>
								+7 903-595-7700
							</a>{' '}
							— Геннадий (Москва)
						</p>
						<p>
							<a href='tel:+8210-2329-7807' className='text-red-500'>
								+82 10-2329-7807
							</a>{' '}
							— Вячеслав (Корея)
						</p>

						<h2 className='text-2xl font-semibold mt-8 mb-4'>
							Связаться с нами:
						</h2>
						<div className='flex space-x-4'>
							<a
								href='https://t.me/GLORY_TRADERS'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png'
									alt='Telegram'
									className='w-8 h-8'
								/>
							</a>
							<a
								href='https://wa.me/821023297807'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src='https://cdn-icons-png.flaticon.com/512/733/733585.png'
									alt='WhatsApp'
									className='w-8 h-8'
								/>
							</a>
						</div>
					</div>
				</div>

				{/* Карта */}
				<div className='w-full h-96 rounded-lg overflow-hidden shadow-lg'>
					<iframe
						className='w-full h-full'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.1066325738334!2d126.79099337591968!3d37.33998413708656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6fc4da4d6353%3A0xdac96eac3a27b309!2s104%2C%20128-1%20Jigok-ro%2C%20Danwon-gu%2C%20Ansan-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1736222550455!5m2!1sen!2skr'
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</div>

				{/* Сертификат бизнеса */}
				{/* Сертификат бизнеса */}
				<div className='mt-12'>
					<h2 className='text-2xl font-semibold mb-4 text-center'>
						Сертификат бизнеса
					</h2>
					<div className='flex justify-center'>
						<PhotoProvider>
							<div className='flex justify-center'>
								<PhotoView src={businessCertificateImage}>
									<img
										src={businessCertificateImage}
										alt='Сертификат бизнеса'
										className='w-5/12 max-w-3xl rounded-lg shadow-lg'
									/>
								</PhotoView>
							</div>
						</PhotoProvider>
					</div>
				</div>
			</section>
		</>
	)
}

export default Contacts
