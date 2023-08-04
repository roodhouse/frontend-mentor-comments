import React, { useEffect } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // reply button click logic
    // save new reply to local storage
      // save reply as an object with the user details and comment
      // overview of ls https://blog.logrocket.com/localstorage-javascript-complete-guide/
  // edit button click logic
  // send button logic
  // cancel button logic
  // confirm button logic

  localStorage.setItem('allComments', JSON.stringify(Data))
  let allComments = localStorage.getItem('allComments')
  allComments = JSON.parse(allComments)

  let loggedIn = allComments.currentUser.username

function App() {

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', Data.currentUser.username)
    } 
  })
  
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray py-8'>
          <div id='commentReplyWrapper' className=' px-4'>
            <div id='commentWrapper'>
              <Comment allComments={allComments} />
            </div>
            {
              allComments && allComments.comments.map(record => {
                return(
                  record.replies.length > 0 ? (
                    <div id='replyWrapper'>
                      <Reply record={record} loggedIn={loggedIn} />
                    </div>

                  ) : (
                    ""
                  )
                )
              })
            }
          </div>
          <div id='addCommentWrapper' className='px-4'>
            <Add allComments={allComments} />
          </div>
          <div id='deleteWrapper' className='hidden'>
            <Delete />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
