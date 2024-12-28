import React, { useState } from 'react'
import img from '../../assets/Images/error.webp';


export default function Error({ err, state }) {
  let [hide,setHide] = useState(state);
  console.log(state);
  function toggle (){
    setHide(!hide);
  }



  return (
    <>
    {hide &&(
            <div class="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 h-auto rounded-2xl bg-white [box-shadow:var(--shadow)] max-w-[300px]">
            <div class="flex flex-col items-center justify-between pt-9 px-6 pb-6 relative">
              <img src={img} alt="Error Image"/>
    
              <h5 class="text-2xl mb-5 text-red-700 text-center font-bold">
                {err}
              </h5>
    
              <button
                class="font-semibold right-6 bottom-6 cursor-pointer py-2 px-8 w-max break-keep text-sm rounded-lg transition-colors text-green-900 hover:text-white bg-green-500 hover:bg-green-900"
                type="button"
                onClick={toggle}
              >
                Accept
              </button>
            </div>
          </div>

    )}


    </>
  )
}
