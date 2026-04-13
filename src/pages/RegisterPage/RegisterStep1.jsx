// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import AuthLayout from '../../components/AuthLayout.jsx'
// import FormInput from '../../components/FormInput.jsx'
// import Button from '../../components/Button.jsx'
// import './RegisterStep1.css'

// export default function RegisterStep1({ onNext, formData, setFormData }) {
//   const [errors, setErrors] = useState({})

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const validate = () => {
//     const errs = {}
//     if (!formData.email) errs.email = 'Email is required.'
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address.'
//     if (!formData.password) errs.password = 'Password is required.'
//     else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters.'
//     if (!formData.firstName?.trim()) errs.firstName = 'First name is required.'
//     if (!formData.middleName?.trim()) errs.middleName = 'Middle name is required.'
//     if (!formData.lastName?.trim()) errs.lastName = 'Last name is required.'
//     if (!formData.employeeId?.trim()) errs.employeeId = 'Employee ID is required.'
//     if (!formData.position?.trim()) errs.position = 'Position is required.'
//     if (!formData.department) errs.department = 'Department is required.'
//     if (!formData.dateEmployed) errs.dateEmployed = 'Date employed is required.'
//     if (!formData.company) errs.company = 'Company is required.'
//     if (!formData.office) errs.office = 'Office is required.'
//     return errs
//   }

//   const handleNext = () => {
//     const errs = validate()
//     if (Object.keys(errs).length) { setErrors(errs); return }
//     onNext()
//   }

//   return (
//     <AuthLayout panelTitle="REGISTER" panelSubtitle="Create your GeoSync account">
//       <div className="reg-step">
//         <div className="reg-step__header">
//           <div className="reg-step__meta">
//             <h2 className="reg-step__title">Step 1 of 2 — Employee Information</h2>
//             <p className="reg-step__subtitle">Please fill out the required fields in the form to complete your registration.*</p>
//           </div>
//           <div className="reg-step__actions">
//             <Button variant="secondary" size="sm" disabled>BACK</Button>
//             <Button variant="primary" size="sm" onClick={handleNext}>NEXT</Button>
//           </div>
//         </div>

//         <div className="reg-step__progress">
//           <span className="reg-step__progress-bar reg-step__progress-bar--active" />
//           <span className="reg-step__progress-bar" />
//           <span className="reg-step__progress-bar" />
//         </div>

//         {/* LOG IN CREDENTIALS */}
//         <section className="reg-section">
//           <h3 className="reg-section__title">
//             <span className="reg-section__icon">🔐</span> LOG IN CREDENTIALS
//           </h3>
//           <div className="reg-section__divider" />
//           <div className="reg-grid reg-grid--2">
//             <FormInput
//               label="EMAIL"
//               type="email"
//               name="email"
//               value={formData.email || ''}
//               onChange={handleChange}
//               error={errors.email}
//               required
//               autoComplete="email"
//             />
//             <FormInput
//               label="PASSWORD"
//               type="password"
//               name="password"
//               value={formData.password || ''}
//               onChange={handleChange}
//               error={errors.password}
//               required
//               autoComplete="new-password"
//             />
//           </div>
//         </section>

//         {/* FULL NAME */}
//         <section className="reg-section">
//           <h3 className="reg-section__title">
//             <span className="reg-section__icon">👤</span> FULL NAME
//           </h3>
//           <div className="reg-section__divider" />
//           <div className="reg-grid reg-grid--3">
//             <FormInput
//               label="FIRST NAME"
//               type="text"
//               name="firstName"
//               placeholder="i.e Juan"
//               value={formData.firstName || ''}
//               onChange={handleChange}
//               error={errors.firstName}
//               required
//             />
//             <FormInput
//               label="MIDDLE NAME"
//               type="text"
//               name="middleName"
//               placeholder="i.e Tibay"
//               value={formData.middleName || ''}
//               onChange={handleChange}
//               error={errors.middleName}
//               required
//             />
//             <FormInput
//               label="LAST NAME"
//               type="text"
//               name="lastName"
//               placeholder="i.e Dela Cruz"
//               value={formData.lastName || ''}
//               onChange={handleChange}
//               error={errors.lastName}
//               required
//             />
//           </div>
//         </section>

//         {/* EMPLOYMENT DETAILS */}
//         <section className="reg-section">
//           <h3 className="reg-section__title">
//             <span className="reg-section__icon">💼</span> EMPLOYMENT DETAILS
//           </h3>
//           <div className="reg-section__divider" />
//           <div className="reg-grid reg-grid--3">
//             <FormInput
//               label="EMPLOYEE ID"
//               type="text"
//               name="employeeId"
//               value={formData.employeeId || ''}
//               onChange={handleChange}
//               error={errors.employeeId}
//               required
//             />
//             <FormInput
//               label="POSITION"
//               type="text"
//               name="position"
//               value={formData.position || ''}
//               onChange={handleChange}
//               error={errors.position}
//               required
//             />
//             <div className="reg-field">
//               <label className="reg-field__label">DEPARTMENT <span className="reg-field__required">*</span></label>
//               <select
//                 className={`reg-field__select${errors.department ? ' reg-field__select--error' : ''}`}
//                 name="department"
//                 value={formData.department || ''}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled />
//                 <option value="IT">IT</option>
//                 <option value="HR">HR</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Operations">Operations</option>
//               </select>
//               {errors.department && <span className="reg-field__error">{errors.department}</span>}
//             </div>
//           </div>
//           <div className="reg-grid reg-grid--3" style={{ marginTop: 16 }}>
//             <FormInput
//               label="DATE EMPLOYED"
//               type="date"
//               name="dateEmployed"
//               placeholder="mm/dd/yyyy"
//               value={formData.dateEmployed || ''}
//               onChange={handleChange}
//               error={errors.dateEmployed}
//               required
//             />
//             <div className="reg-field">
//               <label className="reg-field__label">COMPANY <span className="reg-field__required">*</span></label>
//               <select
//                 className={`reg-field__select${errors.company ? ' reg-field__select--error' : ''}`}
//                 name="company"
//                 value={formData.company || ''}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled />
//                 <option value="GeoSpectrum">GeoSpectrum</option>
//                 <option value="GeoSync">GeoSync</option>
//               </select>
//               {errors.company && <span className="reg-field__error">{errors.company}</span>}
//             </div>
//             <div className="reg-field">
//               <label className="reg-field__label">OFFICE <span className="reg-field__required">*</span></label>
//               <select
//                 className={`reg-field__select${errors.office ? ' reg-field__select--error' : ''}`}
//                 name="office"
//                 value={formData.office || ''}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled />
//                 <option value="Main">Main</option>
//                 <option value="Branch">Branch</option>
//               </select>
//               {errors.office && <span className="reg-field__error">{errors.office}</span>}
//             </div>
//           </div>
//         </section>

//         <div className="reg-step__footer">
//           <p className="reg-step__login-text">
//             Already registered?{' '}
//             <Link to="/login" className="reg-step__login-link">Login here</Link>
//           </p>
//         </div>
//       </div>
//     </AuthLayout>
//   )
// }


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import './RegisterStep1.css'

export default function RegisterStep1({ onNext, formData, setFormData }) {
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

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
      <div className="rs1">

        {/* Header */}
        <div className="rs1__header">
          <div className="rs1__header-left">
            <h2 className="rs1__title">Step 1 of 2 — Employee Information</h2>
            <p className="rs1__subtitle">
              Please fill out the required fields in the form to complete your registration.*
            </p>
          </div>
          <div className="rs1__header-btns">
            <button className="rs1__btn rs1__btn--back" disabled>BACK</button>
            <button className="rs1__btn rs1__btn--next" onClick={handleNext}>NEXT</button>
          </div>
        </div>

        {/* Progress bars */}
        <div className="rs1__progress">
          <span className="rs1__bar rs1__bar--on" />
          <span className="rs1__bar" />
          <span className="rs1__bar" />
        </div>

        {/* ── LOG IN CREDENTIALS ── */}
        <section className="rs1__section">
          <div className="rs1__section-head">
            <span className="rs1__section-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
              </svg>
            </span>
            LOG IN CREDENTIALS
          </div>
          <div className="rs1__divider" />

          <div className="rs1__row rs1__row--2">
            <div className="rs1__field">
              <label className="rs1__label">EMAIL<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.email ? ' rs1__input--err' : ''}`}
                type="email" name="email"
                value={formData.email || ''}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <span className="rs1__errmsg">{errors.email}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">PASSWORD<span className="rs1__req">*</span></label>
              <div className="rs1__pw-wrap">
                <input
                  className={`rs1__input${errors.password ? ' rs1__input--err' : ''}`}
                  style={{ paddingRight: 34 }}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button" className="rs1__pw-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1} aria-label="Toggle password"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </button>
              </div>
              {errors.password && <span className="rs1__errmsg">{errors.password}</span>}
            </div>
          </div>
        </section>

        {/* ── FULL NAME ── */}
        <section className="rs1__section">
          <div className="rs1__section-head">
            <span className="rs1__section-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            FULL NAME
          </div>
          <div className="rs1__divider" />

          <div className="rs1__row rs1__row--3">
            <div className="rs1__field">
              <label className="rs1__label">FIRST NAME<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.firstName ? ' rs1__input--err' : ''}`}
                type="text" name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
              />
              <span className="rs1__hint"><span className="rs1__hint-dot" />i.e Juan</span>
              {errors.firstName && <span className="rs1__errmsg">{errors.firstName}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">MIDDLE NAME<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.middleName ? ' rs1__input--err' : ''}`}
                type="text" name="middleName"
                value={formData.middleName || ''}
                onChange={handleChange}
              />
              <span className="rs1__hint"><span className="rs1__hint-dot" />i.e Tibay</span>
              {errors.middleName && <span className="rs1__errmsg">{errors.middleName}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">LAST NAME<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.lastName ? ' rs1__input--err' : ''}`}
                type="text" name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
              />
              <span className="rs1__hint"><span className="rs1__hint-dot" />i.e Dela Cruz</span>
              {errors.lastName && <span className="rs1__errmsg">{errors.lastName}</span>}
            </div>
          </div>
        </section>

        {/* ── EMPLOYMENT DETAILS ── */}
        <section className="rs1__section">
          <div className="rs1__section-head">
            <span className="rs1__section-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            EMPLOYMENT DETAILS
          </div>
          <div className="rs1__divider" />

          <div className="rs1__row rs1__row--3">
            <div className="rs1__field">
              <label className="rs1__label">EMPLOYEE ID<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.employeeId ? ' rs1__input--err' : ''}`}
                type="text" name="employeeId"
                value={formData.employeeId || ''}
                onChange={handleChange}
              />
              {errors.employeeId && <span className="rs1__errmsg">{errors.employeeId}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">POSITION<span className="rs1__req">*</span></label>
              <input
                className={`rs1__input${errors.position ? ' rs1__input--err' : ''}`}
                type="text" name="position"
                value={formData.position || ''}
                onChange={handleChange}
              />
              {errors.position && <span className="rs1__errmsg">{errors.position}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">DEPARTMENT<span className="rs1__req">*</span></label>
              <div className="rs1__sel-wrap">
                <select
                  className={`rs1__select${errors.department ? ' rs1__input--err' : ''}`}
                  name="department"
                  value={formData.department || ''}
                  onChange={handleChange}
                >
                  <option value="" />
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
                <span className="rs1__sel-arrow">▼</span>
              </div>
              {errors.department && <span className="rs1__errmsg">{errors.department}</span>}
            </div>
          </div>

          <div className="rs1__row rs1__row--3 rs1__row--gap-top">
            <div className="rs1__field">
              <label className="rs1__label">DATE EMPLOYED<span className="rs1__req">*</span></label>
              <div className="rs1__date-wrap">
                <input
                  className={`rs1__input rs1__input--date${errors.dateEmployed ? ' rs1__input--err' : ''}`}
                  type="date" name="dateEmployed"
                  value={formData.dateEmployed || ''}
                  onChange={handleChange}
                />
              </div>
              {errors.dateEmployed && <span className="rs1__errmsg">{errors.dateEmployed}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">COMPANY<span className="rs1__req">*</span></label>
              <div className="rs1__sel-wrap">
                <select
                  className={`rs1__select${errors.company ? ' rs1__input--err' : ''}`}
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                >
                  <option value="" />
                  <option value="GeoSpectrum">GeoSpectrum</option>
                  <option value="GeoSync">GeoSync</option>
                </select>
                <span className="rs1__sel-arrow">▼</span>
              </div>
              {errors.company && <span className="rs1__errmsg">{errors.company}</span>}
            </div>

            <div className="rs1__field">
              <label className="rs1__label">OFFICE<span className="rs1__req">*</span></label>
              <div className="rs1__sel-wrap">
                <select
                  className={`rs1__select${errors.office ? ' rs1__input--err' : ''}`}
                  name="office"
                  value={formData.office || ''}
                  onChange={handleChange}
                >
                  <option value="" />
                  <option value="Main">Main</option>
                  <option value="Branch">Branch</option>
                </select>
                <span className="rs1__sel-arrow">▼</span>
              </div>
              {errors.office && <span className="rs1__errmsg">{errors.office}</span>}
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="rs1__footer">
          Already registered?{' '}
          <Link to="/login" className="rs1__footer-link">Login here</Link>
        </p>

      </div>
    </AuthLayout>
  )
}