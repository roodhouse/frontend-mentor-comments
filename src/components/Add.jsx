import React from 'react'

function Add({allComments}) {

  return (
    <>
        <div id="addCommentContainer" className='bg-white rounded-lg p-4'>
            <div id="formContainer">
                <form noValidate>
                    <div id="textContainer" className='mb-4 rounded-lg border border-lightGray pt-3 pl-6'>
                        <textarea name="newComment" id="newComment" placeholder='Add a comment...' cols="30" rows="3" className='placeholder:text-base placeholder:font-normal placeholder:text-grayishBlue'></textarea>
                    </div>
                    <div id="iconSendContainer" className='flex justify-between items-center'>
                        <div id="iconContainer" className='w-8 h-8'>
                            <img src={allComments.currentUser.image.webp} alt="avatar" />
                        </div>
                        <div id="submitContainer" className='bg-moderateBlue text-white rounded-lg py-3 px-[30px]'>
                            <button type='submit'>SEND</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Add