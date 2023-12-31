import React from 'react'
import Plus from '../../../images/icon-plus.svg'
import Minus from '../../../images/icon-minus.svg'
import Reply from '../../../images/icon-reply.svg'
import Delete from '../../../images/icon-delete.svg'
import Edit from '../../../images/icon-edit.svg'

function ReplyFooter({record, loggedIn, index, replyIndex, handleReply, handleEdit, handleDelete}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)

 
    function handlePlus(e) {
        const storedComments = localStorage.getItem('allComments')
        let allC = JSON.parse(storedComments).comments
        let theId = allC[index].replies.findIndex((item) => item.id === record.id)
        
        if (theId === -1) {
            // reply of reply, bring in adjusted logic from below  
            let comments = JSON.parse(storedComments).comments[index].replies[replyIndex].replies
            let currentIndex = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
            currentIndex = parseInt(currentIndex)
            let currentComment = comments.findIndex((item) => item.id === currentIndex)
            let updatedComments = [...comments]
            updatedComments[currentComment].score++
            let newScore = updatedComments[currentComment].score

            const updatedAllComments = {...JSON.parse(localStorage.getItem('allComments'))}
            updatedAllComments.comments[index].replies[replyIndex].replies = updatedComments
            localStorage.setItem('allComments', JSON.stringify(updatedAllComments))
            e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = newScore
        
        } else {
            let comments = JSON.parse(storedComments).comments[index].replies
            const updatedComments = [...comments]
            updatedComments[replyIndex].score++
            let newScore = updatedComments[replyIndex].score
            
            const updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
            updatedAllComments.comments[index].replies = updatedComments
            localStorage.setItem('allComments', JSON.stringify(updatedAllComments))
            e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = newScore
        }
    }

    function handleMinus(e) {
        if (e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === 0 || e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === '0') {
            return
        } else {
            const storedComments = localStorage.getItem('allComments')
            let allC = JSON.parse(storedComments).comments
            let theId = allC[index].replies.findIndex((item) => item.id === record.id)
            if (theId === -1) {
                // reply of reply
                console.log('minus reply of reply')
                let comments = JSON.parse(storedComments).comments[index].replies[replyIndex].replies
                let currentIndex = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
                currentIndex = parseInt(currentIndex)
                let currentComment = comments.findIndex((item) => item.id === currentIndex)
                let updatedComments = [...comments]
                updatedComments[currentComment].score--
                let newScore = updatedComments[currentComment].score

                const updatedAllComments = {...JSON.parse(localStorage.getItem('allComments'))}
                updatedAllComments.comments[index].replies[replyIndex].replies = updatedComments
                localStorage.setItem('allComments', JSON.stringify(updatedAllComments))

                e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = newScore

            } else {
                let comments = JSON.parse(storedComments).comments[index].replies
                const updatedComments = [...comments]
                updatedComments[replyIndex].score--
                let newScore = updatedComments[replyIndex].score
                
                const updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
                updatedAllComments.comments[index].replies = updatedComments
                localStorage.setItem('allComments', JSON.stringify(updatedAllComments))
                e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = newScore
            }
        }

    }

  return (
    <>
        <div id="replyFooterContainer" className='flex justify-between items-center md:absolute md:w-[595px] md:items-start md:bottom-0'>
            <div id="replyCounterContainer" className='flex items-center py-[10px] pr-[10px] pl-[15px] bg-veryLightGray rounded-[10px] md:flex-col md:py-0 md:px-0 md:w-10'>
                <div id="replyPlus" className='mr-[9px] md:mr-0 md:mb-[19px] md:pt-3'>
                    <button onClick={handlePlus}>
                        <img src={Plus} alt="Plus" />
                    </button>
                </div>
                <div id="replyScoreContainer" className='text-moderateBlue text-center text-base font-medium leading-normal mr-[13px] md:mr-0 md:mb-[21px]'>
                         <p id={record.id+'current'}>{record.score}</p>
                </div>
                <div id="replyMinus" className='md:mb-4'>
                    <button onClick={handleMinus} className='flex items-center'>
                        <img src={Minus} alt="Minus" />
                    </button>
                </div>
            </div>
            {
                loggedIn === record.user.username ? (
                    <div id="editDeleteContainer" className='flex'>
                        <div id="deleteMineContainer" onClick={handleDelete} className='flex mr-4 items-center cursor-pointer'>
                        <div id="deleteMineIcon" className='mr-2 w-3 h-[14px] bg-[url("./images/icon-delete.svg")]'/>
                            <div id="deleteMineCopy" className='text-softRed text-base font-medium leading-6 hover:text-paleRed'>
                                <p>Delete</p>
                            </div>
                        </div>
                        <div id="editContainer" onClick={handleEdit} className='editComment flex items-center cursor-pointer'>
                        <div id="editIcon" className='mr-2 w-[14px] h-[14px] bg-[url("./images/icon-edit.svg")]' />
                            <div id="editCopy" className='text-moderateBlue text-base font-medium leading-6 hover:text-lightGrayBlue'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="replyButtonContainer"  onClick={handleReply} className='flex items-center cursor-pointer'>
                        <div id="replyButtonIcon" className='mr-2 w-[14px] h-[13px] bg-[url("./images/icon-reply.svg")] hover:bg-[url("./images/icon-reply-hover.svg")]' />
                        <div id="replyButtonCopy" className='text-moderateBlue text-base font-medium leading-6 hover:text-lightGrayBlue'>
                            <p>Reply</p>
                        </div>
                    </div>
                )
            }
        </div>
    </>
  )
}

export default ReplyFooter