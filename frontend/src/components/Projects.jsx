const projects = [
    {
        title: 'Modern Living Room Renovation',
        category: 'Interior Renovation',
        before: '/project-living-before.jpg',
        after: '/project-living-after.jpg',
    },
    {
        title: 'Kitchen Transformation',
        category: 'Kitchen Renovation',
        before: '/project-kitchen-before.jpg',
        after: '/project-kitchen-after.jpg',
    },
    {
        title: 'Bathroom Upgrade',
        category: 'Bathroom Renovation',
        before: '/project-bathroom-before.jpg',
        after: '/project-bathroom-after.jpg',
    },
]

function Projects() {
    return (
        <section className="projects-section" id="projects">
            <div className="projects-container">

                <div className="projects-heading">
                    <div>
                        <p className="section-label">OUR PROJECTS</p>

                        <h2>
                            See the difference
                            <span> renovation can make.</span>
                        </h2>
                    </div>

                    <p>
                        Explore examples of spaces transformed through thoughtful planning,
                        repairs, upgrades, and modern finishes.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <article className="project-card" key={project.title}>

                            <div className="project-images">

                                <div className="project-image-wrapper">
                                    <span className="project-badge">Before</span>

                                    <img
                                        src={project.before}
                                        alt={`${project.title} before renovation`}
                                    />
                                </div>

                                <div className="project-image-wrapper">
                                    <span className="project-badge">After</span>

                                    <img
                                        src={project.after}
                                        alt={`${project.title} after renovation`}
                                    />
                                </div>

                            </div>

                            <div className="project-info">
                                <p>{project.category}</p>
                                <h3>{project.title}</h3>
                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Projects