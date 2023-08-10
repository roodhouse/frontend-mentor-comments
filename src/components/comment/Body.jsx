import React from 'react'

function Body({record}) {
  return (
    <>
        <div id="bodyContainer" className='text-grayishBlue text-base font-normal leading-6'>
            <p className='mainCommentText'>{record.content}</p>
        </div>
    </>
  )
}

export default Body