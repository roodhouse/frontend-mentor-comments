import React from 'react'
import Plus from '../../images/icon-plus.svg'
import Minus from '../../images/icon-minus.svg'
import Reply from '../../images/icon-reply.svg'

function Footer({record}) {
  return (
    <>
        <div id="commentFooterContainer">
            <div id="counterContainer">
                <div id="plus">
                    <img src={Plus} alt="Plus" />
                </div>
                <div id="scoreContainer">
                    <p>{record.score}</p>
                </div>
                <div id="minus">
                    <img src={Minus} alt="Minus" />
                </div>
            </div>
            <div id="replyContainer">
                <div id="replyIcon">
                    <img src={Reply} alt="Reply" />
                </div>
                <div id="replyCopy">
                    <p>Reply</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer