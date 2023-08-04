import React, { useEffect } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // reply button click logic
    // save new reply to local storage
    // change the data on load to come from ls rather than data file
  // edit button click logic
  // send button logic
  // cancel button logic
  // confirm button logic

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
              <Comment />
            </div>
            {
              Data && Data.comments.map(record => {
                return(
                  record.replies.length > 0 ? (
                    <div id='replyWrapper'>
                      <Reply record={record} />
                    </div>
                  ) : (
                    ""
                  )
                )
              })
            }
          </div>
          <div id='addCommentWrapper' className='px-4'>
            <Add />
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
