import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import FormInput from '../../components/FormInput.jsx'
import Button from '../../components/Button.jsx'
import './RegisterStep1.css'

export default function RegisterStep1({ onNext, formData, setFormData }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.email) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address.'
    if (!formData.password) errs.password = 'Password is required.'
    else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (!formData.firstName?.trim()) errs.firstName = 'First name is required.'
    if (!formData.middleName?.trim()) errs.middleName = 'Middle name is required.'
    if (!formData.lastName?.trim()) errs.lastName = 'Last name is required.'
    if (!formData.employeeId?.trim()) errs.employeeId = 'Employee ID is required.'
    if (!formData.position?.trim()) errs.position = 'Position is required.'
    if (!formData.department) errs.department = 'Department is required.'
    if (!formData.dateEmployed) errs.dateEmployed = 'Date employed is required.'
    if (!formData.company) errs.company = 'Company is required.'
    if (!formData.office) errs.office = 'Office is required.'
    return errs
  }

  const handleNext = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onNext()
  }

  return (
    <AuthLayout panelTitle="REGISTER" panelSubtitle="Create your GeoSync account">
      <div className="reg-step">
        <div className="reg-step__header">
          <div className="reg-step__meta">
            <h2 className="reg-step__title">Step 1 of 2 — Employee Information</h2>
            <p className="reg-step__subtitle">Please fill out the required fields in the form to complete your registration.*</p>
          </div>
          <div className="reg-step__actions">
            <Button variant="secondary" size="sm" disabled>BACK</Button>
            <Button variant="primary" size="sm" onClick={handleNext}>NEXT</Button>
          </div>
        </div>

        <div className="reg-step__progress">
          <span className="reg-step__progress-bar reg-step__progress-bar--active" />
          <span className="reg-step__progress-bar" />
          <span className="reg-step__progress-bar" />
        </div>

        {/* LOG IN CREDENTIALS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">🔐</span> LOG IN CREDENTIALS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--2">
            <FormInput
              label="EMAIL"
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />
            <FormInput
              label="PASSWORD"
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              error={errors.password}
              required
              autoComplete="new-password"
            />
          </div>
        </section>

        {/* FULL NAME */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">👤</span> FULL NAME
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--3">
            <FormInput
              label="FIRST NAME"
              type="text"
              name="firstName"
              placeholder="i.e Juan"
              value={formData.firstName || ''}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <FormInput
              label="MIDDLE NAME"
              type="text"
              name="middleName"
              placeholder="i.e Tibay"
              value={formData.middleName || ''}
              onChange={handleChange}
              error={errors.middleName}
              required
            />
            <FormInput
              label="LAST NAME"
              type="text"
              name="lastName"
              placeholder="i.e Dela Cruz"
              value={formData.lastName || ''}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>
        </section>

        {/* EMPLOYMENT DETAILS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">💼</span> EMPLOYMENT DETAILS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--3">
            <FormInput
              label="EMPLOYEE ID"
              type="text"
              name="employeeId"
              value={formData.employeeId || ''}
              onChange={handleChange}
              error={errors.employeeId}
              required
            />
            <FormInput
              label="POSITION"
              type="text"
              name="position"
              value={formData.position || ''}
              onChange={handleChange}
              error={errors.position}
              required
            />
            <div className="reg-field">
              <label className="reg-field__label">DEPARTMENT <span className="reg-field__required">*</span></label>
              <select
                className={`reg-field__select${errors.department ? ' reg-field__select--error' : ''}`}
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
              >
                <option value="" disabled />
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
              {errors.department && <span className="reg-field__error">{errors.department}</span>}
            </div>
          </div>
          <div className="reg-grid reg-grid--3" style={{ marginTop: 16 }}>
            <FormInput
              label="DATE EMPLOYED"
              type="date"
              name="dateEmployed"
              placeholder="mm/dd/yyyy"
              value={formData.dateEmployed || ''}
              onChange={handleChange}
              error={errors.dateEmployed}
              required
            />
            <div className="reg-field">
              <label className="reg-field__label">COMPANY <span className="reg-field__required">*</span></label>
              <select
                className={`reg-field__select${errors.company ? ' reg-field__select--error' : ''}`}
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
              >
                <option value="" disabled />
                <option value="GeoSpectrum">GeoSpectrum</option>
                <option value="GeoSync">GeoSync</option>
              </select>
              {errors.company && <span className="reg-field__error">{errors.company}</span>}
            </div>
            <div className="reg-field">
              <label className="reg-field__label">OFFICE <span className="reg-field__required">*</span></label>
              <select
                className={`reg-field__select${errors.office ? ' reg-field__select--error' : ''}`}
                name="office"
                value={formData.office || ''}
                onChange={handleChange}
              >
                <option value="" disabled />
                <option value="Main">Main</option>
                <option value="Branch">Branch</option>
              </select>
              {errors.office && <span className="reg-field__error">{errors.office}</span>}
            </div>
          </div>
        </section>

        <div className="reg-step__footer">
          <p className="reg-step__login-text">
            Already registered?{' '}
            <Link to="/login" className="reg-step__login-link">Login here</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
