import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    let [token,setToken] = useState('')
    return <UserContext.Provider value={{token,setToken}}>
        {props.children}
    </UserContext.Provider>
}

