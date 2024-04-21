import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'

const CartItems = () => {
        const {getTotalCart,productData,cartItems,removeFromCart} = useContext(ShopContext);
    return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {productData.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon'/>
                            <p>{e.name}</p>
                            <p>{e.price}€</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>{e.price*cartItems[e.id]}€</p>
                            <button onClick={()=>{removeFromCart(e.id)}}>Remove from cart</button>
                        </div>
                    </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>{getTotalCart()}€</h3>
                    </div>
                </div>
                <button><Link to="/checkout">Proceed to Checkout</Link></button>
            </div>
        </div>
    </div>
  )
}

export default CartItems