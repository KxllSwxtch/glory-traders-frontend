import {
	FaYoutube,
	FaVk,
	FaTelegramPlane,
	FaWhatsapp,
	FaTiktok,
} from 'react-icons/fa'

const socialLinks = [
	{ icon: FaYoutube, url: 'https://www.youtube.com/@vyacheslavkhon/' },
	// { icon: SiOdnoklassniki, url: 'https://ok.ru' },
	// { icon: FaTiktok, url: 'https://tiktok.com' },
	// { icon: FaVk, url: 'https://vk.com' },
	{ icon: FaTelegramPlane, url: 'https://t.me/+HMBi9tn_wKw1OGVl' },
	{ icon: FaWhatsapp, url: 'https://wa.me/821023297807' },
]

const SocialMediaSection = () => {
	return (
		<section className='py-16 bg-gray-100'>
			<div className='container mx-auto text-center'>
				{/* Заголовок */}
				<h2 className='text-2xl font-bold text-orange-600 mb-8'>
					Мы в социальных сетях:
				</h2>
				{/* Иконки */}
				<div className='flex justify-center space-x-8'>
					{socialLinks.map((link, index) => {
						const Icon = link.icon
						return (
							<a
								key={index}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-700 hover:text-orange-600 transition duration-300'
							>
								<Icon className='text-3xl' />
							</a>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default SocialMediaSection
