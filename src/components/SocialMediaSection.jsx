import {
	FaYoutube,
	FaTelegramPlane,
	FaWhatsapp,
	FaInstagram,
} from 'react-icons/fa'

// Объект с цветами для каждой соцсети
const iconColors = {
	youtube: 'text-red-600 dark:text-red-400',
	instagram: 'text-pink-500 dark:text-pink-400',
	telegram: 'text-blue-500 dark:text-blue-400',
	whatsapp: 'text-green-500 dark:text-green-400',
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
	{
		icon: FaTelegramPlane,
		url: 'https://t.me/GLORYTRADERS',
		name: 'telegram',
	},
	{
		icon: FaWhatsapp,
		url: 'https://wa.me/821023297807',
		name: 'whatsapp',
	},
]

const SocialMediaSection = () => {
	return (
		<section className='py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300'>
			<div className='container mx-auto text-center'>
				{/* Заголовок */}
				<h2 className='text-2xl font-bold text-orange-600 dark:text-orange-400 mb-8'>
					Следите за Glory Traders в социальных сетях
				</h2>

				{/* Иконки */}
				<div className='flex justify-center space-x-8'>
					{socialLinks.map((link, index) => {
						const Icon = link.icon
						const colorClass =
							iconColors[link.name] || 'text-gray-700 dark:text-gray-400'

						return (
							<a
								key={index}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
								className={`${colorClass} hover:brightness-75 dark:hover:brightness-90 transition-all duration-300`}
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
