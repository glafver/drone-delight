import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.png';

export default function OpenMenuSection() {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col md:flex-row items-stretch lg:mb-20 lg:h-[500px] bg-emerald-200">
      <div className='lg:w-7/12 '>
        <img src={menu} alt="" className='max-h-full mx-auto p-10 lg:p-16' />
      </div>
      <div className=" lg:w-5/12 flex flex-col justify-center items-center text-center space-y-8 p-10">
        <h2 className="text-4xl font-gluten font-bold text-amber-500">Our Menu</h2>
        <p className="">
          Explore our delicious variety of dishes carefully prepared to satisfy your cravings and get them delivered by our drones.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="w-max px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Go to Menu
        </button>
      </div>
    </section>

  )
}