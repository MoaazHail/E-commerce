import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import signUp from '../../assets/Images/signUp.svg'
import Error from '../../components/Error/Error';

export default function Signup() {

    let [loading, setLoading] = useState(false);
    let [apiError, setApiError] = useState('');
    let navigate = useNavigate();
    let { token, setToken } = useContext(UserContext);


    async function submit(values) {
        setLoading(true);

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then((res) => {
                setLoading(false);
                console.log(res);
                if (res.data.message == "success") {
                    localStorage.setItem("Token", res.data.token);
                    setToken(res.data.token)
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
            name: yup.string().min(3, "*Name Must Be At Least 3 Char").required("*Name Must Be Required"),
            email: yup.string().email("*Email Is Not Valid").required("*Email Must Be Required"),
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "*Requires at least one lowercase letter Or at least one uppercase letter\n*Requires at least one digit\n*Requires at least one special character")
                .min(6, "*Password Must Be At Least 6 Char").required("*Password Must Be Required"),
            rePassword: yup.string().oneOf([yup.ref('password')], "*Password Not Match").required("Re Password Must Be Required"),
            phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone Is Not Valid").required("Phone Must Be Required")
        });
    }

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: validationSchema,
        onSubmit: submit
    });


    return (
        <>
            <div className=' flex justify-center items-center bg-gray-400 min-h-screen'>
                <div className=' w-[500px] hidden md:block'>
                    <img src={signUp} alt="" />
                </div>


                <div className=' relative bg-white py-20 px-6  rounded-lg border-x-4 border-green-600 m-5'>
                    <div className=' flex justify-center items-center'>
                        <Link to={'/'}><i className=" absolute fa-solid fa-house bg-green-700 p-4 rounded-full text-3xl text-white top-1 right-1"></i></Link>
                    </div>

                    <h1 className=' text-5xl text-center font-bold'>Sign <span className=' text-green-600'>Up</span></h1>
                    {apiError && (
                        <div className=' absolute w-full z-20 top-[50px]'>
                            <Error err={apiError} state={true} />
                        </div>
                    )}
                    <form className="max-w-md mx-auto p-5 relative" onSubmit={formik.handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                type="text"
                                name="name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Full name</label>
                        </div>
                        {formik.errors.name && formik.touched.name && (
                            <h2 className=' text-red-500 mb-7'>{formik.errors.name}</h2>
                        )}

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

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.rePassword}
                                type="password"
                                name="rePassword"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Re Password</label>
                        </div>
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <h2 className=' text-red-500 mb-7'>{formik.errors.rePassword}</h2>
                        )}

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                type="tel"
                                name="phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Phone number</label>
                        </div>
                        {formik.errors.phone && formik.touched.phone && (
                            <h2 className=' text-red-500 mb-7'>{formik.errors.phone}</h2>
                        )}

                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading ? (<i className="fa-solid fa-spinner fa-spin"></i>) : "Submit"}</button>
                        <h3 className=' text-sm  capitalize'>if you have an account please go to <Link to="/login" className=' cursor-pointer text-green-500 font-bold uppercase'>login</Link></h3>
                    </form>

                </div>
            </div>
        </>
    )
}
