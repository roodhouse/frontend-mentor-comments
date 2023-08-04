import React from 'react'
import Plus from '../../../images/icon-plus.svg'
import Minus from '../../../images/icon-minus.svg'
import Reply from '../../../images/icon-reply.svg'
import Delete from '../../../images/icon-delete.svg'
import Edit from '../../../images/icon-edit.svg'

function ReplyFooter({record, loggedIn}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)
    
    function handlePlus(e) {
        // get id of the parent comment
        let parentComment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.parentElement.id
        console.log(parentComment)
        console.log(theComments)

        // go down and update the plus/minus functions to getting data from theComments var rather than the custom LS, then continue here.

        let increase = localStorage.getItem(record.id+'score')
        // let increase = theComments.
        increase = parseInt(increase)
        increase = ++increase
        localStorage.setItem(record.id+'score', increase)
        e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = localStorage.getItem(record.id+'score')
    }

    function handleMinus(e) {
        let decrease = localStorage.getItem(record.id+'score')
        decrease = parseInt(decrease)
        if (decrease === 0) {
            return
        } else {
            decrease = --decrease
            localStorage.setItem(record.id+'score', decrease)
            e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = localStorage.getItem(record.id+'score')
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
                    {
                        !localStorage.getItem(record.id+'score') ? (() => {
                            localStorage.setItem(record.id+'score', record.score)
                            let score = localStorage.getItem(record.id+'score')
    
                            return(
                                <p id={record.id+'current'}>{score}</p>
                            )
                        })() : (() => {
                            let score = localStorage.getItem(record.id+'score')
                            return(
                                <p id={record.id+'current'}>{score}</p>
                            )
                        })()
                    }
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
                        <div id="deleteMineContainer" className='flex mr-4 items-center'>
                            <div id="deleteMineIcon" className='mr-2'>
                                <img src={Delete} alt="Delete" />
                            </div>
                            <div id="deleteMineCopy" className='text-softRed text-base font-medium leading-6'>
                                <p>Delete</p>
                            </div>
                        </div>
                        <div id="editContainer" className='flex items-center'>
                            <div id="editIcon" className='mr-2'>
                                <img src={Edit} alt="Edit" />
                            </div>
                            <div id="editCopy" className='text-moderateBlue text-base font-medium leading-6'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="replyButtonContainer" className='flex items-center'>
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