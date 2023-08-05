import React from 'react'
import Plus from '../../../images/icon-plus.svg'
import Minus from '../../../images/icon-minus.svg'
import Reply from '../../../images/icon-reply.svg'
import Delete from '../../../images/icon-delete.svg'
import Edit from '../../../images/icon-edit.svg'

function ReplyFooter({record, loggedIn, index, replyIndex}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)
    
    function handlePlus(e) {
        // get id of the sister comment and then the parent comment
        let sisterComment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.parentElement
        
        let parentComment = sisterComment.parentElement.parentElement.parentElement

        if(sisterComment.classList.contains('reply')) {
            
            sisterComment = sisterComment.id
            parentComment = parentComment.id
            
            parentComment = theComments.comments[index]
            sisterComment = parentComment.replies[replyIndex]

            sisterComment.score = ++sisterComment.score
            localStorage.setItem('allComments', JSON.stringify(theComments))
            e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = sisterComment.score   
        }
    }

    function handleMinus(e) {
        // get id of the sister comment and then the parent comment
        let sisterComment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.parentElement
        let parentComment = sisterComment.parentElement.parentElement.parentElement

        if(sisterComment.classList.contains('reply')) {
            sisterComment = sisterComment.id
            parentComment = parentComment.id

            parentComment = theComments.comments[index]
            sisterComment = parentComment.replies[replyIndex]

            if (sisterComment.score === 0){
                return
            } else {
                sisterComment.score = --sisterComment.score
                localStorage.setItem('allComments', JSON.stringify(theComments))
                e.target.parentElement.parentElement.previousSibling.firstChild.innerHTML = sisterComment.score
            }
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
                    {/* {
                        !localStorage.getItem(record.id+'score') ? (() => {
                            localStorage.setItem(record.id+'score', record.score)
                            let score = localStorage.getItem(record.id+'score')
                            console.log(`from inside the reply:${record.id}`)
                            return(
                                <p id={record.id+'current'}>{score}</p>
                            )
                        })() : (() => {
                            let score = localStorage.getItem(record.id+'score')
                            console.log(`from inside the reply:${record.id}`)
                            console.log(record)
                            return(
                                <p id={record.id+'current'}>{score}</p>
                            )
                        })()
                    } */}

                    
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