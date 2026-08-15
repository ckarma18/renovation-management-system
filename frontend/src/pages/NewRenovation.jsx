import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function NewRenovation() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        projectType: '',
        propertyType: '',
        areas: [],
        budget: '',
        preferredDate: '',
        address: '',
        description: '',
    })

    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    const handleAreaChange = (event) => {
        const { value, checked } = event.target

        setFormData((previousData) => ({
            ...previousData,
            areas: checked
                ? [...previousData.areas, value]
                : previousData.areas.filter((area) => area !== value),
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        setSuccessMessage('')
        setErrorMessage('')



        const requestData = {
            customerName: formData.customerName.trim(),
            phoneNumber: formData.phoneNumber.trim(),

            propertyAddress: formData.address.trim(),

            renovationType: formData.projectType,

            propertyType: formData.propertyType,

            renovationAreas:
                formData.areas.join(', '),

            preferredDate:
                formData.preferredDate || null,

            description:
                formData.description.trim(),

            estimatedBudget:
                Number(formData.budget),

            status: 'PENDING',
        }

        try {
            const response = await api.post(
                '/api/renovations',
                requestData
            )

            setSuccessMessage(
                response.data?.message ||
                'Renovation request created successfully.'
            )

            // Clear form after successful submission
            setFormData({
                customerName: '',
                phoneNumber: '',
                projectType: '',
                propertyType: '',
                areas: [],
                budget: '',
                preferredDate: '',
                address: '',
                description: '',
            })

            setTimeout(() => {
                navigate('/customer/renovations')
            }, 1200)

        } catch (error) {
            console.error('Renovation request error:', error)

            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message)
            } else if (error.response?.status === 401) {
                setErrorMessage(
                    'Your login session has expired. Please login again.'
                )
            } else if (error.response?.status === 403) {
                setErrorMessage(
                    'You do not have permission to create a renovation request.'
                )
            } else {
                setErrorMessage(
                    'Unable to create renovation request. Please try again.'
                )
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dashboard-layout">

            <DashboardSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-label">
                            NEW PROJECT
                        </p>

                        <h1>Start a Renovation</h1>

                        <p>
                            Tell us about your property and what you would like
                            to renovate or remodel.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="secondary-dashboard-button"
                        onClick={() =>
                            navigate('/customer/renovations')
                        }
                    >
                        ← My Renovations
                    </button>
                </header>

                <form
                    className="renovation-form"
                    onSubmit={handleSubmit}
                >

                    {/* CUSTOMER INFORMATION */}
                    <section className="renovation-form-section">

                        <div className="form-section-heading">
                            <span>01</span>

                            <div>
                                <h2>Customer Information</h2>

                                <p>
                                    Enter the contact information for this
                                    renovation request.
                                </p>
                            </div>
                        </div>

                        <div className="two-column-form">

                            <div className="form-group">
                                <label htmlFor="customerName">
                                    Customer Name
                                </label>

                                <input
                                    id="customerName"
                                    type="text"
                                    name="customerName"
                                    placeholder="Enter your full name"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">
                                    Phone Number
                                </label>

                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Enter 10 digit phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    title="Phone number must contain exactly 10 digits"
                                    required
                                />
                            </div>

                        </div>

                    </section>

                    {/* PROJECT TYPE */}
                    <section className="renovation-form-section">

                        <div className="form-section-heading">
                            <span>02</span>

                            <div>
                                <h2>Project Type</h2>

                                <p>
                                    What kind of renovation project are
                                    you planning?
                                </p>
                            </div>
                        </div>

                        <div className="selection-grid">

                            <label className="selection-card">
                                <input
                                    type="radio"
                                    name="projectType"
                                    value="FULL_RENOVATION"
                                    checked={
                                        formData.projectType ===
                                        'FULL_RENOVATION'
                                    }
                                    onChange={handleChange}
                                    required
                                />

                                <strong>
                                    Full Property Renovation
                                </strong>

                                <span>
                                    Renovate most or all areas of the
                                    property.
                                </span>
                            </label>

                            <label className="selection-card">
                                <input
                                    type="radio"
                                    name="projectType"
                                    value="PARTIAL_RENOVATION"
                                    checked={
                                        formData.projectType ===
                                        'PARTIAL_RENOVATION'
                                    }
                                    onChange={handleChange}
                                />

                                <strong>
                                    Partial Renovation
                                </strong>

                                <span>
                                    Renovate multiple selected areas of
                                    the property.
                                </span>
                            </label>

                            <label className="selection-card">
                                <input
                                    type="radio"
                                    name="projectType"
                                    value="SINGLE_AREA"
                                    checked={
                                        formData.projectType ===
                                        'SINGLE_AREA'
                                    }
                                    onChange={handleChange}
                                />

                                <strong>Single Area</strong>

                                <span>
                                    Renovate one room or specific part
                                    of the property.
                                </span>
                            </label>

                            <label className="selection-card">
                                <input
                                    type="radio"
                                    name="projectType"
                                    value="REMODEL"
                                    checked={
                                        formData.projectType ===
                                        'REMODEL'
                                    }
                                    onChange={handleChange}
                                />

                                <strong>
                                    Remodel / Layout Change
                                </strong>

                                <span>
                                    Change the design, layout, structure,
                                    or function.
                                </span>
                            </label>

                            <label className="selection-card">
                                <input
                                    type="radio"
                                    name="projectType"
                                    value="REPAIR_RESTORATION"
                                    checked={
                                        formData.projectType ===
                                        'REPAIR_RESTORATION'
                                    }
                                    onChange={handleChange}
                                />

                                <strong>
                                    Repair & Restoration
                                </strong>

                                <span>
                                    Repair damage or restore an existing
                                    space.
                                </span>
                            </label>

                        </div>

                    </section>

                    {/* PROPERTY TYPE */}
                    <section className="renovation-form-section">

                        <div className="form-section-heading">
                            <span>03</span>

                            <div>
                                <h2>Property Type</h2>

                                <p>
                                    What type of property is being
                                    renovated?
                                </p>
                            </div>
                        </div>

                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select property type
                            </option>

                            <option value="HOUSE">
                                House
                            </option>

                            <option value="APARTMENT">
                                Apartment
                            </option>

                            <option value="OFFICE">
                                Office
                            </option>

                            <option value="SHOP">
                                Shop / Commercial Space
                            </option>

                            <option value="OTHER">
                                Other
                            </option>
                        </select>

                    </section>

                    {/* AREAS */}
                    <section className="renovation-form-section">

                        <div className="form-section-heading">
                            <span>04</span>

                            <div>
                                <h2>Areas to Renovate</h2>

                                <p>
                                    Select every area included in your
                                    project.
                                </p>
                            </div>
                        </div>

                        <div className="area-grid">

                            {[
                                'Kitchen',
                                'Bathroom / Toilet',
                                'Living Room',
                                'Bedroom',
                                'Dining Room',
                                'Home Office',
                                'Flooring',
                                'Walls & Painting',
                                'Ceiling',
                                'Doors & Windows',
                                'Electrical',
                                'Plumbing',
                                'Exterior',
                                'Roof',
                                'Balcony / Terrace',
                                'Other',
                            ].map((area) => (

                                <label
                                    className="area-option"
                                    key={area}
                                >
                                    <input
                                        type="checkbox"
                                        value={area}
                                        checked={
                                            formData.areas.includes(area)
                                        }
                                        onChange={handleAreaChange}
                                    />

                                    {area}
                                </label>

                            ))}

                        </div>

                    </section>

                    {/* PROJECT INFORMATION */}
                    <section className="renovation-form-section">

                        <div className="form-section-heading">
                            <span>05</span>

                            <div>
                                <h2>Project Information</h2>

                                <p>
                                    Give us some practical details about
                                    your renovation.
                                </p>
                            </div>
                        </div>

                        <div className="two-column-form">

                            <div className="form-group">

                                <label htmlFor="budget">
                                    Estimated Budget
                                </label>

                                <input
                                    id="budget"
                                    type="number"
                                    name="budget"
                                    min="1"
                                    step="0.01"
                                    placeholder="Enter estimated budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="preferredDate">
                                    Preferred Start Date
                                </label>

                                <input
                                    id="preferredDate"
                                    type="date"
                                    name="preferredDate"
                                    value={formData.preferredDate}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="address">
                                Property Address
                            </label>

                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Enter property address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="description">
                                Describe Your Renovation
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                placeholder="Tell us what you want to change, repair, remodel, or improve..."
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>

                    </section>

                    {/* MESSAGES */}

                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}

                    {/* ACTION BUTTONS */}

                    <div className="renovation-form-actions">

                        <button
                            type="button"
                            className="secondary-dashboard-button"
                            onClick={() =>
                                navigate('/customer/renovations')
                            }
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? 'Submitting...'
                                : 'Submit Renovation Request →'}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    )
}

export default NewRenovation