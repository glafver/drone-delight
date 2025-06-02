import { useContext, useEffect, useState } from 'react'
import { AttentionSeeker } from 'react-awesome-reveal'
import { toast } from 'react-toastify'
import { useUser } from '../contexts/UserContext'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

export default function Card({ dish }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { user, setUser } = useUser()

  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites?.some(fav => fav === dish._id))
    }
  }, [user, dish._id])

  const toggleFavorite = async () => {
    const updatedFavorites = isFavorite
      ? user.favorites.filter(id => id !== dish._id)
      : [...user.favorites, dish._id]

    try {
      const res = await fetch(`${baseUrl}/users/update/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: updatedFavorites }),
      });

      if (!res.ok) throw new Error('Misslyckades med att uppdatera favoriter.');

      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsFavorite(!isFavorite);
    } catch (err) {
      toast.error('Kunde inte uppdatera favoriter.');
    }
  }

  const onAdd = (product) => {
    const order = JSON.parse(localStorage.getItem('order')) || {
      items: [],
      total: 0,
      count: 0
    }

    const existingItem = order.items.find(item => item._id === product._id)

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
    <div className="bg-white rounded-lg p-6 shadow-md overflow-hidden flex flex-col h-full relative max-w-[300px] mx-auto">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-58 object-cover rounded-lg"
      />
      <div className='bg-neutral-800/0 absolute top-10 left-0 px-10 w-full flex justify-between'>
        {dish.isPopular && (
          <AttentionSeeker effect="pulse" triggerOnce={false} className=''>
            <div className=" bg-amber-500 text-white text-md px-3 py-1 rounded-full shadow">
              Popular
            </div>
          </AttentionSeeker>
        )}
      </div>

      <div className="pt-4 flex-1 flex flex-col justify-between text-center">
        <div className='flex justify-between'>
          <h3 className="text-md font-semibold">{dish.name}</h3>
          <p className="text-amber-500 font-bold text-lg">{dish.price} kr</p>
        </div>
        <div className='flex gap-4 items-center mt-3'>
          <button
            onClick={() => {
              onAdd(dish);
              toast.success(`${dish.name} added to cart!`);
            }}
            className="mx-auto w-full font-semibold bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-400 transition"
          >
            Add
          </button>
          {user && (
            <button
              onClick={toggleFavorite}
              className="text-3xl text-emerald-500"
            >
              {isFavorite ? <BsBookmarkFill /> : <BsBookmark />}
            </button>

          )}
        </div>

      </div>
    </div>
  )
}