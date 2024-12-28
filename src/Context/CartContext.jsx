import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider (props){
    let [cartID, setCartID]=useState()

    return <CartContext.Provider value={{cartID, setCartID}}>
        {props.children}
    </CartContext.Provider>
}