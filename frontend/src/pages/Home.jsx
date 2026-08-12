import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Projects from '../components/Projects'
import WhyChooseUs from '../components/WhyChooseUs'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <HowItWorks />
            <Projects />
            <WhyChooseUs />
        </>
    )
}

export default Home