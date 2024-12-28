import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import Loading from '../Loading/Loading';
import img from '../../assets/Images/dontAccount.svg'
import { Link } from 'react-router-dom';


export default function WishList() {
  let [products, setProducts] = useState({});
  let [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {
        token: localStorage.getItem('Token')
      }
    }).then((res) => {
      setLoading(false);
      // console.log(res);
      setProducts(res.data);
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    })
  }, [])
  return (
    <>
    { !localStorage.getItem('Token') ? (<>
    <div className=' flex justify-center items-center flex-col '>
      <img src={img} alt="wishList" className='bg-cover w-[400px]'/>
      <Link to={'/login'} className=' p-2 mt-5 text-green-900 font-bold rounded-lg bg-green-500 hover:text-green-500 hover:bg-green-900 delay-100'> Go To Login Page</Link>
    </div>
    </>):(
      <>
      {loading ? <Loading /> : (
        <section className='my-10'>
          <h1 className=' font-bold text-center text-2xl uppercase'> Wish <span className=' text-green-500'>list</span></h1>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-screen'>
            {products?.data?.map((product) => {
              return <Card product={product} />
            })}
          </div>
        </section>
      )}</>
    )}
      
    </>


  )
}
