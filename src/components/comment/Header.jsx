import React from 'react'

function Header({record}) {

  return (
    <>
        <div id="headerContainer" className='flex items-center mb-4'>
            <div id="commentAvatar" className='w-8 h-8 mr-4'>
                <img src={record.user.image.webp} alt="comment avatar" />
            </div>
            <div id="commentName" className='text-darkBlue text-base font-medium leading-normal mr-4'>
                <p>{record.user.username}</p>
            </div>
            <div id="commentTime" className='text-grayishBlue text-base font-normal leading-6'>
                <p>{record.createdAt}</p>
            </div>
        </div>
    </>
  )
}

export default Header