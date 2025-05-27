import { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { Carousel } from 'nuka-carousel'

export default function PopularSection() {
  const [dishes, setDishes] = useState([])
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/products?isPopular=true')
      .then((res) => setDishes(res.data.slice(0, 9)))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const groupedDishes = []

  const groupSize = isLarge ? 3 : 1

  for (let i = 0; i < dishes.length; i += groupSize) {
    groupedDishes.push(dishes.slice(i, i + groupSize))
  }

  return (
    <section className="bg-warmGray-100 pb-20">
      <h2 className="text-4xl font-gluten text-amber-600 font-bold mb-10 text-center">Our Popular Dishes</h2>

      <Carousel
        slidesToShow={1}
        cellSpacing={24}
        wrapAround={true}
        showArrows={true}
        showDots={true}
        autoplay={true}
        autoplayInterval={2000}
        wrapMode="wrap"
      >
        {groupedDishes.map((group, index) => (
          <div key={index} className="flex gap-6 justify-center min-w-full p-10 lg:px-20">
            {group.map((dish) => (
              <div key={dish.id} className="w-full max-w-sm">
              <Card
                key={dish.id}
                dish={dish}
              />
              </div>
            ))}
          </div>
        ))}
      </Carousel>

    </section>
  )
}
