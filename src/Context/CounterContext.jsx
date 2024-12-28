import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props){

    let [counter,setCounter] = useState(null);
    return <CounterContext.Provider value = {{counter,setCounter}}>
        {props.children}
    </CounterContext.Provider>
}