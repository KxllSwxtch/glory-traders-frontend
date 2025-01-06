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
				<a href='tel:+79936009112' className='text-orange-600 font-bold'>
					+7 (993) 600-91-12
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
		<section className='py-16 bg-white'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center text-orange-600 mb-12'>
					Порядок покупки авто:
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>
					{steps.map((step, index) => (
						<div
							key={index}
							className='flex flex-col items-center text-center space-y-3'
						>
							<div className='w-12 h-12 flex items-center justify-center bg-orange-600 rounded-full shadow-lg'>
								{step.icon}
							</div>
							<h3 className='text-base font-semibold'>{step.title}</h3>
							<p className='text-sm text-gray-600'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default OrderProcessSection
