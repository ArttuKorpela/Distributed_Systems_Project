import React, { useContext } from 'react'
import './Item.css'
import { ShopContext } from '../../context/ShopContext';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className='item'>
        <img src={props.image} alt='' />
        <p>{props.name}</p>
        <div className='item-price'>
            {props.price}€
        </div>
        <button onClick={() => {addToCart(props.id)}}>Add to Cart</button>
    </div>
  )
}

export default Item
//<button onClick={() => {addToCart(props.id)}}>Add to Cart</button>