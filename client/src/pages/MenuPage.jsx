import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { Fade } from 'react-awesome-reveal'

export default function MenuPage() {
  const [dishes, setDishes] = useState([])
  const [selected, setSelected] = useState(null)

  const filtered = selected ? dishes.filter(d => d.category === selected) : dishes
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => setDishes(res.data))
      .catch((err) => console.error(err))
  }, [])

  const categories = [
    { id: 'pizza', label: 'Pizza', icon: '/menu-icons/pizza.png' },
    { id: 'fastfood', label: 'Fastfood', icon: '/menu-icons/fastfood.png' },
    { id: 'asian', label: 'Asian', icon: '/menu-icons/asian.png' },
    { id: 'desserts', label: 'Desserts', icon: '/menu-icons/desserts.png' },
    { id: 'drinks', label: 'Drinks', icon: '/menu-icons/drinks.png' },
    { id: 'italian', label: 'Italian', icon: '/menu-icons/italian.png' },
    { id: 'sushi', label: 'Sushi', icon: '/menu-icons/sushi.png' },
    { id: 'salad', label: 'Salad', icon: '/menu-icons/salad.png' }
  ]

  return (
    <>
      <Header />
      <Fade>
        <div className="container grow mx-auto py-10">
          <h1 className="text-4xl font-gluten text-amber-500 font-bold mb-10 text-center">Our Menu</h1>

          <div className="flex flex-wrap overflow-x-auto gap-6 py-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelected(selected === cat.id ? null : cat.id)}
                className={`flex flex-col items-center hover:opacity-80 transition ${selected === cat.id ? 'text-amber-500 font-semibold' : 'text-neutral-700'
                  }`}
              >
                <div
                  className={`p-4 rounded-full border transition ${selected === cat.id
                    ? 'bg-amber-100 border-amber-500'
                    : 'bg-white border-neutral-300'
                    }`}
                >
                  <img src={cat.icon} alt={cat.label} className="w-12 h-12 object-contain" />
                </div>
                <span className="mt-2 text-md">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {filtered.map((dish) => (
              <Card
                key={dish._id}
                dish={dish}
              />
            ))}
          </div>
        </div>
      </Fade>
      <Footer />
    </>
  )
}
