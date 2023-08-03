import React from 'react'

function ReplyBody({record}) {
  return (
    <>
        <div id="replyBodyContainer" className='text-grayishBlue text-base font-normal leading-6'>
            <p>{record.content}</p>
        </div>
    </>
  )
}

export default ReplyBody