import { createContext, useState } from "react";

export let WishLoadingContext = createContext();

export default function WishLoadingContextProvider(props){

    let[loadingWish,setLoadingWish]= useState(false);

    return <WishLoadingContext.Provider value={{loadingWish,setLoadingWish}}>
        {props.children}
    </WishLoadingContext.Provider>
    

}
