import React from 'react'
import './Items.css'
import productData from '../Assets/data'
import Item from '../Item/Item'

const Items = () => {
  return (
    <div className='items'>
        <h1>Products</h1>
        <hr/>
        <div className='all-items'>
            {productData.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}

export default Items