import React from 'react'

function EmptyState() {
  return (
    <div className='w-full h-full  md:flex hidden items-center justify-center bg-slate-100 dark:bg-neutral-900'>
        <h4 className='font-semibold text-xl'>Select User to Display Conversations</h4>
    </div>
  )
}

export default EmptyState