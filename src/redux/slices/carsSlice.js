import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCars } from '../../api/carAPI'

// Асинхронный thunk для загрузки автомобилей
export const fetchCarsAsync = createAsyncThunk(
	'cars/fetchCars',
	async ({ page, filters }, { rejectWithValue }) => {
		try {
			const data = await fetchCars(page, filters)
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

const carsSlice = createSlice({
	name: 'cars',
	initialState: {
		cars: [],
		currentPage: Number(localStorage.getItem('currentPage')) || 1,
		filters: {},
		totalPages: 0,
		loading: false,
		error: null,
	},
	reducers: {
		setCurrentPage(state, action) {
			state.currentPage = action.payload
			localStorage.setItem('currentPage', action.payload)
		},
		setFilters(state, action) {
			state.filters = action.payload // Обновление фильтров
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCarsAsync.pending, (state) => {
				state.loading = true
				state.error = null
				state.cars = []
			})
			.addCase(fetchCarsAsync.fulfilled, (state, action) => {
				state.loading = false
				state.cars = action.payload.data.sort((a, b) =>
					a.year > b.year ? -1 : 1,
				)
				state.totalPages = action.payload.pageCount
			})
			.addCase(fetchCarsAsync.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setCurrentPage, setFilters } = carsSlice.actions

export default carsSlice.reducer
