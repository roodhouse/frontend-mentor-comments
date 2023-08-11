import React from 'react'
import ReplyHeader from './reply/ReplyHeader'
import ReplyBody from './reply/ReplyBody'
import ReplyFooter from './reply/ReplyFooter'
import Add from '../Add'
import CommentReply from './reply/commentReply/CommentReply'

function Reply({record, loggedIn, index, allComments, onSubmit, handleReply, handleEdit, handleDelete}) {

  return (
    <>
        <div id='replyContainer' className='replyContainer border-l-[2px] border-l-lightGray pl-4'>
            {
                record.replies.map((reply, replyIndex) => {
                    return(
                        reply.replies.length > 0 ? (
                            <>
                            <div id={reply.id} className='reply bg-white mb-4 p-4 rounded-lg md:p-6 md:mb-5'>
                                <div id='replyHeaderWrapper' className='md:ml-16'>
                                    <ReplyHeader record={reply} loggedIn={loggedIn} />
                                </div>
                                <div id='replyBodyWrapper' className='mb-4 md:ml-16 md:mb-0'>
                                    <ReplyBody record={reply} />
                                </div>
                                <div id="replyFooterWrapper" className='md:relative'>
                                    <ReplyFooter record={reply} loggedIn={loggedIn} index={index} replyIndex={replyIndex} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </div>
                                <div id="replyCommentWrapper" className='hidden'>
                                    <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                                </div>
                            </div>
                                <div id='commentReplyWrapper'>
                                    <CommentReply record={reply} loggedIn={loggedIn} index={index} replyIndex={replyIndex} allComments={allComments} onSubmit={onSubmit} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </div>
                            </>

                        ) : (
                            <>
                            <div id={reply.id} className='reply bg-white mb-4 p-4 rounded-lg md:p-6 md:mb-5'>
                                <div id='replyHeaderWrapper' className='md:ml-16'>
                                    <ReplyHeader record={reply} loggedIn={loggedIn} />
                                </div>
                                <div id='replyBodyWrapper' className='mb-4 md:ml-16 md:mb-0'>
                                    <ReplyBody record={reply} />
                                </div>
                                <div id="replyFooterWrapper" className='md:relative'>
                                    <ReplyFooter record={reply} loggedIn={loggedIn} index={index} replyIndex={replyIndex} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </div>
                                <div id="replyCommentWrapper" className='hidden'>
                                    <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                                </div>
                            </div>
                            </>
                        )
                        
                    )
                })
            }
        </div>
    </>
  )
}

export default Reply