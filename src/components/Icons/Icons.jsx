import React from 'react'

export default function Icons({item}) {
    let {name, image} = item
  return (
    <>

    <div className=" col-span-1">
        <div className=" text-green-700 bg-white shadow-md bg-clip-border rounded-xl ">
            <div className=" overflow-hidden text-green-700 bg-white bg-clip-border border-8 rounded-xl">
                <img src={image} alt={name} />
            </div>
            <div className="p-3 text-2xl ">
                <p className=" font-sans antialiased font-normal  text-green-700 opacity-75">{name}</p>
            </div>
        </div>
    </div>
    </>
  )
}
