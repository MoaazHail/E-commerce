import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CounterContext } from '../../Context/CounterContext';

export default function MyNavbar() {
  let { token, setToken } = useContext(UserContext);
  // let {counter,setCounter} = useContext(CounterContext);
  // setCounter(0)
  let [toggle,setToggle] = useState(false)
  let navigate = useNavigate()

  function logout(){
    setToken(null);
    localStorage.clear();
  } 
  function toggleNavbar(){
    setToggle(!toggle);
  }

  return (
    <>
      <nav className=' w-full p-6 bg-slate-300 flex justify-between items-center fixed z-20 '>
        <Link to={"/"}>
          <h1 className=' font-bold font-serif w-20 text-1xl md:text-3xl md:w-44'>My <span className='text-green-500'>Store</span></h1>
        </Link>

        <div className='hidden flex-wrap md:flex md:text-sm w-full'>
          <ul className='flex justify-center items-center gap-10 w-full'>
            <NavLink to={"/"} className=' cursor-pointer font-bold text-1xl '>Home</NavLink>
            <NavLink to={"/wishList"} className=' cursor-pointer font-bold text-1xl '>Wish List</NavLink>
            <NavLink to={"/products"} className=' cursor-pointer font-bold text-1xl'>Products</NavLink>
            <NavLink to={"/categories"} className=' cursor-pointer font-bold text-1xl '>Categories</NavLink>
            <NavLink to={"/brands"} className=' cursor-pointer font-bold text-1xl '>Brands</NavLink>
          </ul>
        </div>

        <div className=' flex items-center justify-center text-1xl gap-5'>

        <div className='md:hidden text-2xl' onClick={toggleNavbar}>
            <i className="fa-solid fa-bars"></i>
        </div>

        {toggle && (<>
          <div className='text-sm  md:hidden absolute top-[90px] bg-slate-300 w-full left-0 border-2 border-gray-600 shadow-2xl'>
          <ul className='flex flex-col justify-center items-center flex-wrap gap-7 w-full py-3 text-center'>
            <NavLink to={"/"} className=' cursor-pointer font-bold text-1xl  w-full'>Home</NavLink>
            <NavLink to={"/wishList"} className=' cursor-pointer font-bold text-1xl w-full  '>Wish List</NavLink>
            <NavLink to={"/products"} className=' cursor-pointer font-bold text-1xl w-full '>Products</NavLink>
            <NavLink to={"/categories"} className=' cursor-pointer font-bold text-1xl w-full '>Categories</NavLink>
            <NavLink to={"/brands"} className=' cursor-pointer font-bold text-1xl w-full '>Brands</NavLink>
          </ul>
        </div>
        </>)}

          {token || localStorage.getItem('Token')  ? (
            <>
              <Link to={"/cart"} className=' relative p-3'>
                <i className="fa-solid fa-cart-shopping text-slate-900  cursor-pointer hover:text-green-700 relative text-xl" onClick={()=>navigate('/cart')}></i>
                <span className=' bg-green-500 rounded-full absolute px-2 text-sm left-5 top-0'  >{0}</span>
              </Link>
              
              <i className="fa-solid fa-circle-user text-green-500  hover:text-green-700 text-4xl cursor-pointer "></i>              

              <button className='font-bold' onClick={logout}>Logout <i className="fa-solid fa-arrow-right-from-bracket text-red-500"></i></button>
            </>
          ) : (
            <>
              <Link to={"/Login"} className='font-bold py-1 px-3 rounded-lg border-green-500 border-2'>Login </Link>
              <Link to={"/Signup"} className='font-bold py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-700 '>Signup </Link>
            </>
          )
          }


        </div>
      </nav>
    </>
  )
}
