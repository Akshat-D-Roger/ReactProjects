import React from 'react'
import { useRecoilValue } from 'recoil'
import { ordersAtom } from '../store/atoms/orders'

const Orders = () => {
  const orders = useRecoilValue(ordersAtom);

  return (
    <div className='w-full border-t-[1px] pt-[2rem] mb-[10rem] flex flex-col gap-[2rem]'>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='text-3xl text-gray-500'>YOUR</div>
        <div className='text-3xl'>ORDERS</div>
        <hr className='w-11 border-0 bg-slate-600 h-[2px]' />
      </div>
      <div className="flex flex-col">
          {orders.map((item, index) => {
            return (
              <div key={index} className="flex flex-col sm:flex-row py-4 border-y sm:justify-between sm:items-center gap-5 sm:gap-2">
                <div className="flex flex-row gap-6 w-2/5">
                  <div className="shrink-0"><img src={item.image} alt='product-image' className="w-20" /></div>
                  <div className="flex flex-col gap-4">
                    <div className="text-xs sm:text-lg">{item.name}</div>
                    <div className="flex flex-row gap-4 items-center">
                      <div>${item.price}</div>
                      <div className="border p-2 py-1">{item.size}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-between lg:min-w-[500px] sm:min-w-[300px]'>
                  <div className='flex flex-row items-center'>
                    <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
                    <div className='ml-5'>Packing</div>
                  </div>
                  <div>
                    <button className='p-2 px-4 bg-black text-white'>Track Order</button>
                  </div>
                  </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Orders