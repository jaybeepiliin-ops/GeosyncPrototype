import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import FormInput from '../../components/FormInput.jsx'
import Button from '../../components/Button.jsx'
import './RegisterStep4.css'

export default function RegisterStep4({ onBack, formData, setFormData }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.fatherName?.trim()) errs.fatherName = "Father's name is required."
    if (!formData.fatherOccupation?.trim()) errs.fatherOccupation = "Father's occupation is required."
    if (!formData.motherName?.trim()) errs.motherName = "Mother's name is required."
    if (!formData.motherOccupation?.trim()) errs.motherOccupation = "Mother's occupation is required."
    if (!formData.spouseName?.trim()) errs.spouseName = "Spouse's name is required."
    if (!formData.parentAddress?.trim()) errs.parentAddress = "Parent's address is required."
    if (!formData.contactPerson?.trim()) errs.contactPerson = 'Contact person is required.'
    if (!formData.contactPersonPhone?.trim()) errs.contactPersonPhone = 'Contact person phone number is required.'
    if (!captchaChecked) errs.captcha = 'Please verify you are not a robot.'
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    navigate('/login')
  }

  return (
    <AuthLayout panelTitle="REGISTER" panelSubtitle="Create your GeoSync account">
      <div className="reg-step">
        <div className="reg-step__header">
          <div className="reg-step__meta">
            <h2 className="reg-step__title">Other Information</h2>
            <p className="reg-step__subtitle">Please fill out the required fields in the form to complete your registration.*</p>
          </div>
          <div className="reg-step__actions">
            <Button variant="secondary" size="sm" onClick={onBack}>BACK</Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>SIGN UP</Button>
          </div>
        </div>

        <div className="reg-step__progress">
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--done" />
          <span className="reg-step__progress-bar reg-step__progress-bar--active" />
        </div>

        {/* FAMILY INFORMATION */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">👨‍👩‍👧</span> FAMILY INFORMATION
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--2">
            <FormInput
              label="Father's Name"
              type="text"
              name="fatherName"
              value={formData.fatherName || ''}
              onChange={handleChange}
              error={errors.fatherName}
              required
            />
            <FormInput
              label="Father's Occupations"
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation || ''}
              onChange={handleChange}
              error={errors.fatherOccupation}
              required
            />
          </div>
          <div className="reg-grid reg-grid--2" style={{ marginTop: 12 }}>
            <FormInput
              label="Mother's Name"
              type="text"
              name="motherName"
              value={formData.motherName || ''}
              onChange={handleChange}
              error={errors.motherName}
              required
            />
            <FormInput
              label="Mother's Occupation"
              type="text"
              name="motherOccupation"
              value={formData.motherOccupation || ''}
              onChange={handleChange}
              error={errors.motherOccupation}
              required
            />
          </div>
          <div className="reg-grid reg-grid--2" style={{ marginTop: 12 }}>
            <FormInput
              label="Spouse's Name"
              type="text"
              name="spouseName"
              value={formData.spouseName || ''}
              onChange={handleChange}
              error={errors.spouseName}
              required
            />
            <FormInput
              label="Parent's Address"
              type="text"
              name="parentAddress"
              value={formData.parentAddress || ''}
              onChange={handleChange}
              error={errors.parentAddress}
              required
            />
          </div>
        </section>

        {/* EMERGENCY CONTACT */}
        <section className="reg-section">
          <h3 className="reg-section__title">
            <span className="reg-section__icon">🚨</span> EMERGENCY CONTACT
          </h3>
          <div className="reg-section__divider" />
          <div className="reg-grid reg-grid--2">
            <FormInput
              label="Contact Person"
              type="text"
              name="contactPerson"
              value={formData.contactPerson || ''}
              onChange={handleChange}
              error={errors.contactPerson}
              required
            />
            <FormInput
              label="Contact Person's Phone Number"
              type="tel"
              name="contactPersonPhone"
              value={formData.contactPersonPhone || ''}
              onChange={handleChange}
              error={errors.contactPersonPhone}
              required
            />
          </div>
        </section>

        {/* reCAPTCHA */}
        <div className="reg-captcha">
          <label className={`reg-captcha__box${errors.captcha ? ' reg-captcha__box--error' : ''}`}>
            <input
              type="checkbox"
              className="reg-captcha__checkbox"
              checked={captchaChecked}
              onChange={(e) => {
                setCaptchaChecked(e.target.checked)
                if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: '' }))
              }}
            />
            <span className="reg-captcha__label">I'm not a robot</span>
            <div className="reg-captcha__logo">
              <div className="reg-captcha__recaptcha-icon">🔄</div>
              <span className="reg-captcha__recaptcha-text">reCAPTCHA</span>
              <span className="reg-captcha__recaptcha-sub">Privacy · Terms</span>
            </div>
          </label>
          {errors.captcha && <span className="reg-field__error">{errors.captcha}</span>}
        </div>

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
