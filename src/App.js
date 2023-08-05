import React, { useState, useEffect } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // bug 1: cant update more than one +/- at a time

  // reply button click logic
    // reply of main comment
    // reply of subcomment
    // save new reply to local storage
      // save reply as an object with the user details and comment
      // overview of ls https://blog.logrocket.com/localstorage-javascript-complete-guide/
  // edit button click logic
  // send button logic
  // cancel button logic
  // confirm button logic


function App() {

  const [storage, setStorage] = useState(null)
  const [loggedIn, setLoggedIn] = useState('joe')

  useEffect(() => {
    if (localStorage.getItem('allComments') === null ) {
      localStorage.setItem('allComments', JSON.stringify(Data))
      let allComments = localStorage.getItem('allComments')
      allComments = JSON.parse(allComments)
      setStorage(allComments)

      let loggedIn = allComments.currentUser.username
      setLoggedIn(loggedIn)
    } else {
      let allComments = JSON.parse(localStorage.getItem('allComments'))
      setStorage(allComments)
    }
  },[])

  function onSubmit(e) {
    e.preventDefault()
    
    let theContent = e.target.parentElement.parentElement.previousSibling.firstChild.value
    let newId = storage.comments.slice(-1)
    newId = newId[0].id
    newId = ++newId

    let newPng = storage.currentUser.image.png
    let newWebp = storage.currentUser.image.webp
    let newUsername = storage.currentUser.username
     
    const newResponse = {
        content: theContent,
        createdAt: 'today',
        id: newId,
        replies: [],
        score: 0,
        user: {
            image: {
                png: newPng,
                webp: newWebp
            },
            username: newUsername
        }

    }

    const updatedStorage = {
      ...storage,
      comments: [...storage.comments, newResponse]
    }

    localStorage.setItem('allComments', JSON.stringify(updatedStorage))
    setStorage(updatedStorage)

    theContent = e.target.parentElement.parentElement.previousSibling.firstChild
    theContent.innerHTML = ''
    theContent.value = ''
}


  // function imageSrc() {
  //  if  (storage === null) {
  //     return ""
  //  } else {

  //    return storage.currentUser.image.webp
  //  }
  
  // }

  

  function handleReply(e) {
    console.log('yipee')
    let replyBox = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling
    replyBox.classList.remove('hidden')
    replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.innerHTML = 'REPLY'

    let replyButton = replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild
    console.log(replyButton)

    replyButton.addEventListener('click', (e) => {
      e.preventDefault()
      // run the onSubmit algo with updated elements...
      console.log('lick')
    })
    

  }
  
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray py-8'>
          <div id='commentReplyWrapper' className=' px-4'>
            <div id='commentWrapper'>
              <Comment allComments={storage} loggedIn={loggedIn} handleReply={handleReply} />
            </div>
          </div>
          <div id='addCommentWrapper' className='px-4'>
            <Add allComments={storage} loggedIn={loggedIn} onSubmit={onSubmit} />
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
