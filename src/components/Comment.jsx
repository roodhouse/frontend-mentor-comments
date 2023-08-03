import React from 'react'
import Data from '../data.json'
import Header from './comment/Header'
import Body from './comment/Body'
import Footer from './comment/Footer'

// create componets for header, body, footer
// use if statement to check for comments

function Comment() {

  return (
    <>
        <div id="commentContainer">
            {
                Data && Data.comments.map(record => {
                    return(
                        <div id={record.id}>
                            <div id="headerWrapper">
                                <Header record={record} />
                            </div>
                            <div id="commentBodyWrapper">
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