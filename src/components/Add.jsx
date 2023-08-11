import React from 'react'

function Add({allComments, loggedIn, onSubmit}) {

  return (
    <>
        <div id="addCommentContainer" className='bg-white rounded-lg p-4 md:p-6 md:m-h-[144px]'>
            <div id="formContainer">
                <form noValidate>
                    <div id="textContainer" className='mb-4 rounded-lg border border-lightGray pt-3 pl-6 md:ml-[56px] md:mr-[120px]'>
                        <textarea name="newComment" id="newComment" placeholder='Add a comment...' cols="30" rows="3" className='placeholder:text-base placeholder:font-normal placeholder:text-grayishBlue'></textarea>
                    </div>
                    <div id="iconSendContainer" className='flex justify-between items-center md:mt-[-108px]'>
                        <div id="iconContainer" className='w-8 h-8 md:w-10 md:h-10 md:mb-[108px]'>
                            <img src=
                            {
                                allComments === null ? (
                                    ""
                                ) : (
                                    allComments.currentUser.image.webp
                                )
                            } 
                                alt="avatar" />
                        </div>
                        <div id="submitContainer" className='bg-moderateBlue text-white rounded-lg py-3 px-[30px] md:mb-[108px]'>
                            <button onClick={onSubmit} type='submit'>SEND</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Add