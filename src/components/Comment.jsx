import React, { Fragment } from 'react'
import Header from './comment/Header'
import Body from './comment/Body'
import Footer from './comment/Footer'
import Reply from './comment/Reply'
import Add from './Add'

function Comment({allComments, loggedIn, handleReply, onSubmit, handleEdit, handleDelete}) {
  return (
    <>
        <div id="commentContainer">
            {
                allComments && allComments.comments.map((record, index) => {
                    
                    return(
                        
                        record.replies.length > 0 ? (
                            <>
                                <div id={record.id} className='mainComment bg-white mb-4 p-4 rounded-lg md:p-6 md:mb-5'>
                                    <div id="headerWrapper" className='md:ml-16'>
                                        <Header record={record} loggedIn={loggedIn} />
                                    </div>
                                    <div id="commentBodyWrapper" className='mb-4 md:ml-16 md:mb-0 md:min-h-[72px]'>
                                        <Body record={record} />
                                    </div>
                                    <div id="commentFooterWrapper" className='md:relative'>
                                        <Footer record={record} loggedIn={loggedIn} index={index} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    </div>
                                    <div id="replyCommentWrapper" className='hidden'>
                                        <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                                    </div>
                                </div>    
                                    <div id='replyWrapper'>
                                        <Reply record={record} loggedIn={loggedIn} index={index} allComments={allComments} onSubmit={onSubmit} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    </div>
                            
                            </>
                        ) : (
                        <div id={record.id} className='mainComment bg-white mb-4 p-4 rounded-lg md:p-6'>
                            <div id="headerWrapper" className='md:ml-16'>
                                <Header record={record} />
                            </div>
                            <div id="commentBodyWrapper" className='mb-4 md:ml-16 md:mb-0 md:min-h-[72px]'>
                                <Body record={record} />
                            </div>
                            <div id="commentFooterWrapper" className='md:relative'>
                                <Footer record={record} loggedIn={loggedIn} index={index} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} />
                            </div>
                            <div id="replyCommentWrapper" className='hidden'>
                                <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                            </div>
                        </div>
                        )


                    )
                })
            }
        </div>
    </>
  )
}

export default Comment