import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Modal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
		agreement: false,
		contactMethod: '',
	})

	// Анимация блокировки прокрутки при открытом модальном окне
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	// Обработчик изменения полей формы
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	// Обработчик отправки формы
	const handleSubmit = (e) => {
		e.preventDefault()

		if (!formData.agreement) {
			alert('Пожалуйста, дайте согласие на обработку персональных данных.')
			return
		}

		// Формируем текст сообщения
		const message = `Здравствуйте! Меня зовут ${formData.name}. Оставил у вас заявку на сайте.%0A%0AE-mail: ${formData.email}%0AТелефон: ${formData.phone}%0AСпособ связи: ${formData.contactMethod}%0A%0A${formData.message}`

		// Перенаправляем на WhatsApp
		window.open(`https://wa.me/821023297807?text=${message}`, '_blank')

		clearForm()

		// Закрываем модалку
		onClose()
	}

	const clearForm = () =>
		setFormData({
			name: '',
			email: '',
			phone: '',
			message: '',
			agreement: false,
			contactMethod: '',
		})

	// Если окно закрыто, не рендерим ничего
	if (!isOpen) return null

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
				isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
			} transition-all duration-300 ease-in-out`}
			onClick={onClose}
		>
			<div
				className={`bg-white rounded-lg p-6 shadow-lg w-full lg:max-w-[40rem] max-w-lg sm:max-w-md mx-4 sm:mx-auto transform transition-transform duration-300 ease-in-out ${
					isOpen ? 'scale-100' : 'scale-95'
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Кнопка закрытия */}
				<button
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500'
					onClick={onClose}
				>
					&times;
				</button>

				{/* Заголовок и описание */}
				<h2 className='text-2xl font-bold mb-2 text-center'>
					Форма обратной связи
				</h2>
				<p className='text-sm text-gray-500 mb-4 text-center'>
					Введите данные и наш менеджер свяжется с Вами
				</p>

				{/* Форма */}
				<form onSubmit={handleSubmit} className='space-y-4'>
					{/* Имя */}
					<div>
						<label className='block text-sm font-bold mb-1' htmlFor='name'>
							Имя <span className='text-red-500'>*</span>
						</label>
						<input
							id='name'
							name='name'
							type='text'
							placeholder='Введите ваше имя'
							className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Email */}
					<div>
						<label className='block text-sm font-bold mb-1' htmlFor='email'>
							E-mail <span className='text-red-500'>*</span>
						</label>
						<input
							id='email'
							name='email'
							type='email'
							placeholder='Введите вашу электронную почту'
							className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Телефон */}
					<div>
						<label className='block text-sm font-bold mb-1' htmlFor='phone'>
							Номер телефона <span className='text-red-500'>*</span>
						</label>
						<input
							id='phone'
							name='phone'
							type='tel'
							className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
							value={formData.phone}
							onChange={handleChange}
							placeholder='Введите ваш номер телефона'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-bold mb-1' htmlFor='phone'>
							Сообщение <span className='text-red-500'>*</span>
						</label>
						<input
							id='message'
							name='message'
							type='text'
							className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
							value={formData.message}
							onChange={handleChange}
							placeholder='Введите ваш запрос'
							required
						/>
					</div>

					{/* Согласие */}
					<div className='flex items-center'>
						<input
							type='checkbox'
							name='agreement'
							className='mr-2'
							checked={formData.agreement}
							onChange={handleChange}
							required
						/>
						<label htmlFor='agreement' className='text-sm'>
							Я даю согласие на обработку персональных данных и дальнейшую
							коммуникацию
						</label>
					</div>

					{/* Способ связи */}
					<div>
						<label className='block text-sm font-bold mb-2'>
							Выберите способ связи <span className='text-red-500'>*</span>
						</label>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input
									type='radio'
									name='contactMethod'
									value='Telegram'
									className='mr-2'
									checked={formData.contactMethod === 'Telegram'}
									onChange={handleChange}
								/>
								Telegram
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='contactMethod'
									value='Whatsapp'
									className='mr-2'
									checked={formData.contactMethod === 'Whatsapp'}
									onChange={handleChange}
								/>
								Whatsapp
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='contactMethod'
									value='Phone'
									className='mr-2'
									checked={formData.contactMethod === 'Phone'}
									onChange={handleChange}
								/>
								Телефонный звонок
							</label>
						</div>
					</div>

					{/* Кнопки */}
					<div className='flex justify-between mt-4'>
						<button
							type='submit'
							className='bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
						>
							Отправить
						</button>
						<button
							type='button'
							className='bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
							onClick={onClose}
						>
							Закрыть
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default Modal
