import React, { Fragment } from 'react'
import Header from './comment/Header'
import Body from './comment/Body'
import Footer from './comment/Footer'
import Reply from './comment/Reply'

// move reply component here if there are replies then find them from here. that way we can track the parent component
// fix css

function Comment({allComments, loggedIn}) {

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
                                <Footer record={record} />
                            </div>
                            <div id='replyWrapper'>
                                 <Reply record={record} loggedIn={loggedIn} index={index} />
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
                                <Footer record={record} />
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