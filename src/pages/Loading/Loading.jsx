import React from "react";
import loader from "../../assets/Images/loader.webp"

export default function Loading() {
    return (
        <>
            <div className=" flex justify-center items-center flex-col w-full h-screen">
                <div className="loader">
                    <img src={loader} alt="loader" width={400}  />
                </div>

                <div className="slogan">
                    <h1 className="text-4xl font-bold">Welcome to <span className=" text-green-600">My Store</span> Website </h1>
                </div>
            </div>
        </>
    );
}
