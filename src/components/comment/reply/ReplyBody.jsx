import React from 'react'

function ReplyBody({record}) {
  return (
    <>
        <div id="replyBodyContainer" className='text-grayishBlue text-base font-normal leading-6'>
            <p className='replyCommentText'><span className='text-moderateBlue'>{'@' + record.replyingTo}</span> <span>{record.content}</span></p>
        </div>
    </>
  )
}

export default ReplyBody