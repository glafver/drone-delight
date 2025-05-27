import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className='font-manrope text-neutral-700 min-h-screen flex flex-col'>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default App
