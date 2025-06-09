import React from 'react'

function AdressCard({address}) {
  return (
    <div>
        <div className='space-y-3'>
        <p className='font-semibold'>{`${address?.firstName} ${address?.lastName}`}</p>
        <div className='space-y-1'>
            <p className='font-semibold'>Phone Number</p>
        </div>
    </div>
    </div>
  )
}

export default AdressCard