import React, { Fragment } from 'react'
import Header from './comment/Header'
import Body from './comment/Body'
import Footer from './comment/Footer'
import Reply from './comment/Reply'
import Add from './Add'

// move reply component here if there are replies then find them from here. that way we can track the parent component
// fix css

function Comment({allComments, loggedIn, handleReply, onSubmit}) {

  return (
    <>
        <div id="commentContainer">
            {
                allComments && allComments.comments.map((record, index) => {
                    
                    return(
                        
                        record.replies.length > 0 ? (
                            
                        <div id={record.id} className='bg-white mb-4 p-4 rounded-lg'>
                            <div id="headerWrapper">
                                <Header record={record} />
                            </div>
                            <div id="commentBodyWrapper" className='mb-4'>
                                <Body record={record} />
                            </div>
                            <div id="commentFooterWrapper">
                                <Footer record={record} loggedIn={loggedIn} index={index} handleReply={handleReply} />
                            </div>
                            <div id="replyCommentWrapper" className='hidden'>
                                <Add allComments={allComments} loggedIn={loggedIn} onSubmit={onSubmit} />
                            </div>
                            <div id='replyWrapper'>
                                 <Reply record={record} loggedIn={loggedIn} index={index} allComments={allComments} onSubmit={onSubmit} />
                            </div>
                        </div>    
                        ) : (
                        <div id={record.id} className='bg-white mb-4 p-4 rounded-lg'>
                            <div id="headerWrapper">
                                <Header record={record} />
                            </div>
                            <div id="commentBodyWrapper" className='mb-4'>
                                <Body record={record} />
                            </div>
                            <div id="commentFooterWrapper">
                                <Footer record={record} loggedIn={loggedIn} index={index} handleReply={handleReply} />
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