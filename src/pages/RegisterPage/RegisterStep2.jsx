import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import FormInput from '../../components/FormInput.jsx'
import Button from '../../components/Button.jsx'
import './RegisterStep2.css'

export default function RegisterStep2({ onBack, onNext, formData, setFormData }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.'
    if (!formData.gender) errs.gender = 'Gender is required.'
    if (!formData.civilStatus) errs.civilStatus = 'Civil status is required.'
    if (!formData.nationality?.trim()) errs.nationality = 'Nationality is required.'
    if (!formData.mobileNumber?.trim()) errs.mobileNumber = 'Mobile number is required.'
    if (!formData.province?.trim()) errs.province = 'Province is required.'
    if (!formData.municipalityCity?.trim()) errs.municipalityCity = 'Municipality/City is required.'
    if (!formData.streetBarangay?.trim()) errs.streetBarangay = 'Street/Barangay is required.'
    if (!formData.unitHouseNo?.trim()) errs.unitHouseNo = 'Unit/House No. is required.'
    if (!formData.zipCode?.trim()) errs.zipCode = 'Zip code is required.'
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
            <h2 className="reg-step__title">Step 2 of 2 — Employee Information</h2>
            <p className="reg-step__subtitle">Please fill out the required fields in the form to complete your registration.*</p>
          </div>
          <div className="reg-step__actions">
            <Button variant="secondary" size="sm" onClick={onBack}>BACK</Button>
            <Button variant="primary" size="sm" onClick={handleNext}>NEXT</Button>
          </div>
        </div>

        <div className="reg-step__progress">
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--active" />
          <span className="reg-step__progress-bar" />
        </div>

        {/* DEMOGRAPHICS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">🌐</span> DEMOGRAPHICS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--2">
            <FormInput
              label="DATE OF BIRTH"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
              error={errors.dateOfBirth}
              required
            />
            <div className="reg-field">
              <label className="reg-field__label">GENDER <span className="reg-field__required">*</span></label>
              <select
                className={`reg-field__select${errors.gender ? ' reg-field__select--error' : ''}`}
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
              >
                <option value="" disabled />
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="reg-field__error">{errors.gender}</span>}
            </div>
          </div>
          <div className="reg-grid reg-grid--2" style={{ marginTop: 12 }}>
            <div className="reg-field">
              <label className="reg-field__label">CIVIL STATUS <span className="reg-field__required">*</span></label>
              <select
                className={`reg-field__select${errors.civilStatus ? ' reg-field__select--error' : ''}`}
                name="civilStatus"
                value={formData.civilStatus || ''}
                onChange={handleChange}
              >
                <option value="" disabled />
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
              {errors.civilStatus && <span className="reg-field__error">{errors.civilStatus}</span>}
            </div>
            <FormInput
              label="NATIONALITY"
              type="text"
              name="nationality"
              value={formData.nationality || ''}
              onChange={handleChange}
              error={errors.nationality}
              required
            />
          </div>
        </section>

        {/* CONTACTS AND ADDRESS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">📋</span> CONTACTS AND ADDRESS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--3">
            <FormInput
              label="MOBILE NUMBER"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleChange}
              error={errors.mobileNumber}
              required
            />
            <FormInput
              label="PROVINCE"
              type="text"
              name="province"
              value={formData.province || ''}
              onChange={handleChange}
              error={errors.province}
              required
            />
            <FormInput
              label="MUNICIPALITY/ CITY"
              type="text"
              name="municipalityCity"
              value={formData.municipalityCity || ''}
              onChange={handleChange}
              error={errors.municipalityCity}
              required
            />
          </div>
          <div className="reg-grid reg-grid--3" style={{ marginTop: 12 }}>
            <FormInput
              label="STREET/ BARANGAY"
              type="text"
              name="streetBarangay"
              value={formData.streetBarangay || ''}
              onChange={handleChange}
              error={errors.streetBarangay}
              required
            />
            <FormInput
              label="UNIT/ HOUSE NO."
              type="text"
              name="unitHouseNo"
              value={formData.unitHouseNo || ''}
              onChange={handleChange}
              error={errors.unitHouseNo}
              required
            />
            <FormInput
              label="ZIP CODE"
              type="text"
              name="zipCode"
              value={formData.zipCode || ''}
              onChange={handleChange}
              error={errors.zipCode}
              required
            />
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
