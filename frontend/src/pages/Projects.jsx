import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Projects() {

    const projects = [
        {
            number: '01',
            title: 'Modern Kitchen Upgrade',
            category: 'Kitchen Renovation',
            description:
                'A complete kitchen refresh focused on improved storage, work surfaces, lighting, flooring, and a cleaner modern layout.',
            beforeImage: '/project-kitchen-before.jpg',
            afterImage: '/project-kitchen-after.jpg',
            beforeAlt: 'Kitchen before renovation',
            afterAlt: 'Kitchen after renovation'
        },
        {
            number: '02',
            title: 'Bathroom Transformation',
            category: 'Bathroom Renovation',
            description:
                'An outdated bathroom redesigned with improved fixtures, tiles, plumbing, waterproofing, lighting, and finishes.',
            beforeImage: '/project-bathroom-before.jpg',
            afterImage: '/project-bathroom-after.jpg',
            beforeAlt: 'Bathroom before renovation',
            afterAlt: 'Bathroom after renovation'
        },
        {
            number: '03',
            title: 'Living Space Refresh',
            category: 'Living Room',
            description:
                'A living room renovation combining wall treatment, flooring, lighting improvements, and better use of the available space.',
            beforeImage: '/project-living-before.jpg',
            afterImage: '/project-living-after.jpg',
            beforeAlt: 'Living room before renovation',
            afterAlt: 'Living room after renovation'
        }
    ]

    return (
        <>
            <Navbar />

            <main className="public-page">

                <section className="public-page-hero">

                    <p className="section-label">
                        OUR PROJECTS
                    </p>

                    <h1>
                        Renovation ideas designed around real spaces.
                    </h1>

                    <p>
                        Explore before-and-after renovation examples
                        that can inspire your own kitchen, bathroom,
                        living room, or complete property project.
                    </p>

                    <Link
                        to="/login"
                        className="primary-button"
                    >
                        Start Your Project
                    </Link>

                </section>


                <section className="public-section">

                    <div className="section-heading">

                        <div>
                            <p className="section-label">
                                FEATURED PROJECTS
                            </p>

                            <h2>
                                Renovation possibilities
                            </h2>
                        </div>

                        <p>
                            Every property is different. These before-and-after
                            examples show the types of transformations that
                            can be managed through RENOVA.
                        </p>

                    </div>


                    <div className="project-page-grid">

                        {projects.map((project) => (

                            <article
                                className="project-page-card"
                                key={project.number}
                            >

                                <div className="project-image-pair">

                                    <div className="project-image-box">

                                        <span className="project-image-label">
                                            Before
                                        </span>

                                        <img
                                            src={project.beforeImage}
                                            alt={project.beforeAlt}
                                        />

                                    </div>


                                    <div className="project-image-box">

                                        <span className="project-image-label">
                                            After
                                        </span>

                                        <img
                                            src={project.afterImage}
                                            alt={project.afterAlt}
                                        />

                                    </div>

                                </div>


                                <div className="project-page-content">

                                    <p className="section-label">
                                        PROJECT {project.number}
                                    </p>

                                    <p className="project-category">
                                        {project.category}
                                    </p>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.description}
                                    </p>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>


                <section className="public-cta">

                    <div>

                        <p className="section-label">
                            YOUR PROJECT
                        </p>

                        <h2>
                            Ready to plan your own renovation?
                        </h2>

                        <p>
                            Submit your property details, renovation
                            type, areas, preferred date, and budget.
                        </p>

                    </div>

                    <Link
                        to="/register"
                        className="primary-button"
                    >
                        Get Started
                    </Link>

                </section>

            </main>

            <Footer />
        </>
    )
}

export default Projects