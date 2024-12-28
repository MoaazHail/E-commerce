import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Card from '../../components/Card/Card';
import axios from 'axios';

export default function Products() {
  let [loading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  let [errorMessage, setErrorMessage] = useState(null);
  let [searchProduct, setSearchProduct] = useState([]);
  let [searchValue, setSearchValue] = useState(null);


  function getAllProduct() {
    setLoading(true);
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setLoading(false);

        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        setErrorMessage(err.message)
      })
  };

  useEffect(() => {
    getAllProduct();
  }, [])

  // function search() {

  //   setSearchProduct(products.filter((item) => {
  //     return (item.title.includes(searchValue))
  //   }))
  // }

  // function getSearchProduct() {
  // }

  return (
    <>
      {loading ? <Loading /> : (<>
        <section className='my-10'>
          <h1 className=' font-bold text-center text-2xl uppercase'> our <span className=' text-green-500'>products</span></h1>

          <div className=' flex justify-center items-center my-5 gap-5'>
            <input type="search" className=' shadow-lg bg-slate-100 p-3 text-xl border-b-4 border-green-700 w-2/3 rounded-md '
              placeholder='Search...'
              // onChange={(e) => { setSearchValue(e.target.value) }}
              // onBlur={ ()=>{search}}
              // onFocus={ ()=>{search}}
            />
          </div>

            <div className=' hidden justify-center items-center flex-col w-2/3 bg-slate-100 px-20 py-5 absolute z-10 left-20 gap-4'>
              {/* {searchProduct.map((item) => {
                return <p className='border-b-2 text-xl w-full cursor-pointer hover:border-green-700 hover:border-b-4'
                  onClick={() => {
                    console.log(item.id);
                  }}
                >{item.title}</p>
              })} */}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-screen'>
              {products.map((product, index) => {
                return <Card product={product} key={index} />
              })}
            </div>

        </section>
      </>)}
    </>
  )
}
