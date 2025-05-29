
import React from 'react'

const OrderItem = ({item}) => {
    return (
        <div className="flex items-start lg:items-center justify-between p-4 bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className='flex flex-wrap w-20 lg:w-[160px]'>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
            </div>
            <p className="text-lg font-bold">{item.quantity}</p>
            <div className="font-bold text-lg text-emerald-500">
                {item.price * item.quantity} kr
            </div>
        </div>
    )
}

export default OrderItem
