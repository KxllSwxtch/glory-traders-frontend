import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Footer, ScrollToTop } from './components'
import {
	Home,
	Catalog,
	Contacts,
	CarDetails,
	PrivacyPolicy,
	Calculator,
	FAQ,
	Reviews,
} from './pages'

const App = () => {
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
							<Route path='/privacy-policy' element={<PrivacyPolicy />} />
							<Route path='/calculator' element={<Calculator />} />
							<Route path='/faq' element={<FAQ />} />
							<Route path='/reviews' element={<Reviews />} />
						</Routes>
					</div>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
