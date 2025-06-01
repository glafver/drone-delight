import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RiDeleteBin5Line } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";

export default function CartPage() {
  const [order, setOrder] = useState({ items: [], total: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('order')
    if (stored) {
      setOrder(JSON.parse(stored))
    }
  }, [])

  const updateOrder = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const newOrder = { items, total, count }
    setOrder(newOrder)
    setOrder(newOrder)
    localStorage.setItem('order', JSON.stringify(newOrder))
  }

  const increaseQty = (id) => {
    const items = order.items.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    updateOrder(items)
  }

  const decreaseQty = (id) => {
    const items = order.items
      .map(item =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    updateOrder(items)
  }

  const removeItem = (id) => {
    const items = order.items.filter(item => item._id !== id)
    updateOrder(items)
  }

  const proceedToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <>
      <Header />
      <div className="container grow mx-auto px-8 lg:px-4 py-10">
        <Fade>
          <h1 className="text-4xl font-gluten text-amber-500 font-bold mb-10 text-center">My Cart</h1>

          {order.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-center  mt-6">Your cart is empty.</p>
              <button
                onClick={() => navigate('/menu')}
                className="w-max lg:mt-16 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition mx-auto"
              >
                Go to Menu
              </button>
            </div>
          ) : (

            <div>
              <div className="flex flex-col gap-10 lg:hidden">
                {order.items.map(item => (
                  <div key={item._id} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col gap-6 p-4">
                    <div className='flex justify-between'>
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex items-center gap-5">
                        <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 font-bold text-emerald-500 text-lg">−</button>
                        <span className="">{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="px-3 py-1 font-bold text-emerald-500 text-lg">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-700 text-2xl">
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-6'>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-amber-500 font-bold text-lg">{item.price} kr</p>
                      </div>
                      <div className='font-bold text-lg'>
                        {item.price * item.quantity} kr
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden flex-col gap-10 lg:flex">
                {order.items.map(item => (
                  <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-between p-4">
                    <div className='flex items-center gap-5 lg:gap-10 w-[230px]'>
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-amber-500 font-bold">{item.price} kr</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 lg:gap-10 w-[170px]">
                      <button onClick={() => decreaseQty(item._id)} className="px-3 py-1 font-bold text-emerald-500 text-lg">−</button>
                      <span className="">{item.quantity}</span>
                      <button onClick={() => increaseQty(item._id)} className="px-3 py-1 font-bold text-emerald-500 text-lg">+</button>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-red-700 text-2xl ml-4">
                      <RiDeleteBin5Line />
                    </button>
                    <div className='font-bold w-[65px]'>
                      {item.price * item.quantity} kr
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right text-lg my-10 p-4">
                Total: <span className='ms-10 font-bold'>{order.total} kr</span>
              </div>

              <div className="text-center">
                <button
                  onClick={() => navigate(-1)}
                  className="text-amber-500 hover:underline transition py-3 px-6"
                >
                  Back
                </button>
                <button
                  onClick={proceedToCheckout}
                  className="bg-amber-500 hover:bg-amber-400 transition text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </Fade>
      </div>
      <Footer />
    </>
  )
}
