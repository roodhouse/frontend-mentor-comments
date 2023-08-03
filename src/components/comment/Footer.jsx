import React from 'react'
import Plus from '../../images/icon-plus.svg'
import Minus from '../../images/icon-minus.svg'
import Reply from '../../images/icon-reply.svg'

function Footer({record}) {

    function handlePlus() {
        console.log('boom')
        let increase = localStorage.getItem(record.id+'score')
        console.log(increase)
        increase = parseInt(increase)
        console.log(typeof increase)
        increase = ++increase
        localStorage.setItem(record.id+'score', increase)
        console.log(increase)
        document.getElementById('scoreContainer').firstChild.innerHTML = localStorage.getItem(record.id+'score')
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
            
                    {
                        !localStorage.getItem(record.id+'score') ? (() => {
                            localStorage.setItem(record.id+'score', record.score)
                            let score = localStorage.getItem(record.id+'score')
                            console.log(score)
                            return(
                                <p>{score}</p>
                            )
                        })() : (() => {
                            let score = localStorage.getItem(record.id+'score')
                            return(
                                <p>{score}</p>
                            )
                        })()
                    }
                </div>
                <div id="minus">
                    <img src={Minus} alt="Minus" />
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