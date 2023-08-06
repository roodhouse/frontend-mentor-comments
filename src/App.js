import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // bug 1: cant update more than one +/- at a time
  // bug 3: a 2nd comment produces the 2nd comment and a blank commment, a 3rd does the same with 2 blank comments
  // bug 4: if a new comment is added before a reply to a comment is made, then the reply to a comment is placed below the new comment 

  
  // edit button click logic
  // send button logic
  // cancel button logic
  // confirm button logic


function App() {

  const [storage, setStorage] = useState(null)
  const [loggedIn, setLoggedIn] = useState('joe')
  const [editContainer, setEditContainer] = useState(null)
  const editContainerRef = useRef(null);

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
      let loggedIn = allComments.currentUser.username
      setStorage(allComments)
      setLoggedIn(loggedIn)
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
    console.log('handlerel')
    let replyBox = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
    let parentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
    let parentIndex = storage.comments.findIndex(item => item.id === parentComment);
    console.log(parentIndex)
    
    if (parentIndex !== -1) { // Make sure the parent comment is found
      
      let replyingTo = storage.comments[parentIndex].user.username
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
          replyingTo: replyingTo,
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
    } else if (parentIndex === -1) {
      let grandparentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
      let grandparentIndex = storage.comments.findIndex(item => item.id === grandparentComment);
      
      parentIndex = storage.comments[grandparentIndex].replies.findIndex(item => item.id === parentComment)

      console.log(parentIndex)
      
        if (parentIndex !== -1) {
          let replyingTo = storage.comments[grandparentIndex].replies[parentIndex].user.username
          replyBox.classList.remove('hidden');

          replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.innerHTML = 'REPLY';
  
          let replyButton = replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild;
          console.log(replyButton)
      
          replyButton.addEventListener('click', (f) => {
            f.preventDefault();
            console.log('click')
      
            let theContent = f.target.parentElement.parentElement.parentElement.firstChild.firstChild.value;

            console.log(theContent)
      
            let newPng = storage.currentUser.image.png;
            let newWebp = storage.currentUser.image.webp;
            let newUsername = storage.currentUser.username;
      
            const newResponse = {
              content: theContent,
              createdAt: 'today',
              id: storage.comments[grandparentIndex].replies[parentIndex].replies.length + 1, // You can generate new ID as needed
              replyingTo: replyingTo,
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

            console.log(newResponse)
      
            const updatedComments = [...storage.comments];
            console.log(updatedComments)
            updatedComments[grandparentIndex].replies[parentIndex].replies.push(newResponse);
            console.log(updatedComments)
      
            const updatedStorage = {
              ...storage,
              comments: updatedComments
            };

            console.log(updatedStorage)
      
            localStorage.setItem('allComments', JSON.stringify(updatedStorage));
            setStorage(updatedStorage);
      
            replyBox.classList.add('hidden');
            theContent = replyBox.firstChild.firstChild.firstChild.firstChild.firstChild
            theContent.innerHTML = ''
            theContent.value = ''
          });
          
        }
    }
  }

  // edit button click logic
  function handleEdit(e) {
    if (e.target.id !== 'editContainer') {
      e.target = e.target.parentElement.parentElement
      let removeText = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild.firstChild
      let currentText = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild
      currentText.removeChild(removeText)
      currentText = removeText.innerHTML + currentText.innerHTML
      e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild.classList.add('hidden')
      let bodyContainer = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild
      
      let editCommentWrapper = document.createElement('div')
      editCommentWrapper.setAttribute('id', 'editCommentWrapper')

      let editCommentContainer = document.createElement('div')
      editCommentContainer.setAttribute('id', 'editCommentContainer')
      editCommentContainer.classList.add('bg-white', 'rounded-lg', 'p-4')

      let formContainer = document.createElement('div')
      formContainer.setAttribute('id', 'formContainer')

      let form = document.createElement('form')
      form.setAttribute('novalidate', true)
      form.classList.add('flex', 'flex-col')

      let editTextContainer = document.createElement('div')
      editTextContainer.setAttribute('id', 'editTextContainer')
      editTextContainer.classList.add('mb-4', 'rounded-lg', 'border', 'border-lightGray', 'pt-3', 'pl-6')

      let editComment = document.createElement('textarea')
      editComment.setAttribute('name', 'editComment')
      editComment.setAttribute('id', 'editComment')
      editComment.setAttribute('cols', 30)
      editComment.setAttribute('rows', 3)
      editComment.innerHTML = currentText

      let editSubmitContainer = document.createElement('div')
      editSubmitContainer.setAttribute('id', 'editSubmitContainer')
      editSubmitContainer.classList.add('bg-moderateBlue', 'text-white', 'rounded-lg', 'py-3', 'px-[30px]', 'w-[102px]', 'flex', 'justify-center', 'self-end')

      let updateButton = document.createElement('button')
      updateButton.setAttribute('type', 'submit')
      updateButton.innerHTML = "UPDATE"

      bodyContainer.appendChild(editCommentWrapper)
      editCommentWrapper.appendChild(editCommentContainer)
      editCommentContainer.appendChild(formContainer)
      formContainer.appendChild(form)
      form.appendChild(editTextContainer)
      editTextContainer.appendChild(editComment)
      form.appendChild(editSubmitContainer)
      editSubmitContainer.appendChild(updateButton)


    }

  }
  
  
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray py-8'>
          <div id='commentReplyWrapper' className=' px-4'>
            <div id='commentWrapper'>
              <Comment allComments={storage} loggedIn={loggedIn} handleReply={handleReply} handleEdit={handleEdit} />
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
