import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import axios from 'axios';
import Icons from '../../components/Icons/Icons';

export default function Categories() {
  let [loading, setLoading] = useState(false);
  let [brands, setBrands] = useState([]);
  let [errorMessage, setErrorMessage] = useState(null);
  

  
  function getAllBrands() {
    setLoading(true);
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setLoading(false);
        console.log(res);
        setBrands(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        setErrorMessage(err.message)
      })
  };
    useEffect(() => {
      getAllBrands();
    }, [])
  
  return (
        <>
          {loading ? <Loading /> : (<>
            <section className='my-10'>
              <h1 className=' font-bold text-center text-2xl uppercase'> our <span className=' text-green-500'>Categories</span></h1>
    
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 min-h-screen'>
                {brands?.map((brand) => {
                  return <Icons item={brand} />
                })}
              </div>
            </section>
          </>)}
        </>
  )
}
