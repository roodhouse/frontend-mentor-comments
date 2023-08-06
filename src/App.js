import React, { useState, useEffect } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // bug 1: cant update more than one +/- at a time
  // bug 2: you logic not showing up at times

  // reply button click logic
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

  function handleReply(e) {
    let replyBox = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
    let parentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
    let parentIndex = storage.comments.findIndex(item => item.id === parentComment);
  
    if (parentIndex !== -1) { // Make sure the parent comment is found
      
      replyBox.classList.remove('hidden');
      replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.innerHTML = 'REPLY';
  
      let replyButton = replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild;
  
      replyButton.addEventListener('click', (f) => {
        f.preventDefault();
  
        let theContent = f.target.parentElement.parentElement.parentElement.firstChild.firstChild.value;
  
        let newPng = storage.currentUser.image.png;
        let newWebp = storage.currentUser.image.webp;
        let newUsername = storage.currentUser.username;
  
        const newResponse = {
          content: theContent,
          createdAt: 'today',
          id: storage.comments.length + 1, // You can generate new ID as needed
          replies: [],
          score: 0,
          user: {
            image: {
              png: newPng,
              webp: newWebp
            },
            username: newUsername
          }
        };
  
        const updatedComments = [...storage.comments];
        updatedComments[parentIndex].replies.push(newResponse);
  
        const updatedStorage = {
          ...storage,
          comments: updatedComments
        };
  
        localStorage.setItem('allComments', JSON.stringify(updatedStorage));
        setStorage(updatedStorage);
  
        replyBox.classList.add('hidden');
        theContent = replyBox.firstChild.firstChild.firstChild.firstChild.firstChild
        theContent.innerHTML = ''
        theContent.value = ''
      });
    } 
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
