import React from 'react'

function ReplyHeader({record}) {

    let loggedIn = localStorage.getItem('username')

  return (
    <>
        <div id="replyHeaderContainer" className='flex items-center mb-4'>         
            <div id="replyAvatar" className='w-8 h-8 mr-4'>
                <img src={record.user.image.webp} alt="" />
            </div>
            <div id="replyCommentName" className='text-darkBlue text-base font-medium leading-normal mr-4'>
                <p>{record.user.username}</p>
            </div>
            { 
                loggedIn === record.user.username ? (
                    <div id="youDiv" className='bg-moderateBlue rounded-[2px] text-white text-[13px] font-medium px-[6px] mr-4'>
                        <p>you</p>
                    </div>
                ) : (
                    ""
                )
             }
            <div id="replyTime" className='text-grayishBlue text-base font-normal leading-6'>
                <p>{record.createdAt}</p>
            </div>
                    
                
            
        </div>
    </>
  )
}

export default ReplyHeader