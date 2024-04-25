import React, { useState, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

const Navbar = () => {
  const [menu,setMenu] = useState("shop");
  const { isLoggedIn } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>Distributed systems project</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop"?<h/>:<></>}</li>
      </ul>
    <div className='nav-login-cart'>
      {isLoggedIn ? (
        <Link to='/logout'><button>Logout</button></Link> // Add this line
      ) : (
        <Link to='/signup'><button>Sign up</button></Link>
      )}
      <Link to='/cart'><img src={cart_icon} alt=""/></Link>
    </div>
   </div> 
  )
}

export default Navbar