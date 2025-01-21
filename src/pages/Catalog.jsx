import { Helmet } from 'react-helmet'
import { CarList } from '../components'

const Catalog = () => {
	return (
		<>
			<Helmet>
				<link rel='canonical' href='https://glory-traders.org/catalog' />
			</Helmet>

			<div className='container mx-auto px-4 py-8'>
				<CarList />
			</div>
		</>
	)
}

export default Catalog
