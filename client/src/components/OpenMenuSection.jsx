import menu from '../assets/menu.jpg';

export default function OpenMenuSection() {
  return (
    <section className="flex flex-col md:flex-row items-stretch pb-20 h-[430px]">
      {/* <div className="lg:w-7/12 h-100"> */}
        <img
          src={menu}
          alt="Delicious food"
          className="object-cover lg:w-6/12"
        />
      {/* </div> */}
      <div className="bg-emerald-200 lg:w-6/12 flex flex-col justify-center items-center text-center space-y-8 p-10 lg:p-20">
        <h2 className="text-4xl font-gluten font-bold text-amber-600">Open Menu</h2>
        <p className="text-lg">
          Explore our delicious variety of dishes carefully prepared to satisfy your cravings and get them delivered by our drones.
        </p>
        <button
          onClick={() => window.location.href = '/menu'}
          className="w-max px-6 py-3 bg-amber-600 text-white font-semibold rounded hover:bg-amber-500 transition"
        >
          Go to Menu
        </button>
      </div>
    </section>

  )
}