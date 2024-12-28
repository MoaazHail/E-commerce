import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, Links, useNavigate } from 'react-router-dom';
import errorImage from '../../assets/Images/error.webp';
import { UserContext } from '../../Context/UserContext';
import logIn from '../../assets/Images/login.svg'
import Error from '../../components/Error/Error';


export default function Login() {

    let [loading, setLoading] = useState(false);
    let [apiError, setApiError] = useState('');
    let navigate = useNavigate();
    let { token, setToken } = useContext(UserContext);


    async function submit(values) {
        setLoading(true);

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then((res) => {
                setLoading(false);

                console.log(res.data.message);
                if (res.data.message == "success") {
                    localStorage.setItem("Token", res.data.token);
                    setToken(res.data.token);
                    navigate('/');
                }
            })
            .catch((err) => {
                setLoading(false);

                setApiError(err.response.data.message);

            });
    };

    function validationSchema() {
        return yup.object().shape({
            email: yup.string().email("*Email Is Not Valid").required("*Email Must Be Required"),
            password: yup.string().required("*Password Must Be Required")
        });
    }

    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: submit
    });

    return (
        <>
            <div className=' flex justify-center items-center bg-gray-400 min-h-screen'>


                
                <div className=' w-[430px] hidden md:block'>
                    <img src={logIn} alt="" />
                </div>


                <div className=' relative bg-white py-20 px-6  rounded-lg border-x-4 border-green-600 mx-3'>
                    <div className=' flex justify-center items-center'>
                    <Link to={'/'}><i className=" absolute fa-solid fa-house bg-green-700 p-4 rounded-full text-3xl text-white top-1 right-1"></i></Link>
                    </div>

                    <h1 className=' text-5xl text-center font-bold'>Log<span className=' text-green-600'>In</span></h1>
                    {apiError && (
                        <div className=' absolute w-full z-20 top-[50px]'>
                            <Error err = {apiError} state={true}/>
                        </div>
                    )}
                    <form className="max-w-md mx-auto p-5 relative" onSubmit={formik.handleSubmit}>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                type="text"
                                name="email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <h2 className=' text-red-500 mb-7'>{formik.errors.email}</h2>
                        )}

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                type="password"
                                name="password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <h2 className=' text-red-500 mb-7'>{formik.errors.password}</h2>
                        )}

                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading ? (<i className="fa-solid fa-spinner fa-spin"></i>) : "Submit"}</button>
                        <h2 className=' text-sm '>If You Do Not Have Account Go To <Link to="/signup" className=' text-green-500 uppercase font-bold'>Register</Link> </h2>
                    </form>
                </div>
            </div>

        </>
    )
}
