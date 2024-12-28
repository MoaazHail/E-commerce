import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';

export default function CardCart({item, cart}) {
    console.log(item);
    
    let [loading, setLoading] = useState(false)
    let [count, setCount] = useState(item.count)


    function deleteItem(id){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token : localStorage.getItem('Token')
            }
        }).then((res)=>{
            
            toast.error('Product Deleted !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            cart(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function updateCount(id,count){
        setLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{
            headers:{
                token: localStorage.getItem('Token')
            }
        }).then((res)=>{
            setLoading(false);
            // console.log(res);
            cart(res.data.data);

            
        }).catch((err)=>{
            setLoading(false);
            console.log(err);
            
        })
    }

    useEffect(()=>{
        setCount(item.count)

    },[item.count])

    return (
        <>
            
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">

                <img src={item.product.imageCover} alt={item.product.title} className="w-full rounded-lg sm:w-40" />

                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">

                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{item.product.title}</h2>
                        <p className="mt-1 text-xs text-gray-700">{item.price} EGP</p>
                    </div>

                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                        <div className="flex items-center border-gray-100">
                            <button onClick={()=>{updateCount(item.product.id,count-1)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50" disabled={loading}>{loading ? (<i class="fa-solid fa-spinner fa-spin"></i>): "-"}</button>
                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" 
                            type="number" 
                            value={count}
                            onBlur={()=>{updateCount(item.product.id,count)}}
                            onChange={(e)=>{setCount(e.target.value)}}
                            min="1" />
                            <button onClick={()=>{updateCount(item.product.id,item.count+1)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-green-50" disabled={loading}> {loading ? (<i class="fa-solid fa-spinner fa-spin"></i>): "+"} </button>
                        </div>

                        <div className="flex items-center space-x-4" >
                            <p className="text-sm">{item.price * item.count} EGP </p>
                            <i className="fa-solid fa-circle-xmark text-lg text-red-500 hover:text-red-800" onClick={()=>{deleteItem(item.product.id)}}></i>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
