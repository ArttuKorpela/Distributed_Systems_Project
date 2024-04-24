import React, { createContext, useState } from "react";
import productData from "../components/Assets/data";
import cart from "../pages/Cart";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < productData.length+1; index++) {
       cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItem] = useState(getDefaultCart());
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const addToCart = (itemID) =>{
        setCartItem((previous)=>({...previous,[itemID]:previous[itemID]+1}))
        console.log(cartItems);
    }

    const removeFromCart = (itemID) => {
        setCartItem((previous)=>({...previous,[itemID]:previous[itemID]-1}))
        console.log(cartItems);
    }

    const getTotalCart = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = productData.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
    return totalAmount;
    }

    const contextValue = {getTotalCart, productData, cartItems, addToCart, removeFromCart, isLoggedIn, setIsLoggedIn};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;