import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let DataContext = createContext()

export default function DataContextProvider(props){
   const [count, setcount] = useState(0)
    function getData(){
       return axios.get(`https://674f8478bb559617b26f6380.mockapi.io/api/v1/data`)
        .then((res)=> {
            setcount(res.data.length)
           return res
        })
    }
    useEffect(()=>{
        getData()
    },[count])
    return <DataContext.Provider value={{getData, count , setcount}}>{props.children}</DataContext.Provider>
}