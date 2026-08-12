const steps = [
    {
        number: '01',
        title: 'Tell Us About Your Project',
        description:
            'Choose the type of renovation, property area, expected budget, preferred date, and describe what you want to change.',
    },
    {
        number: '02',
        title: 'Project Review',
        description:
            'Your renovation request is reviewed so the project requirements, scope, and next steps can be understood clearly.',
    },
    {
        number: '03',
        title: 'Site Visit & Estimate',
        description:
            'When needed, a site visit can be arranged before preparing an estimated cost and renovation plan.',
    },
    {
        number: '04',
        title: 'Approve & Book',
        description:
            'Review the project details and estimate, then confirm your renovation booking and preferred schedule.',
    },
    {
        number: '05',
        title: 'Payment',
        description:
            'Complete the required payment through the platform and keep track of your payment status.',
    },
    {
        number: '06',
        title: 'Renovation Begins',
        description:
            'Once everything is confirmed, renovation work begins and you can follow the progress of your project.',
    },
]

function HowItWorks() {
    return (
        <section className="how-section" id="how-it-works">
            <div className="how-container">

                <div className="how-heading">
                    <p className="section-label">HOW IT WORKS</p>

                    <h2>
                        From renovation idea
                        <span> to finished space.</span>
                    </h2>

                    <p>
                        Manage the important stages of your renovation project in one
                        place, from the first request through booking, payment, and
                        completion.
                    </p>
                </div>

                <div className="steps-list">
                    {steps.map((step) => (
                        <div className="step-row" key={step.number}>

                            <div className="step-number">
                                {step.number}
                            </div>

                            <div className="step-title">
                                <h3>{step.title}</h3>
                            </div>

                            <div className="step-description">
                                <p>{step.description}</p>
                            </div>

                            <div className="step-arrow">
                                →
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default HowItWorks