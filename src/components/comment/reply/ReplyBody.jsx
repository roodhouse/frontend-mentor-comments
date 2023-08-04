import React from 'react'

function ReplyBody({record}) {
  return (
    <>
        <div id="replyBodyContainer" className='text-grayishBlue text-base font-normal leading-6'>
            <p><span className='text-moderateBlue'>@{record.replyingTo}</span> {record.content}</p>
        </div>
    </>
  )
}

export default ReplyBody