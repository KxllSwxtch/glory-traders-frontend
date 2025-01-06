import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Footer, ScrollToTop } from './components'
import { Home, Catalog, Contacts, CarDetails } from './pages'

function App() {
	return (
		<Router>
			<ScrollToTop />

			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex-grow pt-[64px] md:pt-[80px]'>
					<div className='mx-auto'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/catalog' element={<Catalog />} />
							<Route path='/contacts' element={<Contacts />} />
							<Route path='/cars/:id' element={<CarDetails />} />
						</Routes>
					</div>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
