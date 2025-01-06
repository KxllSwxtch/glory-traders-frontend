import { useState } from 'react'
import { Link } from 'react-router-dom'
import LOGO_SRC from '../assets/logo.png'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false) // Состояние для открытия/закрытия мобильного меню

	// Функция для переключения состояния меню
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
		document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden' // Отключение/включение прокрутки
	}

	// Функция для закрытия меню
	const closeMenu = () => {
		setIsMenuOpen(false)
		document.body.style.overflow = 'auto' // Включение прокрутки
	}

	return (
		<header className='bg-white shadow-md py-4 fixed top-0 left-0 w-full z-50'>
			<div className='container mx-auto flex items-center justify-between px-4'>
				{/* Логотип */}
				<div className='flex items-center space-x-4'>
					<Link to='/'>
						<img src={LOGO_SRC} alt='Mike Auto Logo' className='h-12' />
					</Link>
				</div>

				{/* Навигация для больших экранов */}
				<nav className='hidden md:flex items-center space-x-8'>
					<Link
						to='/'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Главная
					</Link>
					<Link
						to='/catalog'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Каталог авто из Кореи
					</Link>
					<Link
						to='/contacts'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Контакты
					</Link>
					{/* Ссылки на соцсети */}
					<div className='flex items-center space-x-4'>
						<a
							href='https://t.me/+HMBi9tn_wKw1OGVl'
							target='__blank'
							rel='noopener noreferrer'
							className='text-gray-600 hover:text-gray-800 transition'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png' // Telegram
								alt='Telegram'
								className='h-6 w-6'
							/>
						</a>
						<a
							href='https://wa.me/821023297807'
							className='text-gray-600 hover:text-gray-800 transition'
							target='__blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/733/733585.png' // WhatsApp
								alt='WhatsApp'
								className='h-6 w-6'
							/>
						</a>
						<a
							href='#'
							className='text-gray-600 hover:text-gray-800 transition'
							target='__blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/597/597177.png' // Phone
								alt='Phone'
								className='h-6 w-6'
							/>
						</a>
					</div>
				</nav>

				{/* Иконки соц сетей для мобильной версии */}
				<div className='flex items-center space-x-4 md:hidden'>
					<a
						href='https://t.me/+HMBi9tn_wKw1OGVl'
						target='__blank'
						rel='noopener noreferrer'
						className='text-gray-600 hover:text-gray-800 transition'
					>
						<img
							src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png' // Telegram
							alt='Telegram'
							className='h-6 w-6'
						/>
					</a>
					<a
						href='https://wa.me/821023297807'
						className='text-gray-600 hover:text-gray-800 transition'
						target='__blank'
						rel='noopener noreferrer'
					>
						<img
							src='https://cdn-icons-png.flaticon.com/512/733/733585.png' // WhatsApp
							alt='WhatsApp'
							className='h-6 w-6'
						/>
					</a>
					<a
						href='#'
						className='text-gray-600 hover:text-gray-800 transition'
						target='__blank'
						rel='noopener noreferrer'
					>
						<img
							src='https://cdn-icons-png.flaticon.com/512/597/597177.png' // Phone
							alt='Phone'
							className='h-6 w-6'
						/>
					</a>
				</div>

				{/* Кнопка-гамбургер (мобильное меню) */}
				<button
					onClick={toggleMenu}
					className='md:hidden bg-gray-200 p-2 rounded focus:outline-none'
				>
					<div className='space-y-1'>
						<div className='w-5 h-0.5 bg-gray-800'></div>
						<div className='w-5 h-0.5 bg-gray-800'></div>
						<div className='w-5 h-0.5 bg-gray-800'></div>
					</div>
				</button>
			</div>

			{/* Мобильное меню */}
			<div
				className={`fixed inset-y-0 right-0 bg-black bg-opacity-90 z-40 w-full max-w-full transform ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-500 ease-in-out`}
				onClick={closeMenu}
			>
				<div
					className='flex flex-col items-center justify-center h-full space-y-6 text-white'
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={closeMenu}
						className='absolute top-4 right-4 text-white text-2xl focus:outline-none'
					>
						&times;
					</button>
					<Link
						to='/'
						className='text-xl font-semibold hover:text-gray-300'
						onClick={closeMenu}
					>
						Главная
					</Link>
					<Link
						to='/catalog'
						className='text-xl font-semibold hover:text-gray-300'
						onClick={closeMenu}
					>
						Каталог авто из Кореи
					</Link>
					<Link
						to='/contacts'
						className='text-xl font-semibold hover:text-gray-300'
						onClick={closeMenu}
					>
						Контакты
					</Link>
					<Link
						to='/contacts'
						className='bg-white text-black px-4 py-2 rounded hover:bg-gray-200'
						onClick={closeMenu}
					>
						Оставить заявку
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
