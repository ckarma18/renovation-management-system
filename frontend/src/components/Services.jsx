const services = [
    {
        title: 'Full Home Renovation',
        description:
            'Complete transformation of your home, from layout changes and finishes to electrical, plumbing, flooring, and interiors.',
        number: '01',
    },
    {
        title: 'Kitchen Renovation',
        description:
            'Modernize cabinets, countertops, lighting, flooring, plumbing, appliances, and kitchen layout.',
        number: '02',
    },
    {
        title: 'Bathroom Renovation',
        description:
            'Upgrade toilets, showers, sinks, tiles, waterproofing, plumbing, ventilation, and lighting.',
        number: '03',
    },
    {
        title: 'Interior Renovation',
        description:
            'Improve bedrooms, living rooms, ceilings, walls, paint, doors, lighting, and interior finishes.',
        number: '04',
    },
    {
        title: 'Repair & Structural Work',
        description:
            'Wall repairs, damaged surfaces, demolition, structural modifications, waterproofing, and restoration work.',
        number: '05',
    },
    {
        title: 'Electrical & Plumbing',
        description:
            'Electrical rewiring, lighting, sockets, water lines, drainage, fixtures, and plumbing improvements.',
        number: '06',
    },
]

function Services() {
    return (
        <section className="services-section" id="services">
            <div className="services-container">
                <div className="section-heading">
                    <div>
                        <p className="section-label">WHAT WE RENOVATE</p>

                        <h2>
                            Renovation solutions
                            <span> for every part of your property.</span>
                        </h2>
                    </div>

                    <p className="section-description">
                        Whether you are renovating an entire home or improving one specific
                        area, our platform helps you organize the project from request to
                        completion.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <article className="service-card" key={service.number}>
                            <div className="service-number">{service.number}</div>

                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>

                                <button className="service-link">
                                    Explore Service
                                    <span>→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services