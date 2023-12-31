import React from 'react'

function Add({allComments, loggedIn, onSubmit}) {

  return (
    <>
        <div id="addCommentContainer" className='bg-white rounded-lg p-4 md:p-6 md:h-[144px]'>
            <div id="formContainer">
                <form noValidate>
                    <div id="textContainer" className='mb-4 rounded-lg border border-lightGray pt-3 pl-6 md:ml-[56px] md:mr-[120px] md:mb-0 focus-within:border-moderateBlue'>
                        <textarea name="newComment" id="newComment" placeholder='Add a comment...' cols="30" rows="3" className='w-full placeholder:text-base placeholder:font-normal placeholder:text-grayishBlue caret-moderateBlue focus:outline-none focus:ring-0'></textarea>
                    </div>
                    <div id="iconSendContainer" className='flex justify-between items-center md:mt-[-92px]'>
                        <div id="iconContainer" className='w-8 h-8 md:w-10 md:h-10'>
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
                        <div id="submitContainer" className='bg-moderateBlue text-white rounded-lg py-3 px-[30px] hover:bg-lightGrayBlue cursor-pointer'>
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