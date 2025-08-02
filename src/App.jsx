import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AuthGuard from './routes/AuthGuard'
import IsLogin from './routes/IsLogin'
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'
import Cart from './pages/Cart'
import YourProduct from './pages/YourProduct'
import BuyProduct from './pages/BuyProduct'
import YourProfile from './pages/YourProfile'
import Orders from './pages/Orders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path='/' element={<><Navbar/><Home/><Footer/></>} />
            <Route path='/product' element={<><Navbar/><Products/><Footer/></>} />
            <Route path='/createproduct' element={<><Navbar/><CreateProduct/><Footer/></>} />
            <Route path='/cart' element={<><Navbar/><Cart/><Footer/></>} />
            <Route path='/yourproducts' element={<><Navbar/><YourProduct/><Footer/></>} />
            <Route path='/buyproduct' element={<><Navbar/><BuyProduct/><Footer/></>} />
            <Route path='/userprofile' element={<><Navbar/><YourProfile/><Footer/></>} />
            <Route path='/orders' element={<><Navbar/><Orders/><Footer/></>} />
          </Route>
          <Route element ={<IsLogin/>}>
            <Route path='/signup' element={<><Signup /></>} />
            <Route path='/login' element={<><Login /></>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
