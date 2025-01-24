import {
	HeroSection,
	OrderProcessSection,
	SocialMediaSection,
	AdvantagesSection,
	WhyUs,
} from '../components'

const HomePage = () => {
	return (
		<div className='homepage'>
			<HeroSection />
			<OrderProcessSection />
			<WhyUs />
			<SocialMediaSection />
			<AdvantagesSection />
		</div>
	)
}

export default HomePage
