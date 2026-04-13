import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import FormInput from '../../components/FormInput.jsx'
import Button from '../../components/Button.jsx'
import './RegisterStep3.css'

export default function RegisterStep3({ onBack, onNext, formData, setFormData }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.bankName?.trim()) errs.bankName = 'Bank name is required.'
    if (!formData.accountName?.trim()) errs.accountName = 'Account name is required.'
    if (!formData.accountNo?.trim()) errs.accountNo = 'Account number is required.'
    if (!formData.sssNumber?.trim()) errs.sssNumber = 'SSS number is required.'
    if (!formData.pagIbigNumber?.trim()) errs.pagIbigNumber = 'Pag-IBIG number is required.'
    if (!formData.philhealthNumber?.trim()) errs.philhealthNumber = 'Philhealth number is required.'
    if (!formData.tinNumber?.trim()) errs.tinNumber = 'TIN number is required.'
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
            <h2 className="reg-step__title">Bank and Government Details</h2>
            <p className="reg-step__subtitle">Please fill out the required fields in the form to complete your registration.*</p>
          </div>
          <div className="reg-step__actions">
            <Button variant="secondary" size="sm" onClick={onBack}>BACK</Button>
            <Button variant="primary" size="sm" onClick={handleNext}>NEXT</Button>
          </div>
        </div>

        <div className="reg-step__progress">
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--active" />
          <span className="reg-step__progress-bar" />
        </div>

        {/* BANK DETAILS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">🏦</span> BANK DETAILS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--3">
            <FormInput
              label="BANK NAME"
              type="text"
              name="bankName"
              value={formData.bankName || ''}
              onChange={handleChange}
              error={errors.bankName}
              required
            />
            <FormInput
              label="ACCOUNT NAME"
              type="text"
              name="accountName"
              value={formData.accountName || ''}
              onChange={handleChange}
              error={errors.accountName}
              required
            />
            <FormInput
              label="ACCOUNT NO"
              type="text"
              name="accountNo"
              value={formData.accountNo || ''}
              onChange={handleChange}
              error={errors.accountNo}
              required
            />
          </div>
        </section>

        {/* GOVERNMENT CONTRIBUTIONS */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">⚙️</span> GOVERNMENT CONTRIBUTIONS
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--2">
            <FormInput
              label="SSS NUMBER"
              type="text"
              name="sssNumber"
              value={formData.sssNumber || ''}
              onChange={handleChange}
              error={errors.sssNumber}
              required
            />
            <FormInput
              label="PAG-IBIG NUMBER"
              type="text"
              name="pagIbigNumber"
              value={formData.pagIbigNumber || ''}
              onChange={handleChange}
              error={errors.pagIbigNumber}
              required
            />
          </div>
          <div className="reg-grid reg-grid--2" style={{ marginTop: 12 }}>
            <FormInput
              label="PHILHEALTH NUMBER"
              type="text"
              name="philhealthNumber"
              value={formData.philhealthNumber || ''}
              onChange={handleChange}
              error={errors.philhealthNumber}
              required
            />
            <FormInput
              label="TIN NUMBER"
              type="text"
              name="tinNumber"
              value={formData.tinNumber || ''}
              onChange={handleChange}
              error={errors.tinNumber}
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
