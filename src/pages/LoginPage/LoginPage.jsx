import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout.jsx'
import FormInput from '../../components/FormInput.jsx'
import Button from '../../components/Button.jsx'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.password) errs.password = 'Password is required.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <AuthLayout panelTitle="WELCOME" panelSubtitle="Login using your registered email">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="account@company.com"
          value={form.email}
          onChange={handleChange}
          helpText="Enter your registered email address"
          error={errors.email}
          required
          autoComplete="email"
        />

        <div className="login-form__password-row">
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder=""
            value={form.password}
            onChange={handleChange}
            helpText="Enter your password"
            error={errors.password}
            required
            autoComplete="current-password"
          />
          <Link to="/forgot-password" className="login-form__forgot">
            Forgot password?
          </Link>
        </div>

        <div className="login-form__submit">
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Submit
          </Button>
        </div>

        <div className="login-form__divider" />

        <p className="login-form__register">
          Don't have an account?{' '}
          <Link to="/register" className="login-form__register-link">
            Register here
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
