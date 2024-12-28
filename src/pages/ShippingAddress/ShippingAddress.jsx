import { useFormik } from 'formik'
import * as yup from 'yup' 
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import errorImage from '../../assets/Images/error.webp'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function ShippingAddress() {
    let {cartID, setCartID} = useContext(CartContext);
    let [loading, setLoading] = useState(false)


    async function submit(values) {
        let shape = {shippingAddress:values}
        
        setLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`, {shape},{
            headers:{
                token : localStorage.getItem('Token')
            },
            params:{
                url : "https://e-commerce-three-rouge.vercel.app/#"
            }
        }).then((res) => {
            setLoading(false);
            console.log(res);
            if(res.data.status == "success")
                window.location.href = res.data.session.url;
        })
        .catch((err) => {
            setLoading(false)
        });
    };

    function validationSchema() {
        return yup.object().shape({
            details: yup.string().required(),
            phone: yup.string().matches(/^01[0125][0-9]{8}$/,"Phone Is Not Valid").required("Phone Must Be Required"),
            city: yup.string().required()
        });
    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""

        },
        validationSchema: validationSchema,
        onSubmit: submit
    });

    return (
        <>
            <h1 className=' text-5xl text-center font-bold'>Log<span className=' text-green-600'>In</span></h1>

            <form className="max-w-md mx-auto p-5 relative" onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        type="text"
                        name="details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 capitalize">details </label>
                </div>
                {formik.errors.details && formik.touched.details && (
                    <h2 className=' text-red-500 mb-7'>{formik.errors.details}</h2>
                )}

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="tel"
                        name="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 capitalize">phone</label>
                </div>
                {formik.errors.phone && formik.touched.phone && (
                    <h2 className=' text-red-500 mb-7'>{formik.errors.phone}</h2>
                )}

<div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        type="city"
                        name="city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 capitalize">city</label>
                </div>
                {formik.errors.city && formik.touched.city && (
                    <h2 className=' text-red-500 mb-7'>{formik.errors.city}</h2>
                )}

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading? (<i className="fa-solid fa-spinner fa-spin"></i>):'Submit'}</button>
            </form>
        </>
    )
}
