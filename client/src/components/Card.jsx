import { AttentionSeeker } from 'react-awesome-reveal'
import { ToastContainer, toast } from 'react-toastify'

export default function Card({ dish }) {

const onAdd = (product) => {
  const order = JSON.parse(localStorage.getItem('order')) || {
    items: [],
    total: 0,
    count: 0
  }

  const existingItem = order.items.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    order.items.push({ ...product, quantity: 1 })
  }

  order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  order.count = order.items.reduce((sum, item) => sum + item.quantity, 0)

  localStorage.setItem('order', JSON.stringify(order))
}

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full relative">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      {dish.isPopular && (
        <AttentionSeeker effect="pulse" triggerOnce={false} className='absolute top-2 right-2'>
          <div className=" bg-amber-500 text-white text-md font-bold px-2 py-1 rounded-full shadow">
            ★ Popular
          </div>
        </AttentionSeeker>
      )}
      <div className="p-7 flex-1 flex flex-col justify-between text-center">
        <div>
          <h3 className="text-lg font-semibold">{dish.name}</h3>
          <p className="text-amber-600 font-bold font-gluten text-lg lg:text-3xl mt-1">{dish.price} kr</p>
        </div>
        <button
          onClick={() => {
            onAdd(dish);
            toast.success(`${dish.name} added to cart!`);
          }}
          className="mt-4 mx-auto w-1/2 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-400 transition"
        >
          Add
        </button>
      </div>
    </div>
  )
}