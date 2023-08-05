import React from 'react'
import Plus from '../../images/icon-plus.svg'
import Minus from '../../images/icon-minus.svg'
import Reply from '../../images/icon-reply.svg'

function Footer({record, loggedin, index}) {

    let theComments = localStorage.getItem('allComments')
    theComments = JSON.parse(theComments)

    function handlePlus(e) {
        // get id of the response
        console.log(e.target)
        console.log(index)
        let parentComment = theComments.comments[index]
        console.log(parentComment)
        parentComment.score = ++parentComment.score
        localStorage.setItem('allComments', JSON.stringify(theComments))
        
        e.target.parentElement.parentElement.nextSibling.firstChild.innerHTML = parentComment.score
    }

    function handleMinus(e) {
        // get id of the response
        console.log(e.target)
        console.log(index)


        let parentComment = theComments.comments[index]
        console.log(parentComment)
        if (parentComment.score === 0) {
            return
        } else {
            console.log(parentComment.score)
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
            <div id="replyContainer" className='flex items-center'>
                <div id="replyIcon" className='mr-2'>
                    <img src={Reply} alt="Reply" />
                </div>
                <div id="replyCopy" className='text-moderateBlue text-base font-medium leading-6'>
                    <p>Reply</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer