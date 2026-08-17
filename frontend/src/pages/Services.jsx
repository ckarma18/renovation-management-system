import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Services() {

    const services = [
        {
            number: '01',
            title: 'Complete House Renovation',
            description:
                'Transform your entire property with coordinated renovation planning, interior upgrades, repairs, and finishing work.'
        },
        {
            number: '02',
            title: 'Kitchen Renovation',
            description:
                'Upgrade cabinets, countertops, flooring, lighting, plumbing, storage, and the overall kitchen layout.'
        },
        {
            number: '03',
            title: 'Bathroom & Toilet',
            description:
                'Improve bathrooms with new tiles, sanitary fixtures, plumbing, waterproofing, lighting, and modern finishes.'
        },
        {
            number: '04',
            title: 'Bedroom Renovation',
            description:
                'Refresh bedrooms with flooring, wall finishes, wardrobes, lighting, storage improvements, and interior upgrades.'
        },
        {
            number: '05',
            title: 'Living Room',
            description:
                'Create a comfortable and attractive living area with improved walls, ceilings, lighting, flooring, and layout.'
        },
        {
            number: '06',
            title: 'Flooring',
            description:
                'Replace or upgrade existing floors with tiles, wood-style flooring, laminate, or other suitable materials.'
        },
        {
            number: '07',
            title: 'Walls & Painting',
            description:
                'Repair surfaces, prepare walls, repaint interiors, and refresh the overall appearance of your property.'
        },
        {
            number: '08',
            title: 'Plumbing',
            description:
                'Handle pipe replacement, water connections, leak repairs, bathroom plumbing, kitchen plumbing, and related work.'
        },
        {
            number: '09',
            title: 'Electrical',
            description:
                'Improve electrical wiring, switches, sockets, lighting points, and other electrical requirements.'
        },
        {
            number: '10',
            title: 'Doors & Windows',
            description:
                'Repair, replace, or upgrade doors and windows to improve appearance, security, ventilation, and usability.'
        },
        {
            number: '11',
            title: 'Custom Renovation',
            description:
                'Have another renovation requirement? Submit your project details and manage the request through RENOVA.'
        }
    ]

    return (
        <>
            <Navbar />

            <main className="public-page">

                <section className="public-page-hero">

                    <p className="section-label">
                        OUR SERVICES
                    </p>

                    <h1>
                        Renovation services for every part of your property.
                    </h1>

                    <p>
                        From individual rooms to complete property
                        transformations, RENOVA helps organize your
                        renovation request from planning through completion.
                    </p>

                    <Link
                        to="/login"
                        className="primary-button"
                    >
                        Start a Renovation
                    </Link>

                </section>


                <section className="public-section">

                    <div className="section-heading">

                        <div>
                            <p className="section-label">
                                WHAT WE DO
                            </p>

                            <h2>
                                Explore our renovation services
                            </h2>
                        </div>

                        <p>
                            Choose a complete renovation or focus on
                            individual rooms and specific areas.
                        </p>

                    </div>


                    <div className="public-card-grid">

                        {services.map((service) => (

                            <article
                                className="public-info-card"
                                key={service.number}
                            >

                                <span className="card-number">
                                    {service.number}
                                </span>

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                            </article>

                        ))}

                    </div>

                </section>


                <section className="public-cta">

                    <div>

                        <p className="section-label">
                            READY TO BEGIN?
                        </p>

                        <h2>
                            Tell us what you want to renovate.
                        </h2>

                        <p>
                            Create your account, submit your project,
                            and manage the renovation process online.
                        </p>

                    </div>

                    <Link
                        to="/register"
                        className="primary-button"
                    >
                        Create Account
                    </Link>

                </section>

            </main>

            <Footer />
        </>
    )
}

export default Services