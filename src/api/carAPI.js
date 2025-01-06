const BASE_URL = 'http://127.0.0.1:8000/api/proxy/filter/page'

/**
 * Функция для получения автомобилей с учетом фильтров и страницы.
 * @param {number} page - Номер страницы.
 * @param {object} filters - Фильтры для запроса (optional).
 * @returns {Promise<object>} - Данные автомобилей и информация о страницах.
 */
export const fetchCars = async (page, filters = {}) => {
	try {
		if (!page) throw new Error('Page is undefined') // Защита от ошибки

		const params = new URLSearchParams({ page })

		// Добавляем фильтры в запрос
		Object.keys(filters).forEach((key) => {
			if (filters[key]) {
				params.append(key, filters[key])
			}
		})

		const response = await fetch(`${BASE_URL}?${params.toString()}`)
		if (!response.ok) {
			throw new Error(`Failed to fetch cars: ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching cars:', error)
		throw error
	}
}
