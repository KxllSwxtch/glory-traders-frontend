import {
	HeroSection,
	OrderProcessSection,
	SocialMediaSection,
	AdvantagesSection,
} from '../components'

const HomePage = () => {
	return (
		<div className='homepage'>
			<HeroSection />
			<OrderProcessSection />
			<SocialMediaSection />
			<AdvantagesSection />
		</div>
	)
}

export default HomePage
