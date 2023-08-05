import React from 'react'

function Add({allComments, loggedIn, onSubmit}) {

    // function onSubmit(e) {
    //     e.preventDefault()
    //     console.log('hi')
    //     console.log(allComments)
        
    //     let theContent = e.target.parentElement.parentElement.previousSibling.firstChild.value
    //     let newId = allComments.comments.slice(-1)
    //     newId = newId[0].id
    //     newId = ++newId

    //     let newPng = allComments.currentUser.image.png
    //     let newWebp = allComments.currentUser.image.webp
    //     let newUsername = allComments.currentUser.username
         
    //     const newResponse = {
    //         content: theContent,
    //         createdAt: 'today',
    //         id: newId,
    //         replies: [],
    //         score: 0,
    //         user: {
    //             image: {
    //                 png: newPng,
    //                 webp: newWebp
    //             },
    //             username: newUsername
    //         }

    //     }

    //     console.log(newResponse)
    //     allComments.comments.push(newResponse)
    //     localStorage.setItem('allComments', JSON.stringify(allComments))

    // }

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
                        <div id="submitContainer" className='bg-moderateBlue text-white rounded-lg py-3 px-[30px]'>
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