import React from 'react'
import ReplyHeader from '../ReplyHeader'
import ReplyBody from '../ReplyBody'
import ReplyFooter from '../ReplyFooter'

function CommentReply({record, loggedIn, index, replyIndex, allComments, onSubmit, handleReply, handleDelete, handleEdit}) {

  return (

    <>
        <div id="commentReplyContainer" className='border-l-[2px] border-l-lightGray pl-4 md:ml-0 md:pl-[4px]'>
            {
                record.replies.map((reply, commentReplyIndex) => {
                    return(
                        <>
                            <div id={reply.id} className='reply bg-white mb-4 p-4 rounded-lg md:p-6 md:mb-5'>
                                <div id='replyHeaderWrapper' className='md:ml-16'>
                                    <ReplyHeader record={reply} loggedIn={loggedIn} />
                                </div>
                                <div id='replyBodyWrapper' className='mb-4 md:ml-16 md:mb-0 md:min-h-[72px]'>
                                    <ReplyBody record={reply} />
                                </div>
                                <div id="replyFooterWrapper" className='md:relative'>
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