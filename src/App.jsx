import React from 'react'
import Layout from './pages/Layout/Layout'

import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Brands from './pages/Brands/Brands'
import Cart from './pages/Cart/Cart'
import Categories from './pages/Categories/Categories'
import Products from './pages/Products/Products'
import WishList from './pages/WishList/WishList'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import UserContextProvider from './Context/UserContext'
import WishLoadingContextProvider from './Context/WishLoadingContext'
import CounterContextProvider from './Context/CounterContext'
import NotFound from './pages/NotFound/NotFound'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { ToastContainer, toast } from 'react-toastify'
import ShippingAddress from './pages/ShippingAddress/ShippingAddress'
import CartContextProvider from './Context/CartContext'

export default function App() {
  let route = createHashRouter([
    {path:'/', element:<Layout/>, children:[
      {index:true, element:<Home/>},
      {path:'/brands', element:<Brands/>},
      {path:'/cart', element:<Cart/>},
      {path:'/categories', element:<Categories/>},
      {path:'/products', element:<Products/>},
      {path:'/wishList', element:<WishList/>},
      {path:'/product details/:id/:category', element:<ProductDetails/>},
      {path:'/shipping address', element:<ShippingAddress/>},

      {path:'/*', element:<NotFound/>},


    ]},
    {path:'/login', element:<Login/>},
    {path:'/signup', element:<Signup/>},

  ])
  return (
    <>
    <UserContextProvider>
      <CounterContextProvider>
        <WishLoadingContextProvider>
          <CartContextProvider>
            <RouterProvider router={route}/>
          </CartContextProvider>
        </WishLoadingContextProvider>
        <ToastContainer/>
      </CounterContextProvider>
    </UserContextProvider>
    </>
  )
}
