import React from 'react'
import ReplyHeader from './reply/ReplyHeader'
import ReplyBody from './reply/ReplyBody'
import ReplyFooter from './reply/ReplyFooter'
import Add from '../Add'

function Reply({record, loggedIn, index, allComments, onSubmit}) {

  return (
    <>
        <div id='replyContainer' className='border-l-[2px] border-l-lightGray pl-4'>
            {
                record.replies.map((reply, replyIndex) => {
                    return(
                        <>
                        <div id={reply.id} className='reply bg-white mb-4 p-4 rounded-lg'>
                            <div id='replyHeaderWrapper' className=''>
                                <ReplyHeader record={reply} loggedIn={loggedIn} />
                            </div>
                            <div id='replyBodyWrapper' className='mb-4'>
                                <ReplyBody record={reply} />
                            </div>
                            <div id="replyFooterWrapper">
                                <ReplyFooter record={reply} loggedIn={loggedIn} index={index} replyIndex={replyIndex} />
                            </div>
                            <div id="replyCommentWrapper" className='hidden'>
                                <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                            </div>
                        </div>
                        </>
                        
                    )
                })
            }
        </div>
    </>
  )
}

export default Reply