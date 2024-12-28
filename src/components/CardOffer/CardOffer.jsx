import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

export default function CardOffer({ product }) {

  let { counter, setCounter } = useContext(CounterContext);
  let [loading , setLoading] = useState(false);
  let navigate = useNavigate();

  async function AddTOCard(id) {
    setLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }, {
      headers: {
        token: localStorage.getItem('Token')
      }
    }).then((res) => {
      // console.log(res);

      toast.success('Product Added To Card', {
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
    setLoading(false);

    })
      .catch((err) => {
        setLoading(false);

      })

  }




  return (
    <>
      {product ? (

        <div className=" shadow-lg rounded-lg p-2">

          <p className=' text-white bg-red-700 rounded-full absolute p-2 z-10'> 50%</p>
          <div className="upper relative overflow-hidden">
            <img src={product.imageCover} alt={product.title} className="w-full" />
          </div>


          <div className="lower px-4">
            <h2 className=' text-center px-3 bg-slate-500 text-white text-2xl my-3'>{product.category.name}</h2>
            <h3 className=' text-sm'>{product.title}</h3>
            <p className=' underline font-bold text-center text-xl my-2'>{product.brand.name}</p>

            <div className="flex justify-start items-center text-sm mb-2">
              <div className=' flex justify-center items-center font-bold my-2'>
                <p className=' relative text-red-600 px-3'>{product.price} <span className=' border-b-2 border-gray-900 w-14 absolute top-2.5 left-3 '></span> EGP</p>
                <p className=' text-green-500'>{product.price / 2} EGP</p>
              </div>
            </div>

            <button className=' rounded-lg px-4 py-2 bg-green-600 hover:bg-green-900 cursor-pointer duration-500 delay-200 w-full capitalize font-bold text-white mb-3'
              onClick={() => {
                if (localStorage.getItem('Token')) {
                  AddTOCard(product.id)

                }
                else {
                  navigate('/login');
                }
              }
              }
            > {loading ? <i class="fa-solid fa-spinner fa-spin" ></i>:"get now"}</button>
          </div>
        </div>
      ) : (
        <>

        </>

      )}

    </>
  )
}
