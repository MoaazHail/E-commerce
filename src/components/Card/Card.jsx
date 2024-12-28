import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { WishLoadingContext } from '../../Context/WishLoadingContext';


export default function Card( {product}) {
  let {id,imageCover,title,brand,category,price,ratingsAverage}=product;
  let [action,setAction] = useState(false);
  let [loading, setLoading] = useState(false);
  let {loadingWish,setLoadingWish} = useContext(WishLoadingContext);
  let navigate = useNavigate()

  

  function addTOCard(id) {
      if (localStorage.getItem('Token') == null) {
        navigate('/login');
      }

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

  function addToWishList(id){
    if (localStorage.getItem('Token') == null) {
      navigate('/login');
    }

    setLoadingWish(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{ productId : id},{
      headers:{
        token : localStorage.getItem('Token')
      }
    }).then((res)=>{
      // console.log(res);
      setAction(true);
      setLoadingWish(false);
      toast.info('Product Added to Wish List !', {
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
    }).catch((err)=>{
      console.log(err);
      setLoadingWish(false);
    })
  }



  return (
    <>
    <div className="group shadow-lg rounded-lg p-2">

      <div className="upper relative overflow-hidden">
        <img src={imageCover} alt={title} className="w-full" />

        <div className="layer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-4">
          <div className="icon translate-y-96 opacity-0  group-hover:translate-y-0 duration-500 group-hover:opacity-100  bg-green-500 cursor-pointer text-white rounded-full size-14 flex justify-center items-center hover:bg-green-900">
            
            <i onClick={()=>{addTOCard(id)}} className={loading ?"fa-solid fa-spinner fa-spin text-3xl": "fa-solid fa-cart-shopping text-3xl "}></i>
          </div>
          <div className="icon translate-y-96 opacity-0 group-hover:translate-y-0 duration-500 delay-200 group-hover:opacity-100 bg-green-500 cursor-pointer text-white rounded-full size-14 flex justify-center items-center hover:bg-green-900"
          >
            <Link to={`/product details/${id}/${category._id}`}>
              <i className="fa-solid fa-eye text-3xl"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="lower pt-4">
        <h2 className=' text-center px-2 bg-slate-500 text-white text-1xl rounded-lg'>{category.name}</h2>
        <h3 className=' text-xl'>{title}</h3>

        <div className="flex justify-between items-center text-sm py-3 ">
          <h4 className=' text-lg'>{brand.name}</h4>
          <p>
            {ratingsAverage} <i className="fa-solid fa-star text-yellow-600"></i>
          </p>

        </div>

        <div className="flex justify-center gap-7 items-center ">
          <p>{price} EGP</p>
          <i className={action ? "fa-solid fa-heart fa-beat cursor-pointer text-xl text-red-600" : "fa-regular fa-heart cursor-pointer text-xl" } onClick={()=>{addToWishList(id)}}></i>
          
        </div>
      </div>
    </div>
    </>
  )
}
