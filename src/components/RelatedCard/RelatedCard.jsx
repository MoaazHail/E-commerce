import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';

export default function RelatedCard() {
    let {category} = useParams();
    let [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`)
            .then((res) => {
                // console.log(res.data.data);
                setProducts(res.data.data);
            }).catch((err) => {
                console.log(err);

            })
    }, [])


    return (
        <>
         <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {products?.map((item ,index)=>{
                return <Card product={item} key={index}/>
            })}
         </div>
        </>
    )
}
