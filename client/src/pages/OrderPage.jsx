import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Confetti from 'react-dom-confetti'
import Header from '../components/Header'
import Footer from '../components/Footer'
import OrderItem from '../components/OrderItem'
import { Fade } from "react-awesome-reveal"

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    colors: ['#d97706', '#10b981', '#ec4899', '#06b6d4', '#8b5cf6']
}

export default function OrderPage() {
    const { id } = useParams()
    const location = useLocation()
    const isNewOrder = location.pathname.includes('new')
    const [order, setOrder] = useState(null)
    const [active, setActive] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => setActive(true), 500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`)
                if (!response.ok) {
                    throw new Error('Order not found')
                }
                const data = await response.json()
                setOrder(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchOrder()
    }, [id])

    if (!order) return <p className="text-center mt-10">Loading...</p>

    return (
        <>
            <Header />
            <div className="container grow mx-auto flex flex-col relative px-8 py-10">
            <Fade>
                {isNewOrder ? (
                    <h1 className="text-4xl font-gluten text-amber-500 font-bold lg:mb-10 text-center">Thanks for your order!</h1>
                )
                    : (
                        <h1 className="text-4xl font-gluten text-amber-500 font-bold lg:mb-10 text-center">Your order</h1>
                    )
                }

                <div className='absolute w-full flex justify-center lg:pt-50'>
                    <Confetti active={active && isNewOrder} config={config} />
                </div>

                <div className="w-full max-w-xl bg-white p-6 lg:p-12 rounded-lg shadow-md mx-auto mb-12">
                    <p className="mb-6 text-xl"><strong>Order ID:</strong> {order._id}</p>
                    <p className="mb-6"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>

                    <p className="mb-2"><strong>Name:</strong> {order.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {order.email}</p>
                    <p className="mb-2"><strong>Phone:</strong> {order.phone}</p>
                    <p className="mb-6"><strong>Address:</strong> {order.address}</p>

                    <ul className="list-disc mb-6">
                        {order.order.items.map(item => (
                            <OrderItem item={{ ...item.product, quantity:item.quantity}} key={item._id} />
                        ))}
                    </ul>

                    <p className="text-xl text-end"><strong>Total:</strong> {order.order.total} kr</p>
                </div>
                <div className='text-center'>
                {isNewOrder ? (
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-max px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition mx-auto"
                    >
                        Go to Menu
                    </button>
                )
                    : (
                        <button
                            onClick={() => navigate(-1)}
                            className="w-max px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition mx-auto"
                        >
                            Go Back
                        </button>
                    )
                }
                </div>
</Fade>
            </div>
            <Footer />
        </>
    )
}
