import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Checkout from './pages/Checkout'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
