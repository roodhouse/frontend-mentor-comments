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
        let comments = JSON.parse(storedComments).comments[index].replies
        console.log('comments: ', comments)
        const updatedComments = [...comments]
        console.log(updatedComments[replyIndex])
        updatedComments[replyIndex].score++
        let newScore = updatedComments[replyIndex].score
        
        const updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
        updatedAllComments.comments[index].replies = updatedComments
        localStorage.setItem('allComments', JSON.stringify(updatedAllComments))
        console.log(e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML)
        console.log(newScore)
        e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = newScore
    }

    function handleMinus(e) {
        if (e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === 0 || e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === '0') {
            return
        } else {
            const storedComments = localStorage.getItem('allComments')
            let comments = JSON.parse(storedComments).comments[index].replies
            console.log('comments: ', comments)
            const updatedComments = [...comments]
            console.log(updatedComments[replyIndex])
            updatedComments[replyIndex].score--
            let newScore = updatedComments[replyIndex].score
            
            const updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
            updatedAllComments.comments[index].replies = updatedComments
            localStorage.setItem('allComments', JSON.stringify(updatedAllComments))
            console.log(newScore)
            e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = newScore
        }

    }

  return (
    <>
        <div id="replyFooterContainer" className='flex justify-between items-center'>
            <div id="replyCounterContainer" className='flex items-center py-[10px] pr-[10px] pl-[15px] bg-veryLightGray rounded-[10px]'>
                <div id="replyPlus" className='mr-[9px]'>
                    <button onClick={handlePlus}>
                        <img src={Plus} alt="Plus" />
                    </button>
                </div>
                <div id="replyScoreContainer" className='text-moderateBlue text-center text-base font-medium leading-normal mr-[13px]'>
                         <p id={record.id+'current'}>{record.score}</p>
                </div>
                <div id="replyMinus">
                    <button onClick={handleMinus} className='flex items-center'>
                        <img src={Minus} alt="Minus" />
                    </button>
                </div>
            </div>
            {
                loggedIn === record.user.username ? (
                    <div id="editDeleteContainer" className='flex'>
                        <div id="deleteMineContainer" onClick={handleDelete} className='flex mr-4 items-center'>
                            <div id="deleteMineIcon" className='mr-2'>
                                <img src={Delete} alt="Delete" />
                            </div>
                            <div id="deleteMineCopy" className='text-softRed text-base font-medium leading-6'>
                                <p>Delete</p>
                            </div>
                        </div>
                        <div id="editContainer" onClick={handleEdit} className='editComment flex items-center'>
                            <div id="editIcon" className='mr-2'>
                                <img src={Edit} alt="Edit" />
                            </div>
                            <div id="editCopy" className='text-moderateBlue text-base font-medium leading-6'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="replyButtonContainer"  onClick={handleReply} className='flex items-center'>
                        <div id="replyButtonIcon" className='mr-2'>
                            <img src={Reply} alt="Reply" />
                        </div>
                        <div id="replyButtonCopy" className='text-moderateBlue text-base font-medium leading-6'>
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