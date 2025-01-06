import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const maxVisiblePages = 5
	const firstPage = 1
	const lastPage = totalPages

	const getPageNumbers = () => {
		let pages = []

		if (totalPages <= maxVisiblePages) {
			pages = Array.from({ length: totalPages }, (_, i) => i + 1)
		} else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
			pages = Array.from({ length: maxVisiblePages }, (_, i) => i + 1)
		} else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
			pages = Array.from(
				{ length: maxVisiblePages },
				(_, i) => totalPages - maxVisiblePages + 1 + i,
			)
		} else {
			pages = Array.from(
				{ length: maxVisiblePages },
				(_, i) => currentPage - Math.floor(maxVisiblePages / 2) + i,
			)
		}

		return pages
	}

	const pageNumbers = getPageNumbers()

	return (
		<div className='flex items-center justify-center space-x-2 mt-4'>
			{/* Кнопка на первую страницу */}
			<button
				className='px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
				onClick={() => onPageChange(firstPage)}
				disabled={currentPage === firstPage}
			>
				««
			</button>

			{/* Кнопка назад */}
			<button
				className='px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === firstPage}
			>
				«
			</button>

			{/* Номера страниц */}
			{pageNumbers.map((page) => (
				<button
					key={page}
					className={`px-3 py-2 rounded ${
						page === currentPage
							? 'bg-red-600 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}

			{/* Кнопка вперед */}
			<button
				className='px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === lastPage}
			>
				»
			</button>

			{/* Кнопка на последнюю страницу */}
			<button
				className='px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
				onClick={() => onPageChange(lastPage)}
				disabled={currentPage === lastPage}
			>
				»»
			</button>
		</div>
	)
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired, // Текущая страница — число, обязательное
	totalPages: PropTypes.number.isRequired, // Общее число страниц — число, обязательное
	onPageChange: PropTypes.func.isRequired, // Функция изменения страницы — обязательное
}

export default Pagination
