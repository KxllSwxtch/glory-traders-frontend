import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './slices/carsSlice'

const store = configureStore({
	reducer: {
		cars: carsReducer,
	},
})

export default store
