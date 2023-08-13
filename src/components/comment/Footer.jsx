import React, {useState, useEffect} from 'react'
import Plus from '../../images/icon-plus.svg'
import Minus from '../../images/icon-minus.svg'
import Reply from '../../images/icon-reply.svg'
import DeleteImage from '../../images/icon-delete.svg'
import EditImage from '../../images/icon-edit.svg'

function Footer({record, loggedin, index, handleReply, handleEdit, handleDelete}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)

    function handlePlus(e) {
        const storedComments = localStorage.getItem('allComments')
        let comments = JSON.parse(storedComments).comments
        console.log('comments: ', comments)
        const updatedComments = [...comments]
        console.log('updatedComments: ',updatedComments)
        updatedComments[index].score++
        let newScore = updatedComments[index].score
        console.log(newScore)
        let updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
        updatedAllComments.comments= updatedComments
        // sort logic
        updatedAllComments.comments = [...updatedAllComments.comments].sort((a, b) => b.score - a.score);
        localStorage.setItem('allComments', JSON.stringify(updatedAllComments));
        e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = newScore
       
    }

    function handleMinus(e) {
        if (e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === 0 || e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML === '0' ) {
            return
        } else {
            const storedComments = localStorage.getItem('allComments')
            let comments = JSON.parse(storedComments).comments
            console.log('comments: ', comments)
            const updatedComments = [...comments]
            console.log('updatedComments: ',updatedComments)
            updatedComments[index].score--
            let newScore = updatedComments[index].score
            console.log(newScore)
            const updatedAllComments = { ...JSON.parse(localStorage.getItem('allComments'))}
            updatedAllComments.comments= updatedComments
            // sort logic
            updatedAllComments.comments = [...updatedAllComments.comments].sort((a, b) => b.score - a.score);
            console.log(updatedAllComments)
            localStorage.setItem('allComments', JSON.stringify(updatedAllComments));
            e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = newScore
        }
    }


  return (

    <>
        <div id="commentFooterContainer" className='flex justify-between items-center md:absolute md:w-[682px] md:items-start md:bottom-0'>
            <div id="counterContainer" className='flex items-center py-[10px] pr-[10px] pl-[15px] bg-veryLightGray rounded-[10px] md:flex-col md:py-0 md:px-0 md:w-10'>
                <div id="plus" className='mr-[9px] md:mr-0 md:mb-[19px] md:pt-3 cursor-pointer'>
                    <button onClick={handlePlus}>
                        <img src={Plus} alt="Plus" />
                    </button>
                </div>
                <div id="scoreContainer" className='text-moderateBlue text-center text-base font-medium leading-normal mr-[13px] md:mr-0 md:mb-[21px]'>
                    <p id={record.id+'current'}>{record.score}</p>
                </div>
                <div id="minus" className='md:mb-4'>
                    <button onClick={handleMinus} className='flex items-center cursor-pointer'>
                        <img src={Minus} alt="Minus" />
                    </button>
                </div>
            </div>
            {
                record.user.username === 'juliusomo' ? (
                    <div id="editDeleteContainer" className='flex'>
                        <div id="deleteMineContainer" onClick={handleDelete} className='flex mr-4 items-center cursor-pointer'>
                            <div id="deleteMineIcon" className='mr-2'>
                                <img src={DeleteImage} alt="Delete" />
                            </div>
                            <div id="deleteMineCopy" className='text-softRed text-base font-medium leading-6'>
                                <p>Delete</p>
                            </div>
                        </div>
                        <div id="editContainer" onClick={handleEdit} className='editComment flex items-center cursor-pointer'>
                            <div id="editIcon" className='mr-2'>
                                <img src={EditImage} alt="Edit" />
                            </div>
                            <div id="editCopy" className='text-moderateBlue text-base font-medium leading-6'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="replyContainer" onClick={handleReply} className='flex items-center cursor-pointer'>
                        <div id="replyIcon" className='mr-2 w-[14px] h-[13px] bg-[url("./images/icon-reply.svg")] hover:bg-[url("./images/icon-reply-hover.svg")]' />
                        <div id="replyCopy" className='text-moderateBlue text-base font-medium leading-6 hover:text-lightGrayBlue'>
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