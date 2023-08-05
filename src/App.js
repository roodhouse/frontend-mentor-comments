import React, { useState, useEffect } from 'react'
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

  
// **** i have set to load from LS.... need to understand what is being passed around to other components and go from there
  

  // const newComment = {
  //   content: 'Hi there',
  //   createdAt: 'Today',
  //   id: 7,
  //   replies: [],
  //   score: 0,
  //   user: {
  //     username: 'john',
  //     image: 'none'
  //   }
  // }

  // let currentComments = allComments.comments
  // // allComments.comments.push(newComment)

  // console.log(currentComments)

  // currentComments.push(newComment)

function App() {

  const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('allComments')))
  const [loggedIn, setLoggedIn] = useState('joe')
  console.log(storage)

  useEffect(() => {
    if (localStorage.getItem('allComments') === null ) {
      console.log('hi')
      localStorage.setItem('allComments', JSON.stringify(Data))
      let allComments = localStorage.getItem('allComments')
      allComments = JSON.parse(allComments)
      setStorage(allComments)
  
      let loggedIn = allComments.currentUser.username
      setLoggedIn(loggedIn)
    }
  },[])
  
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray py-8'>
          <div id='commentReplyWrapper' className=' px-4'>
            <div id='commentWrapper'>
              <Comment allComments={storage} loggedIn={loggedIn} />
            </div>
            {/* {
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
            } */}
          </div>
          <div id='addCommentWrapper' className='px-4'>
            <Add allComments={storage} />
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
