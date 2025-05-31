import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { GrCart } from "react-icons/gr"
import { LuCircleUserRound } from "react-icons/lu"
import { IoFastFoodOutline } from "react-icons/io5"
import { useUser } from '../contexts/UserContext'
import { useNavigate, Link } from 'react-router-dom'

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

  const { user } = useUser()

  const navigate = useNavigate()

  const handleUserClick = () => {
    if (user) {
      navigate(`/user/${user.id}`)
    } else {
      navigate('/login')
    }
  }

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between h-[80px]">

        <Link to="/" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <p className="text-4xl lg-text-4xl font-semibold mt-2 text-neutral-800 hidden lg:inline font-gluten">DroneDelight</p>
        </Link>

        <nav>
          <ul className="">
            <li>
              <Link to="/menu" className="text-emerald-500 hover:text-emerald-400 font-semibold flex items-center space-x-1">
                <IoFastFoodOutline className='text-2xl mt-[-7px]' />
                <span className=''>Foods</span>
              </Link>
            </li>
          </ul>
        </nav>

        <nav className='hidden lg:block'>
          <ul className="flex items-center space-x-6">
            <li><Link to="/" className="hover:text-neutral-500">About us</Link></li>
            <li><Link to="/" className="hover:text-neutral-500">Contacts</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 lg:space-x-6 relative">
          <button onClick={handleUserClick} className="text-neutral-800 hover:text-neutral-500 text-2xl">
            <LuCircleUserRound />
          </button>

          <Link to="/cart" className="text-neutral-800 hover:text-neutral-500 text-2xl relative">
            <GrCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
