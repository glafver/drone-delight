import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useUser } from '../contexts/UserContext'
import Card from '../components/Card'
import { Fade } from "react-awesome-reveal"

const UserPage = () => {
    const [orders, setOrders] = useState([])
    const [favoriteDishes, setFavoriteDishes] = useState([])
    const navigate = useNavigate()

    const { user, logout } = useUser()
    const baseUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${baseUrl}/orders/user/${user.id}`)
                const data = await res.json()
                setOrders(data)
            } catch {
                console.error('Failed to fetch orders')
            }
        }

        const fetchFavorites = async () => {
            try {
                const res = await fetch(`${baseUrl}/products`)
                const allDishes = await res.json()
                const favs = allDishes.filter(dish => user.favorites.includes(dish._id))
                setFavoriteDishes(favs)
            } catch {
                console.error('Failed to fetch favorite dishes')
            }
        }

        fetchOrders()
        fetchFavorites()
    }, [navigate])

    return (
        <>
            <Header />
            <div className="container mx-auto grow py-10 text-center">
                <Fade>
                    {user && (
                        <div className='flex flex-col mx-auto justify-between mb-10'>
                            <h1 className="text-4xl font-gluten text-amber-500 font-bold text-center">
                                Hello {user.username}!
                            </h1>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className=" text-md hover:underline px-2 rounded text-amber-500 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    <h2 className='text-2xl mb-8 font-semibold text-center'>Your Favorites</h2>
                    {favoriteDishes.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6">
                            {favoriteDishes.map(dish => (
                                <Card key={dish._id} dish={dish} />
                            ))}
                        </div>
                    ) : (
                        <p className='mb-12'>You have no favorite dishes yet.</p>
                    )}

                    <h2 className='text-2xl mt-24 mb-8 font-semibold text-center'>Your Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-6 md:w-3/4 mx-auto p-8">
                            {orders.map((order) => (
                                <div key={order._id} className="p-4 flex items-center justify-between rounded-lg shadow-md">
                                    <div className='flex flex-col lg:flex-row lg:gap-12'>
                                        <p className=""><strong>Order:</strong> {order.id}</p>
                                        <p className="">{new Date(order.date).toLocaleDateString()}</p>
                                        <p><strong>Total:</strong> {order.order.total} kr</p>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/order/${order._id}`)}
                                        className="text-emerald-500  px-4 py-2 hover:underline"
                                    >
                                        Go to Order
                                    </button>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no orders.</p>
                    )}
                </Fade>
            </div>
            <Footer />
        </>
    )
}

export default UserPage
