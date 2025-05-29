import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useUser } from '../contexts/UserContext'

const LoginPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { user, login } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch(`http://localhost:3001/users?email=${username}&password=${password}`)
            const data = await res.json()

            if (data.length > 0) {
                const existingUser = data[0]
                login({ id: existingUser.id, username: existingUser.username })
                setError('')
                navigate(`/user/${existingUser.id}`)
            } else {
                setError('Invalid username or password')
            }
        } catch {
            setError('Something went wrong')
        }
    }

    return (
        <>
            <Header />
            <div className="container grow mx-auto flex items-start justify-center min-h-[70vh]">
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded w-full max-w-sm space-y-4 mb-12">
                    <h1 className="text-2xl font-semibold text-center">Login</h1>

                    <div>
                        <label className="block font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            required
                        />
                    </div>

                    <p className="text-red-700 text-sm h-4">{error}</p>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-500 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm mt-12">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-amber-600 hover:underline"
                        >
                            Create an account
                        </button>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default LoginPage
