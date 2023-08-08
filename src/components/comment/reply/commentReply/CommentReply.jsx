import React from 'react'
import ReplyHeader from '../ReplyHeader'
import ReplyBody from '../ReplyBody'
import ReplyFooter from '../ReplyFooter'

function CommentReply({record, loggedIn, index, replyIndex, allComments, onSubmit, handleReply, handleDelete, handleEdit}) {

  return (

    <>
        <div id="commentReplyContainer" className='border-l-[2px] border-l-lightGray pl-4'>
            {
                record.replies.map((reply, commentReplyIndex) => {
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
                                    <ReplyFooter record={reply} loggedIn={loggedIn} index={index} replyIndex={replyIndex} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete}   />
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

export default CommentReply