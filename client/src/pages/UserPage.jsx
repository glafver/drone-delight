import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useUser } from '../contexts/UserContext'

const UserPage = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const { user, logout } = useUser()

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:3001/orders?userId=${user.id}`)
                const data = await res.json()
                setOrders(data)
            } catch {
                console.error('Failed to fetch orders')
            }
        }

        fetchOrders()
    }, [navigate])

    return (
        <>
            <Header />
            <div className="container mx-auto grow py-10 text-center">
                {user && (
                    <div className='flex w-3/4 mx-auto justify-between mb-10 p-6'>
                        <h1 className="text-4xl font-gluten text-amber-600 font-bold text-center">
                            Hello {user.username}!
                        </h1>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className=" text-xl underline text-amber-600 px-4 py-2 rounded hover:text-amber-500 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}

                <h2 className='text-2xl font-semibold text-emerald-500 text-center'>Your Favorites</h2>


                <h2 className='text-2xl font-semibold text-emerald-500 text-center'>Your Orders</h2>
                {orders.length > 0 ? (
                    <ul className="space-y-6 md:w-3/4 mx-auto p-6">
                        {orders.map((order) => (
                            <div key={order.id} className="p-4 flex items-center justify-between rounded shadow-lg">
                                <div className='flex flex-col lg:flex-row lg:gap-12'>
                                    <p className="font-bold">Order: {order.id}</p>
                                    <p className="">{new Date(order.date).toLocaleDateString()}</p>
                                    <p>Total: <strong>{order.order.total} kr</strong></p>
                                </div>

                                <button
                                    onClick={() => navigate(`/order/${order.id}`)}
                                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-400 transition"
                                >
                                    Go to Order
                                </button>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>You have no orders.</p>
                )}

            </div>
            <Footer />
        </>
    )
}

export default UserPage
