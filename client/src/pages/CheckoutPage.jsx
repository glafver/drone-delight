import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import swish from '../assets/swish-logo.svg'
import swishQR from '../assets/swish-QR.png'
import OrderItem from '../components/OrderItem'
import { useUser } from '../contexts/UserContext'

export default function CheckoutPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const handleConfirmPayment = async () => {
    try {
      const fullOrder = {
        ...form,
        order,
        payment: {
          ...card
        },
        date: new Date().toISOString(),
        userId: user ? user.id : null
      }

      const response = await fetch('http://localhost:3001/orders', {
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

      navigate(`/order/${savedOrder.id}`)
    } catch (error) {
      console.error(error)
      alert('There was a problem confirming your payment. Please try again.')
    }
  }

  return (
    <>
      <Header />
      <div className="container grow mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} >
          <h1 className="text-4xl font-gluten text-amber-600 font-bold mb-10 text-center">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {order.items.map(item => (
                <OrderItem item={item} key={item.id} />
              ))}
              <div className="text-right text-3xl font-bold mt-6 p-4">
                Total: <span className="ms-6 text-emerald-500">{order.total} kr</span>
              </div>
            </div>


            <div className="bg-white p-4 space-y-6">
              <h3 className='text-2xl font-semibold text-amber-600'>Delivery Details</h3>
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main St, City, Country"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
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
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div className='mt-12'>
                <h3 className='text-2xl font-semibold text-amber-600'>Payment Method</h3>
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
              type='submit'
              className="bg-amber-600 hover:bg-amber-500 transition text-white font-semibold py-3 px-6 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
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
              <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
                >
                  &times;
                </button>

                {form.paymentMethod === 'swish' ? (
                  <div className="text-center space-y-14 p-6">
                    <img src={swishQR} alt="" className='' />
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6  rounded-lg"
                    >
                      Confirm Payment
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold text-amber-600 text-center">Card Payment</h2>
                    <input
                      name="cardNumber"
                      onChange={handleChange}
                      type="text"
                      placeholder="Card Number"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <div className="flex gap-4">
                      <input
                        name="expiry"
                        onChange={handleChange}
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                      />
                      <input
                        name="cvc"
                        onChange={handleChange}
                        type="text"
                        placeholder="CVC"
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
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
                      className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 mx-auto rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      Confirm Payment
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  )
}
