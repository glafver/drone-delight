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
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Login failed');
                return;
            }

            const data = await res.json();

            login({
                id: data.user.id,
                username: data.user.username,
                savedForm: data.user.savedForm || null,
                favorites: data.user.favorites || [],
            });
            setError('');
            navigate(`/user/${data.id}`);
        } catch (error) {
            setError('Something went wrong');
        }
    }

    return (
        <>
            <Header />
            <div className="container grow mx-auto flex items-start justify-center min-h-[70vh]">
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg w-full max-w-sm space-y-4 mb-12">
                    <h1 className="text-2xl font-semibold text-center">Login</h1>

                    <div>
                        <label className="block font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <p className="text-red-700 text-sm h-4">{error}</p>

                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-400 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm mt-12">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-amber-500 hover:underline"
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
