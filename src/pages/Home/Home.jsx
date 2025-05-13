import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import product4 from "../../assets/Images/product4.png"
import product5 from "../../assets/Images/product5.jpg"
import product6 from "../../assets/Images/product6.jpg"
import sale from "../../assets/Images/sale.webp"
// import offer from "../../assets/Images/sale.png"
import Card from '../../components/Card/Card';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Error from '../../components/Error/Error';
import CardOffer from '../../components/CardOffer/CardOffer';
import { WishLoadingContext } from '../../Context/WishLoadingContext';


export default function Home() {
  let [loading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  let [errorMessage, setErrorMessage] = useState(null);
  let {loadingWish, setLoadingWish}=useContext(WishLoadingContext)

  
let counter = 0;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  async function getAllProduct() {
    setLoading(true);
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setLoading(false);
        setProducts(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message)
      })
  };

  useEffect(() => {
    getAllProduct();
  }, [])

  let fil = products?.filter((product)=>{
    if(product.ratingsAverage <= 3){
        return product
      }
  })
  

  return (
    <>
      {loading || loadingWish? (<Loading />):
          <>
          <section>
            <div>
              <Slider {...settings}>
                <div>
                  <img src={product4} className='w-full' />
                </div>
                <div>
                  <img src={product5} className='w-full'/>
                </div>
                <div>
                  <img src={product6} className='w-full'/>
                </div>
              </Slider>
            </div>
          </section>

          <section className='py-10'>
            <h1 className=' font-bold text-center text-2xl  uppercase'> Offers <img src={sale} alt="offer" height={50} width={70} className=' inline' /></h1>
            {errorMessage && <Error/>}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              fil.map((product)=>{
                return <CardOffer product={product} />
              })
            }
            </div>

          </section>

          <section className='my-10'>
            <h1 className=' font-bold text-center text-2xl uppercase'> best <span className=' text-green-500'>seller</span></h1>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {products.map((product)=>{
                counter++;
                if(counter< 10){
                  return(<Card product={product}/>)
                }

              })}
            </div>
          </section>
        </>
      }
    </>


  )
}
