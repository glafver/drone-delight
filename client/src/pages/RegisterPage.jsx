import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register user');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  }

  return (
    <>
      <Header />
      <div className="container grow mx-auto flex items-start justify-center min-h-[70vh]">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg w-full max-w-sm space-y-4 mb-12">
          <h1 className="text-2xl font-semibold text-center">Create Account</h1>

          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          <p className="text-red-700 text-sm h-4">{error}</p>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-400 transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-12">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-amber-500 hover:underline"
            >
              Log in here
            </button>
          </p>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default RegisterPage
