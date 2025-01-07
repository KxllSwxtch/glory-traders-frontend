const PrivacyPolicy = () => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6'>Политика конфиденциальности</h1>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>1. Общие положения</h2>
				<p className='text-gray-700'>
					Настоящая Политика конфиденциальности определяет, как ваша личная
					информация собирается, используется и хранится при посещении нашего
					сайта.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>2. Сбор данных</h2>
				<p className='text-gray-700'>
					Мы можем собирать следующие виды данных:
				</p>
				<ul className='list-disc pl-6 text-gray-700'>
					<li>Имя и контактные данные</li>
					<li>Информация о посещениях и использовании сайта</li>
					<li>Другие данные, которые вы предоставляете добровольно</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>3. Использование данных</h2>
				<p className='text-gray-700'>Ваши данные используются для:</p>
				<ul className='list-disc pl-6 text-gray-700'>
					<li>Предоставления услуг и поддержки</li>
					<li>Улучшения пользовательского опыта</li>
					<li>Связи с вами по запросам</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>4. Защита данных</h2>
				<p className='text-gray-700'>
					Мы принимаем соответствующие меры для защиты вашей информации от
					несанкционированного доступа и использования.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>5. Ваши права</h2>
				<p className='text-gray-700'>Вы имеете право:</p>
				<ul className='list-disc pl-6 text-gray-700'>
					<li>Запрашивать доступ к вашим данным</li>
					<li>Требовать исправления или удаления данных</li>
					<li>Отозвать согласие на обработку данных</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-2'>6. Контакты</h2>
				<p className='text-gray-700'>
					Если у вас есть вопросы по поводу этой Политики конфиденциальности, вы
					можете связаться с нами по адресу электронной почты:
					<a
						href='mailto:glory_traders@bk.ru'
						className='text-blue-600 hover:underline ml-1'
					>
						glory_traders@bk.ru
					</a>
				</p>
			</section>

			<p className='text-gray-500 mt-4'>
				Последнее обновление: Январь 2025 года
			</p>
		</div>
	)
}

export default PrivacyPolicy
