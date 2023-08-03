import React from 'react'
import Data from '../data.json'
import Header from './comment/Header'
import Body from './comment/Body'
import Footer from './comment/Footer'

function Comment() {

    

  return (
    <>
        <div id="commentContainer">
            {
                Data && Data.comments.map(record => {
                    return(
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
                })
            }
        </div>
    </>
  )
}

export default Comment