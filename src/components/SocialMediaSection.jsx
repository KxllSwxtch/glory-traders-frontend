import {
	FaYoutube,
	FaTelegramPlane,
	FaWhatsapp,
	FaInstagram,
} from 'react-icons/fa'

// Объект с цветами для каждой соцсети
const iconColors = {
	youtube: 'text-red-600',
	instagram: 'text-pink-500',
	telegram: 'text-blue-500',
	whatsapp: 'text-green-500',
	vk: 'text-blue-700',
	tiktok: 'text-black',
}

// Список соцсетей
const socialLinks = [
	{
		icon: FaYoutube,
		url: 'https://www.youtube.com/@vyacheslavkhon/',
		name: 'youtube',
	},
	{
		icon: FaInstagram,
		url: 'https://www.instagram.com/glory_traders_',
		name: 'instagram',
	},
	{ icon: FaTelegramPlane, url: 'https://t.me/GLORYTRADERS', name: 'telegram' },
	{ icon: FaWhatsapp, url: 'https://wa.me/821023297807', name: 'whatsapp' },
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
						const colorClass = iconColors[link.name] || 'text-gray-700'

						return (
							<a
								key={index}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
								className={`${colorClass} hover:brightness-75 transition duration-300`}
							>
								<Icon className='text-4xl' />
							</a>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default SocialMediaSection
