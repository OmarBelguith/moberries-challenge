import React from 'react'
import {AiFillBank, AiFillCopy, AiFillCreditCard} from 'react-icons/ai'
export const Navigation: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center text-teal-600 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
          <AiFillBank className="w-full h-full fill-current"/>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Payment Plan</div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
      <div className="flex items-center text-teal-600 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
          <AiFillCreditCard className="w-full h-full fill-current"/>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Payment Details</div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
      <div className="flex items-center text-teal-600 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
          <AiFillCopy className="w-full h-full fill-current"/>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Message</div>
      </div>
    </div>
  )
}
