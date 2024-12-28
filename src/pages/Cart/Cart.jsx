import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CardCart from '../../components/CardCart/CardCart';
import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function Cart() {
  let [items, setItems] = useState();
  let [loading, setLoading] = useState(false);
  let [loadingPage, setLoadingPage] = useState(false);

  let {cartID, setCartID} = useContext(CartContext);

  useEffect(() => {
    setLoadingPage(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('Token')
      }
    })
      .then((res) => {
        // console.log(res.data.data);
        setCartID(res.data.data._id);
        setItems(res.data.data)
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingPage(false);

      })

  }, [])

  function deleteAllCart() {
    setLoading(true);
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("Token")
      }
    }).then((res) => {
      // console.log(res);
      setLoading(false);
      setItems(null)

      toast.error('All Product Deleted !', {
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

    }).catch((err) => {
      setLoading(false);

      console.log(err);

    })

  }

  return (
    <>
      {loadingPage ? (<>
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:flex-col md:items-center gap-5">
          <div className=' space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center'>
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
              <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full start-0">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>
          </div>

          <div className=' space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center'>
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
              <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full start-0">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </>) : (
          <div className=" bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-3xl font-bold">Cart <span className=' text-green-500'>Items</span></h1>

            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

              <div className="rounded-lg md:w-2/3">
                {items?.products?.map((item) => {
                  return (<CardCart item={item} cart={setItems} />)
                })}
                {items && (<button onClick={deleteAllCart} className=" w-full bg-red-600 text-white text-xl capitalize rounded-lg p-2 hover:bg-red-700 mb-5">{loading ? (<i className="fa-solid fa-spinner fa-spin"></i>) : "clear All Cart"} </button>)}

              </div>

              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">4.99 EGP</p>
                </div>

                <hr className="my-4" />
                
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold"> {items?.totalCartPrice} EGP </p>
                    <p className="text-sm text-gray-700 mb-5">including VAT</p>
                  </div>
                </div>
                
                <Link to={'/shipping address'} className="mt-6 px-4 py-2 w-full rounded-md bg-green-500  font-medium text-green-50 hover:bg-green-600">Check Out</Link>
              </div>
            </div>
          </div>
        )

      }

    </>
  )
}
