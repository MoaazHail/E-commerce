import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import { WishLoadingContext } from '../../Context/WishLoadingContext';
import Loading from '../Loading/Loading';
import Card from '../../components/Card/Card';
import RelatedCard from '../../components/RelatedCard/RelatedCard';


export default function ProductDetails() {
    let { id} = useParams();
    let [product, setProduct] = useState(null);
    let [loadingBtn, setLoadingBtn] = useState(false);
    let [errorMessage, setErrorMessage] = useState(false);


    function addTOCard(id) {
        setLoadingBtn(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }, {
          headers: {
            token: localStorage.getItem('Token')
          }
        }).then((res) => {
        //   console.log(res);
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
            setLoadingBtn(false);
    
        })
          .catch((err) => {
            setLoadingBtn(false);
          })
    
      }

      function addToWishList(id){

        axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{ productId : id},{
          headers:{
            token : localStorage.getItem('Token')
          }
        }).then((res)=>{
        //   console.log(res);
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

        })
      }
    

    function getProductById() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                console.log(res.data.data);
                if(res.data.data.brand=== null){
                    res.data.data.brand= '';
                }

                setProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
            })

    }


    useEffect(() => {
        getProductById();
    }, [])
    return (
        <>
        {/* {loadingWish && <Loading/>} */}
            {product ?  (
                <>
                    <div className=' flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-10 pb-5 '>

                        <div className=' md:col-span-1 lg:col-span-1 '>
                            <ReactImageGallery
                                items={product?.images?.map((img) => {
                                    return {
                                        original: img,
                                        thumbnail: img,
                                    };
                                })}
                                showPlayButton={false}
                                autoPlay={true}
                                showNav={false}
                                showBullets={false}
                                showFullscreenButton={false}
                            />
                        </div>

                        <div className=' md:col-span-1 lg:col-span-3 '>
                            <div>
                                <h2>{product.title}</h2>
                                <h3> {product.category.name} </h3>
                                <h3> {product.brand} </h3>
                                <p> {product.description} </p>
                            </div>
                            <div className=' flex gap-3'>
                                <button className='text-white text-sm bg-green-500 hover:bg-green-900 p-2 duration-500 ' onClick={()=>{addToWishList(id)}}><i className="fa-regular fa-heart cursor-pointer text-sm"></i></button>

                                <button className=' text-white text-xl bg-green-500 hover:bg-green-900 px-5  uppercase duration-500' onClick={()=>{addTOCard(id)}}> {loadingBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'add to card'} <i className="fa-solid fa-cart-shopping text-sm"></i> </button>
                            </div>

                        </div>

                    </div>
                    <hr />
                    <hr />

                    <div className=' pt-5'>
                        <h1 className=' text-center text-3xl font-bold'> Related <span className='text-green-500'>Products</span></h1>
                        <RelatedCard/>
                    </div>
                </>
            ) :
                (
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
                            <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>

                )}
        </>
    )
}
