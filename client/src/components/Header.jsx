import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { GrCart } from "react-icons/gr"
import { LuCircleUserRound } from "react-icons/lu"
import { IoFastFoodOutline } from "react-icons/io5";

export default function Header() {
  const [itemCount, setItemCount] = useState(0)

  const getOrderCount = () => {
    const order = JSON.parse(localStorage.getItem('order'))
    return order?.count || 0
  }

  useEffect(() => {
    const updateCount = () => {
      setItemCount(getOrderCount())
    }

    updateCount()

    const interval = setInterval(updateCount, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between h-[80px]">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <a href="/">
            <h1 className="text-3xl lg-text-4xl font-semibold mt-2 text-neutral-800 font-gluten">DroneDelight</h1>
          </a>
        </div>

                <nav>
          <ul className="">
            <li>
              <a href="/menu" className="text-amber-600 hover:text-amber-500 font-semibold flex items-center space-x-1">
                <IoFastFoodOutline className='text-xl mt-[-7px]'/>
                <span>Foods</span>
              </a>
            </li>
            {/* <li><a href="/" className="hover:text-gray-900">About us</a></li>
            <li><a href="/" className="hover:text-gray-900">Contacts</a></li> */}
          </ul>
        </nav>

        <nav>
          <ul className="flex items-center space-x-6 text-gray-700">
            {/* <li>
              <a href="/menu" className="text-orange-700 hover:text-orange-900 font-semibold flex items-center space-x-1">
                <IoFastFoodOutline className='text-xl mt-[-7px]'/>
                <span>Foods</span>
              </a>
            </li> */}
            <li><a href="/" className="hover:text-gray-900">About us</a></li>
            <li><a href="/" className="hover:text-gray-900">Contacts</a></li>
          </ul>
        </nav>

        <div className="flex items-center space-x-6 relative">
          <a href="/order" className="text-neutral-800 hover:text-neutral-700 text-2xl">
            <LuCircleUserRound />
          </a>

          <a href="/order" className="text-neutral-800 hover:text-neutral-700 text-2xl relative">
            <GrCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  )
}
