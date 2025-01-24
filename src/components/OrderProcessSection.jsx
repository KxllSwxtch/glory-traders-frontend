import {
	FaPhoneAlt,
	FaFileContract,
	FaSearch,
	FaTruck,
	FaClipboardCheck,
} from 'react-icons/fa'

const steps = [
	{
		icon: <FaPhoneAlt className='text-white text-2xl' />,
		title: 'Связь с нами',
		description: (
			<>
				Оставьте заявку через сайт
				<br />
				или мессенджер, либо
				<br />
				позвоните нам по номеру
				<br />
				<a
					href='tel:+821023297807'
					className='text-orange-600 dark:text-orange-400 font-bold'
				>
					+82 10-2329-7807
				</a>
			</>
		),
	},
	{
		icon: <FaFileContract className='text-white text-2xl' />,
		title: 'Составление договора',
		description: (
			<>
				Гарантийный взнос составляет 70.000₽.
				<br />
				Заключаем договор и отправляем
				<br />
				его вам на почту.
			</>
		),
	},
	{
		icon: <FaSearch className='text-white text-2xl' />,
		title: 'Поиск и покупка авто',
		description: (
			<>
				Мы подбираем автомобиль в рамках вашего бюджета,
				<br />
				проводим проверку и ждём вашего подтверждения.
			</>
		),
	},
	{
		icon: <FaTruck className='text-white text-2xl' />,
		title: 'Перевозка и растаможка',
		description: (
			<>
				Мы осуществляем доставку автомобилей из Южной Кореи
				<br />в Россию и страны СНГ, а также занимаемся их растаможкой.
			</>
		),
	},
	{
		icon: <FaClipboardCheck className='text-white text-2xl' />,
		title: 'Доставка и получение',
		description: (
			<>
				Доставляем автомобиль и необходимые документы
				<br />
				прямо в ваш населённый пункт.
			</>
		),
	},
]

const OrderProcessSection = () => {
	return (
		<section className='py-16 bg-white dark:bg-gray-900 transition-colors duration-300'>
			<div className='container mx-auto px-4'>
				<h1 className='text-3xl font-bold text-center text-orange-600 dark:text-orange-400 mb-12'>
					Как купить авто из Южной Кореи
				</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>
					{steps.map((step, index) => (
						<div
							key={index}
							className='flex flex-col items-center text-center space-y-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-colors duration-300'
						>
							<div className='w-12 h-12 flex items-center justify-center bg-orange-600 dark:bg-orange-500 rounded-full shadow-lg'>
								{step.icon}
							</div>
							<h3 className='text-base font-semibold text-gray-900 dark:text-white'>
								{step.title}
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-300'>
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default OrderProcessSection
