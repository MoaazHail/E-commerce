import React from 'react'

export default function MyFooter() {
  return (
    <>
      <footer className="bg-slate-500 ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className=' font-bold font-serif text-4xl'>My <span className='text-green-500'>Store</span></h1>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-lg font-bold text-gray-900 uppercase ">Resources</h2>
                <ul className="text-white  font-medium">
                  <li className="mb-4">
                    <a href="https://react.dev/" className="hover:underline"> React</a>
                  </li>
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-lg font-bold text-gray-900 uppercase ">Follow Me</h2>
                <ul className="text-white  font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/MoaazHail" className="hover:underline ">Github</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/moaaz-al-shahed/" className="hover:underline">Linked In</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-lg font-bold text-gray-900 uppercase ">Legal</h2>
                <ul className="text-white  font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-white sm:text-center ">© 2024 Moaaz Hail™. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
