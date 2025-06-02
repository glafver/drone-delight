import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import swish from '../assets/swish-logo.svg'
import swishQR from '../assets/swish-qr.png'
import OrderItem from '../components/OrderItem'
import { useUser } from '../contexts/UserContext'
import axios from 'axios'
import { Fade } from "react-awesome-reveal";

export default function CheckoutPage() {
  const [rememberMe, setRememberMe] = useState(false)
  const [order, setOrder] = useState({ items: [], total: 0 })
  const [showPopup, setShowPopup] = useState(false)
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'swish'
  })
  const [card, setCard] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  })

  const navigate = useNavigate()
  const { user } = useUser()
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (user && user.savedForm) {
      setRememberMe(true)
      setForm(user.savedForm)
    } else {
      const savedForm = localStorage.getItem('savedForm')
      if (savedForm) {
        setForm(JSON.parse(savedForm))
        setRememberMe(true)
      }
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('order')
    if (stored) {
      setOrder(JSON.parse(stored))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setCard({ ...card, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rememberMe) {
      localStorage.setItem('savedForm', JSON.stringify(form))
      if (user) {
        await axios.patch(`${baseUrl}/users/save-form/${user.id}`, {
          savedForm: form,
        });
      }
    } else {
      localStorage.removeItem('savedForm')
    }

    setShowPopup(true)
  }

  const handleConfirmPayment = async () => {
    try {
      const fullOrder = {
        ...form,
        order: {
          items: order.items.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          total: order.total,
          count: order.count
        },
        date: new Date().toISOString(),
        userId: user ? user.id : null
      }

      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullOrder)
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      const savedOrder = await response.json()

      setOrder({ items: [], total: 0 })
      localStorage.removeItem('order')
      setShowPopup(false)

      navigate(`/order/${savedOrder.id}/new`)
    } catch (error) {
      console.error(error)
      alert('There was a problem confirming your payment. Please try again.')
    }
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
    if (!e.target.checked) {
      localStorage.removeItem('savedForm')
      setForm({
        name: '',
        address: '',
        phone: '',
        email: '',
        paymentMethod: 'swish'
      })
    }
  }

  return (
    <>
      <Header />
      <div className="container grow mx-auto px-4 py-10">
        <Fade>
        <form onSubmit={handleSubmit} >
          <h1 className="text-4xl font-gluten text-amber-500 font-bold mb-10 text-center">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className='px-6 p-4'>
              <h3 className='text-2xl font-semibold mb-6'>Ordered items</h3>
              {order.items.map(item => (
                <OrderItem item={item} key={item._id} />
              ))}
              <div className="text-right text-2xl font-semibold mt-6">
                Total: <span className="ms-6 ">{order.total} kr</span>
              </div>
            </div>


            <div className="bg-white p-4 space-y-4">
              <h3 className='text-2xl font-semibold '>Delivery Details</h3>
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Sven Svensson"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Exempelgatan 12, 211 00 Malmö"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="info@example.se"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  pattern='^\+?[0-9\s\-]{7,}$'
                  title='Phone number must be at least 7 digits long and can include +, spaces, and dashes'
                  name="phone"
                  placeholder="+46 123 456 789"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />

              </div>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => handleRememberMeChange(e)}
                  className="w-4 h-4"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </label>
              </div>
              <div className='mt-12'>
                <h3 className='text-2xl font-semibold '>Payment Method</h3>
                <div className="flex flex-col gap-6 mt-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="swish"
                      checked={form.paymentMethod === 'swish'}
                      onChange={handleChange}
                    />
                    <img src={swish} className='h-6' alt="" />

                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    Card
                  </label>
                </div>
              </div>
            </div>

          </div>
          <div className="text-center pt-12 pb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-amber-500 hover:underline transition py-3 px-6"
            >
              Back
            </button>
            <button
              type='submit'
              className="bg-amber-500 hover:bg-amber-400 transition text-white font-semibold py-3 px-6 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={
                !form.name.trim() ||
                !form.address.trim() ||
                !form.phone.trim() ||
                !form.email.trim() ||
                !form.paymentMethod
              }
            >
              Confirm Order
            </button>
          </div>
          {showPopup && (
            <div className="fixed inset-0 bg-black/50 w-screen p-10 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-sm w-full relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-4 text-gray-400 hover:text-black text-2xl"
                >
                  &times;
                </button>

                {form.paymentMethod === 'swish' ? (
                  <div className="text-center space-y-8">
                    <img src={swishQR} alt="" className='' />
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      className="bg-amber-500 hover:bg-amber-400 w-full text-white font-semibold py-3 px-6  rounded-lg"
                    >
                      Confirm Payment
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold text-amber-500 text-center">Card Payment</h2>
                    <input
                      name="cardNumber"
                      onChange={handleChange}
                      type="text"
                      placeholder="Card Number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <div className="flex gap-4">
                      <input
                        name="expiry"
                        onChange={handleChange}
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <input
                        name="cvc"
                        onChange={handleChange}
                        type="text"
                        placeholder="CVC"
                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={
                        !card.cardNumber.trim() ||
                        !card.expiry.trim() ||
                        !card.cvc.trim()
                      }
                      className="bg-amber-500 w-full hover:bg-amber-400 text-white font-semibold py-3 px-6 mx-auto rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      Confirm Payment
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </form>
        </Fade>
      </div>
      <Footer />
    </>
  )
}
