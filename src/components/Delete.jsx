import React from 'react'

function Delete() {
  return (
    <>
      <div id="deleteContainer" className='flex justify-center'>
        <div className='bg-black h-screen opacity-50 absolute w-full top-0' />
        <div id="deleteModule" className='bg-white py-6 px-7 mx-4 rounded-lg absolute top-[25%] max-w-[343px] md:max-w-[400px] md:p-8'>
          <div id="deleteTop" className='text-darkBlue text-xl font-medium leading-normal mb-4 md:text-2xl md:leading-normal md:mb-5'>
            <p>Delete comment</p>
          </div>
          <div id="deleteBody" className='text-grayishBlue text-base font-normal leading-6 mb-4 md:mb-5'>
            <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
          </div>
          <div id="deleteButtons" className='flex justify-between'>
            <div id="noButton" className='bg-grayishBlue rounded-lg w-[138px] flex justify-center items-center text-white text-base py-3 md:w-[168px] md:mr-[14px]'>
              <button>NO, CANCEL</button>
            </div>
            <div id="yesButton" className='bg-softRed rounded-lg w-[138px] flex justify-center items-center text-white text-base py-3 md:w-[168px]'>
              <button>YES, DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Delete