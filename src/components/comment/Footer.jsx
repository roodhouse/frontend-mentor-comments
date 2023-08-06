import React from 'react'
import Plus from '../../images/icon-plus.svg'
import Minus from '../../images/icon-minus.svg'
import Reply from '../../images/icon-reply.svg'
import DeleteImage from '../../images/icon-delete.svg'
import EditImage from '../../images/icon-edit.svg'

function Footer({record, loggedin, index, handleReply, handleEdit}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)

    function handlePlus(e) {
        // get id of the response
        let parentComment = theComments.comments[index]
        parentComment.score = ++parentComment.score
        localStorage.setItem('allComments', JSON.stringify(theComments))
        
        e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = parentComment.score
    }

    function handleMinus(e) {
        // get id of the response
        let parentComment = theComments.comments[index]
        if (parentComment.score === 0) {
            return
        } else {
            parentComment.score = --parentComment.score
            localStorage.setItem('allComments', JSON.stringify(theComments))
            e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = parentComment.score
        }
    }
  return (

    <>
        <div id="commentFooterContainer" className='flex justify-between items-center'>
            <div id="counterContainer" className='flex items-center py-[10px] pr-[10px] pl-[15px] bg-veryLightGray rounded-[10px]'>
                <div id="plus" className='mr-[9px]'>
                    <button onClick={handlePlus}>
                        <img src={Plus} alt="Plus" />
                    </button>
                </div>
                <div id="scoreContainer" className='text-moderateBlue text-center text-base font-medium leading-normal mr-[13px]'>
                    <p id={record.id+'current'}>{record.score}</p>
                </div>
                <div id="minus">
                    <button onClick={handleMinus} className='flex items-center'>
                        <img src={Minus} alt="Minus" />
                    </button>
                </div>
            </div>
            {
                record.user.username === 'juliusomo' ? (
                    <div id="editDeleteContainer" className='flex'>
                        <div id="deleteMineContainer" className='flex mr-4 items-center'>
                            <div id="deleteMineIcon" className='mr-2'>
                                <img src={DeleteImage} alt="Delete" />
                            </div>
                            <div id="deleteMineCopy" className='text-softRed text-base font-medium leading-6'>
                                <p>Delete</p>
                            </div>
                        </div>
                        <div id="editContainer" onClick={handleEdit} className='flex items-center'>
                            <div id="editIcon" className='mr-2'>
                                <img src={EditImage} alt="Edit" />
                            </div>
                            <div id="editCopy" className='text-moderateBlue text-base font-medium leading-6'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="replyContainer" onClick={handleReply} className='flex items-center'>
                        <div id="replyIcon" className='mr-2'>
                            <img src={Reply} alt="Reply" />
                        </div>
                        <div id="replyCopy" className='text-moderateBlue text-base font-medium leading-6'>
                            <p>Reply</p>
                        </div>
                    </div>
                )
            }
        </div>
    </>
  )
}

export default Footer