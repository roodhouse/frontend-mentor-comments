import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

function App() {
  const [storage, setStorage] = useState(null);
  const [loggedIn, setLoggedIn] = useState("joe");
  const [newEntryId, setNewEntryId] = useState(5)

  useEffect(() => {
    if (localStorage.getItem("allComments") === null) {
      localStorage.setItem("allComments", JSON.stringify(Data));
      let allComments = localStorage.getItem("allComments");
      allComments = JSON.parse(allComments);
      setStorage(allComments);

      let loggedIn = allComments.currentUser.username;
      setLoggedIn(loggedIn);
    } else {
      let allComments = JSON.parse(localStorage.getItem("allComments"));
      let loggedIn = allComments.currentUser.username;
      
      setStorage(allComments);
      setLoggedIn(loggedIn);
    }

    
  
  },[]);

  

  function onSubmit(e) {
    e.preventDefault();

    let theContent = e.target.parentElement.parentElement.previousSibling.firstChild.value;
    if (theContent === '') {
      return
    } else {
        let newId = storage.comments.slice(-1);
        newId = newId[0].id;
        newId = ++newId+'.'+ newId;
    
        let newPng = storage.currentUser.image.png;
        let newWebp = storage.currentUser.image.webp;
        let newUsername = storage.currentUser.username;
    
        const newResponse = {
          content: theContent,
          createdAt: "today",
          id: newEntryId,
          replies: [],
          score: 0,
          user: {
            image: {
              png: newPng,
              webp: newWebp,
            },
            username: newUsername,
          },
        };

        setNewEntryId(newEntryId + 1)
    
        const updatedStorage = {
          ...storage,
          comments: [...storage.comments, newResponse],
        };
    
        localStorage.setItem("allComments", JSON.stringify(updatedStorage));
        setStorage(updatedStorage);
    
        theContent =
          e.target.parentElement.parentElement.previousSibling.firstChild;
        theContent.innerHTML = "";
        theContent.value = "";

    }
  }

  function handleReply(e) {
    let replyBox =
      e.target.parentElement.parentElement.parentElement.parentElement
        .nextSibling;
    let parentComment = parseInt(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.id
    );
    let parentIndex = storage.comments.findIndex(
      (item) => item.id === parentComment
    );

    if (parentIndex !== -1) {
      // Make sure the parent comment is found

      let replyingTo = storage.comments[parentIndex].user.username;
      replyBox.classList.remove("hidden");
      replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.innerHTML =
        "REPLY";

        let replyAt = replyBox.firstChild.firstChild.firstChild.firstChild.firstChild
        
        replyAt.innerHTML = '@' + replyingTo + ' '

      let replyButton =
        replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling
          .firstChild.nextSibling.firstChild;

      replyButton.addEventListener("click", (f) => {
        f.preventDefault();

        let theContent =
          f.target.parentElement.parentElement.parentElement.firstChild
            .firstChild.value;

        let splitContent = theContent.split(' ')

        if(!splitContent[1]){
          return
        } else {
            let newPng = storage.currentUser.image.png;
            let newWebp = storage.currentUser.image.webp;
            let newUsername = storage.currentUser.username;
  
            theContent = theContent.split(' ')

            theContent = ' ' + theContent[1]

            const newResponse = {
              content: theContent,
              createdAt: "today",
              id: newEntryId,
              replyingTo: replyingTo,
              replies: [],
              score: 0,
              user: {
                image: {
                  png: newPng,
                  webp: newWebp,
                },
                username: newUsername,
              },
            };

            setNewEntryId(newEntryId + 1)
    
            const updatedComments = [...storage.comments];
            updatedComments[parentIndex].replies.push(newResponse);
    
            const updatedStorage = {
              ...storage,
              comments: updatedComments,
            };
    
            localStorage.setItem("allComments", JSON.stringify(updatedStorage));
            setStorage(updatedStorage);
    
            replyBox.classList.add("hidden");
            theContent =
              replyBox.firstChild.firstChild.firstChild.firstChild.firstChild;
            theContent.innerHTML = ''
            theContent.value = '@' + replyingTo + ' ';
        }
      });
    } else if (parentIndex === -1) {
      let grandparentComment = parseInt(
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.previousSibling.id
      );
      
        parentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.firstChild.firstChild.id)
      let grandparentIndex = storage.comments.findIndex(
        (item) => item.id === grandparentComment
      );

      parentIndex = storage.comments[grandparentIndex].replies.findIndex(
        (item) => item.id === parentComment
      );

      if (parentIndex !== -1) {
        let replyingTo =
          storage.comments[grandparentIndex].replies[parentIndex].user.username;
        replyBox.classList.remove("hidden");

        let replyAt = replyBox.firstChild.firstChild.firstChild.firstChild.firstChild
        
        replyAt.innerHTML = '@' + replyingTo + ' '

        replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.innerHTML =
          "REPLY";
          
        let replyButton =
          replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling
            .firstChild.nextSibling.firstChild;

        replyButton.addEventListener("click", (g) => {
          g.preventDefault();


          let theContent =
            g.target.parentElement.parentElement.parentElement.firstChild
              .firstChild.value;

              let splitContent = theContent.split(' ')
              
              if(!splitContent[1]){
                return
              } else {
                theContent = theContent.split(' ')
  
                theContent = ' ' + theContent[1]
  
            let newPng = storage.currentUser.image.png;
            let newWebp = storage.currentUser.image.webp;
            let newUsername = storage.currentUser.username;
  
            const newResponse = {
              content: theContent,
              createdAt: "today",
              id: newEntryId,
              replyingTo: replyingTo,
              replies: [],
              score: 0,
              user: {
                image: {
                  png: newPng,
                  webp: newWebp,
                },
                username: newUsername,
              },
            };
  
            setNewEntryId(newEntryId + 1)
  
            if (newResponse.content === '') {
              return
            } else {
              const updatedComments = [...storage.comments];
              updatedComments[grandparentIndex].replies[parentIndex].replies.push(
                newResponse
              );
    
              const updatedStorage = {
                ...storage,
                comments: updatedComments,
              };
    
              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
              setStorage(updatedStorage);
    
              replyBox.classList.add("hidden");
              theContent =
                replyBox.firstChild.firstChild.firstChild.firstChild.firstChild;
              theContent.innerHTML = "";
              theContent.value = '@' + replyingTo + ' ';
            }
                
              }

        });
      }
    }
  }

  // edit button click logic
  function handleEdit(e) {
    // change the markup
    let commentFooterContainer = e.target.parentElement.parentElement.parentElement.parentElement
   
    if (window.innerWidth >= 768) {
       commentFooterContainer.classList.add('md:mb-[118px]')
    }
    // find current comment
    let currentComment = e.target.closest('.reply')
    // find parent comment
    if (currentComment === null) {
      // main reply
      currentComment = e.target.closest('.mainComment')
      // find current id
      let currentId = parseInt(currentComment.id)
      // find current index
      let currentIndex = storage.comments.findIndex((item) => item.id === currentId)
      // find current text
      let currentText = currentComment.children[1].firstChild.firstChild.innerHTML
      // find the current comment info
      let currentCommentInfo = storage.comments[currentIndex]
      // hide the comment div
      currentComment.children[1].firstChild.firstChild.classList.add('hidden')
      // show the comment box
        let bodyContainer = currentComment.children[1].firstChild

        let editCommentWrapper = document.createElement("div");
        editCommentWrapper.setAttribute("id", "editCommentWrapper");

        let editCommentContainer = document.createElement("div");
        editCommentContainer.setAttribute("id", "editCommentContainer");
        editCommentContainer.classList.add("bg-white", "rounded-lg", "p-4");

        let formContainer = document.createElement("div");
        formContainer.setAttribute("id", "formContainer");

        let form = document.createElement("form");
        form.setAttribute("novalidate", true);
        form.classList.add("flex", "flex-col");

        let editTextContainer = document.createElement("div");
        editTextContainer.setAttribute("id", "editTextContainer");
        editTextContainer.classList.add(
          "mb-4",
          "rounded-lg",
          "border",
          "border-lightGray",
          "pt-3",
          "pl-6",
          "z-[99]"
        );

        let editComment = document.createElement("textarea");
        editComment.setAttribute("name", "editComment");
        editComment.setAttribute("id", "editComment");
        editComment.setAttribute("cols", 30);
        editComment.setAttribute("rows", 3);
        editComment.classList.add('w-full')

        editComment.innerHTML = currentText
    
        let editSubmitContainer = document.createElement("div");
        editSubmitContainer.setAttribute("id", "editSubmitContainer");
        editSubmitContainer.classList.add(
          "bg-moderateBlue",
          "text-white",
          "rounded-lg",
          "py-3",
          "px-[30px]",
          "w-[102px]",
          "flex",
          "justify-center",
          "self-end"
        );

        let updateButton = document.createElement("button");
        updateButton.setAttribute("type", "submit");
        updateButton.innerHTML = "UPDATE";

        bodyContainer.appendChild(editCommentWrapper);
        editCommentWrapper.appendChild(editCommentContainer);
        editCommentContainer.appendChild(formContainer);
        formContainer.appendChild(form);
        form.appendChild(editTextContainer);
        editTextContainer.appendChild(editComment);
        form.appendChild(editSubmitContainer);
        editSubmitContainer.appendChild(updateButton);
    
        // add event listener for submit 
        updateButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        currentText = editComment.value

        let updatedComment = {
          content: currentText,
          createdAt: "today",
          id: currentCommentInfo.id,
          replies: currentCommentInfo.replies,
          replyingTo: currentCommentInfo.replyingTo,
          score: currentCommentInfo.score,
          user: {
            image: {
              png: currentCommentInfo.user.image.png,
              webp: currentCommentInfo.user.image.webp,
            },
            username: currentCommentInfo.user.username,
          },
        };

        const updatedComments = [...storage.comments];
        updatedComments[currentIndex] = updatedComment
    
        const updatedStorage = {
          ...storage,
          comments: updatedComments,
        };

        localStorage.setItem("allComments", JSON.stringify(updatedStorage));
        setStorage(updatedStorage);
        // show updated comment
        currentComment.children[1].firstChild.firstChild.classList.remove('hidden')
        bodyContainer.removeChild(editCommentWrapper);

        if (window.innerWidth >= 768) {
           commentFooterContainer.classList.remove('md:mb-[118px]')
        }
        })
      
    } else {
       // reply of a reply
       // find parent comment
       let parentComment = currentComment.parentElement.parentElement.previousSibling
       // find current id
       let currentId = parseInt(currentComment.id)
       // find parent id
       let parentId = parseInt(parentComment.id)
       // find parent index
       let parentIndex = storage.comments.findIndex((item) => item.id === parentId)
       if (parentIndex !== -1) {
        
        // find current index
        let currentIndex = storage.comments[parentIndex].replies.findIndex((item) => item.id === currentId)
        // find current text
        let currentText = currentComment.children[1].firstChild.firstChild
        let theAt = currentText.firstChild.innerHTML
        let theCommentText = currentText.firstChild.nextSibling.nextSibling.innerHTML
        // find the current comment info
        let currentCommentInfo = storage.comments[parentIndex].replies[currentIndex]
        // hide the current comment
        currentComment.children[1].firstChild.firstChild.classList.add('hidden')
        // show the comment box
        let bodyContainer = currentComment.children[1].firstChild
 
         let editCommentWrapper = document.createElement("div");
         editCommentWrapper.setAttribute("id", "editCommentWrapper");
 
         let editCommentContainer = document.createElement("div");
         editCommentContainer.setAttribute("id", "editCommentContainer");
         editCommentContainer.classList.add("bg-white", "rounded-lg", "p-4");
 
         let formContainer = document.createElement("div");
         formContainer.setAttribute("id", "formContainer");
 
         let form = document.createElement("form");
         form.setAttribute("novalidate", true);
         form.classList.add("flex", "flex-col");
 
         let editTextContainer = document.createElement("div");
         editTextContainer.setAttribute("id", "editTextContainer");
         editTextContainer.classList.add(
           "mb-4",
           "rounded-lg",
           "border",
           "border-lightGray",
           "pt-3",
           "pl-6",
           "z-[99]"
         );
 
         let editComment = document.createElement("textarea");
         editComment.setAttribute("name", "editComment");
         editComment.setAttribute("id", "editComment");
         editComment.setAttribute("cols", 30);
         editComment.setAttribute("rows", 3);
         editComment.classList.add('w-full')
 
         editComment.innerHTML = theAt + ' ' + theCommentText
     
         let editSubmitContainer = document.createElement("div");
         editSubmitContainer.setAttribute("id", "editSubmitContainer");
         editSubmitContainer.classList.add(
           "bg-moderateBlue",
           "text-white",
           "rounded-lg",
           "py-3",
           "px-[30px]",
           "w-[102px]",
           "flex",
           "justify-center",
           "self-end"
         );
 
         let updateButton = document.createElement("button");
         updateButton.setAttribute("type", "submit");
         updateButton.innerHTML = "UPDATE";
 
         bodyContainer.appendChild(editCommentWrapper);
         editCommentWrapper.appendChild(editCommentContainer);
         editCommentContainer.appendChild(formContainer);
         formContainer.appendChild(form);
         form.appendChild(editTextContainer);
         editTextContainer.appendChild(editComment);
         form.appendChild(editSubmitContainer);
         editSubmitContainer.appendChild(updateButton);
 
          // add event listener for submit 
          updateButton.addEventListener("click", (e) => {
           e.preventDefault();
 
           currentText = editComment.value
 
           // need to remove @ and replace with the removed div or what ever it did
           currentText = currentText.split(currentText.substring(0, currentText.indexOf(' ')))
           let updatedComment = {
             content: currentText[1],
             createdAt: "today",
             id: currentCommentInfo.id,
             replies: currentCommentInfo.replies,
             replyingTo: currentCommentInfo.replyingTo,
             score: currentCommentInfo.score,
             user: {
               image: {
                 png: currentCommentInfo.user.image.png,
                 webp: currentCommentInfo.user.image.webp,
               },
               username: currentCommentInfo.user.username,
             },
           };
 
           const updatedComments = [...storage.comments];
         updatedComments[parentIndex].replies[currentIndex] = updatedComment
     
         const updatedStorage = {
           ...storage,
           comments: updatedComments,
         };
 
         localStorage.setItem("allComments", JSON.stringify(updatedStorage));
         setStorage(updatedStorage);
         // // show updated comment
         currentComment.children[1].firstChild.firstChild.classList.remove('hidden')
         bodyContainer.removeChild(editCommentWrapper);

         if (window.innerWidth >= 768) {
           commentFooterContainer.classList.remove('md:mb-[118px]')
        }
          })
       } else {
        // reply of reply of comment
        // find grandparent commment
        let grandparentComment = e.target.closest('.reply').parentElement.parentElement.parentElement.parentElement.previousSibling
        // find grandparent id
        let grandparentId = parseInt(grandparentComment.id)
        // find grandparent index
        let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentId)
        // find parent index
        let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentId)
        // find current index
        let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentId)

        // find current text
        let currentText = currentComment.children[1].firstChild.firstChild
        let theAt = currentText.firstChild.innerHTML
        let theCommentText = currentText.firstChild.nextSibling.nextSibling.innerHTML
        // find the current comment info
        let currentCommentInfo = storage.comments[grandparentIndex].replies[parentIndex].replies[currentIndex]
        // hide the current comment
        currentComment.children[1].firstChild.firstChild.classList.add('hidden')
        // show the comment box
        let bodyContainer = currentComment.children[1].firstChild
 
         let editCommentWrapper = document.createElement("div");
         editCommentWrapper.setAttribute("id", "editCommentWrapper");
 
         let editCommentContainer = document.createElement("div");
         editCommentContainer.setAttribute("id", "editCommentContainer");
         editCommentContainer.classList.add("bg-white", "rounded-lg", "p-4");
 
         let formContainer = document.createElement("div");
         formContainer.setAttribute("id", "formContainer");
 
         let form = document.createElement("form");
         form.setAttribute("novalidate", true);
         form.classList.add("flex", "flex-col");
 
         let editTextContainer = document.createElement("div");
         editTextContainer.setAttribute("id", "editTextContainer");
         editTextContainer.classList.add(
           "mb-4",
           "rounded-lg",
           "border",
           "border-lightGray",
           "pt-3",
           "pl-6",
           "z-[99]"
         );
 
         let editComment = document.createElement("textarea");
         editComment.setAttribute("name", "editComment");
         editComment.setAttribute("id", "editComment");
         editComment.setAttribute("cols", 30);
         editComment.setAttribute("rows", 3);
         editComment.classList.add('w-full')
 
         editComment.innerHTML = theAt + ' ' + theCommentText
     
         let editSubmitContainer = document.createElement("div");
         editSubmitContainer.setAttribute("id", "editSubmitContainer");
         editSubmitContainer.classList.add(
           "bg-moderateBlue",
           "text-white",
           "rounded-lg",
           "py-3",
           "px-[30px]",
           "w-[102px]",
           "flex",
           "justify-center",
           "self-end"
         );
 
         let updateButton = document.createElement("button");
         updateButton.setAttribute("type", "submit");
         updateButton.innerHTML = "UPDATE";
 
         bodyContainer.appendChild(editCommentWrapper);
         editCommentWrapper.appendChild(editCommentContainer);
         editCommentContainer.appendChild(formContainer);
         formContainer.appendChild(form);
         form.appendChild(editTextContainer);
         editTextContainer.appendChild(editComment);
         form.appendChild(editSubmitContainer);
         editSubmitContainer.appendChild(updateButton);

         // add event listener for submit 
         updateButton.addEventListener("click", (e) => {
          e.preventDefault();

          currentText = editComment.value

          // need to remove @ and replace with the removed div or what ever it did
          currentText = currentText.split(currentText.substring(0, currentText.indexOf(' ')))
          let updatedComment = {
            content: currentText[1],
            createdAt: "today",
            id: currentCommentInfo.id,
            replies: currentCommentInfo.replies,
            replyingTo: currentCommentInfo.replyingTo,
            score: currentCommentInfo.score,
            user: {
              image: {
                png: currentCommentInfo.user.image.png,
                webp: currentCommentInfo.user.image.webp,
              },
              username: currentCommentInfo.user.username,
            },
          };

          const updatedComments = [...storage.comments];
          updatedComments[grandparentIndex].replies[parentIndex].replies[currentIndex] = updatedComment
    
        const updatedStorage = {
          ...storage,
          comments: updatedComments,
        };

        localStorage.setItem("allComments", JSON.stringify(updatedStorage));
        setStorage(updatedStorage);
        // // show updated comment
        currentComment.children[1].firstChild.firstChild.classList.remove('hidden')
        bodyContainer.removeChild(editCommentWrapper);

        if (window.innerWidth >= 768) {
           commentFooterContainer.classList.remove('md:mb-[118px]')
        }
         })

       }
    }
  }
  

  // delete button logic
  function handleDelete(e) {
    // display the delete module
    let currentComment = e.target.closest('.reply')
    let deleteWrapper = document.getElementById("deleteWrapper");
    deleteWrapper.classList.remove("hidden");
    deleteWrapper = deleteWrapper.firstChild.firstChild;
    document.getElementById("mainWrapper").scrollIntoView();

    // prevent scroll
        function disableScroll() {
          // Get the current page scroll position
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          // if any scroll is attempted, set this to the previous value
          window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
          };
        }
        disableScroll();
    
    // cancel button logic
        let cancelButton = document.getElementById("noButton");
        cancelButton.addEventListener("click", () => {
          // revert the disable scroll function above
          function enableScroll() {
            window.onscroll = function () {};
          }
          enableScroll();
          deleteWrapper = document.getElementById("deleteWrapper");
          deleteWrapper.classList.add("hidden");
          currentComment.scrollIntoView();
        });
    
    // confirm button logic
        let confirmButton = document.getElementById('yesButton')

    // find current comment
    if (currentComment === null) {
      // main comment
      currentComment = e.target.closest('.mainComment')

      // find current comment index
      let currentId = parseInt(currentComment.id)

      let currentIndex = storage.comments.findIndex((item) => item.id === currentId)

      // confirm button logic
      confirmButton.addEventListener('click', () => {

        // return all items in the array except for our current index
        let updatedComments = storage.comments.filter(function (item, index) {
              return index !== currentIndex
                })

                // update the storage
                  let updatedStorage = {
                ...storage,
                comments: updatedComments,
                };
        
              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
                  setStorage(updatedStorage);
        
        // revert the disable scroll function above
              function enableScroll() {
                window.onscroll = function () {};
              }
              enableScroll();

             deleteWrapper = document.getElementById("deleteWrapper");
             deleteWrapper.classList.add("hidden");    
      })
    } else {
      // reply of comment
      // find parent comment 
      let parentComment = currentComment.parentElement.parentElement.previousSibling
      // find parent index
      let parentId = parseInt(parentComment.id)
      let parentIndex = storage.comments.findIndex((item) => item.id === parentId)

      if (parentIndex !== -1) {
        // find current comment index
        let currentId = parseInt(currentComment.id)
        let currentIndex = storage.comments[parentIndex].replies.findIndex((item) => item.id === currentId)
        // confirm button logic
      confirmButton.addEventListener('click', () => {
        // return all items in the array except for our current index
        let updatedComments = storage.comments
        let newCommentsArray = updatedComments[parentIndex].replies.filter(function (item, index) {
              return index !== currentIndex
              })
        updatedComments[parentIndex].replies = newCommentsArray

        // update the storage
                  let updatedStorage = {
                ...storage,
                comments: updatedComments,
                };
        
              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
                  setStorage(updatedStorage);
        
        // revert the disable scroll function above
              function enableScroll() {
                window.onscroll = function () {};
              }
              enableScroll();

             deleteWrapper = document.getElementById("deleteWrapper");
             deleteWrapper.classList.add("hidden");    
      })
      } else {
        // current Comment id
        let currentId = parseInt(currentComment.id)
        // grandparent comment
        let grandparentComment = parentComment.parentElement.parentElement.previousSibling
        // grandparent id
        let grandparentId = parseInt(grandparentComment.id)
        // parent index
        // grandparent index
        let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentId)
        let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentId)
        let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentId)

        // confirm button logic
        confirmButton.addEventListener('click', () => {
          // return all items in the array except for our current index
          let updatedComments = storage.comments
          let newCommentsArray = updatedComments[grandparentIndex].replies[parentIndex].replies.filter(function (item, index) {
                return index !== currentIndex
                })

          updatedComments[grandparentIndex].replies[parentIndex].replies = newCommentsArray
  
          // update the storage
                    let updatedStorage = {
                  ...storage,
                  comments: updatedComments,
                  };
          
                localStorage.setItem("allComments", JSON.stringify(updatedStorage));
                    setStorage(updatedStorage);
          
          // revert the disable scroll function above
                function enableScroll() {
                  window.onscroll = function () {};
                }
                enableScroll();
  
               deleteWrapper = document.getElementById("deleteWrapper");
               deleteWrapper.classList.add("hidden");    
        })
      } 
    }
  }

  return (
    <div className="App" id="app">
      <div id="mainWrapper" className='bg-veryLightGray sm:flex sm:justify-center'>
        <div id="mainContainer" className="bg-veryLightGray py-8 max-w-[730px] md:py-16">
          <div id="commentReplyWrapper" className="px-4 md:px-0">
            <div id="commentWrapper">
              <Comment
                allComments={storage}
                loggedIn={loggedIn}
                handleReply={handleReply}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          <div id="addCommentWrapper" className="px-4 md:px-0">
            <Add
              allComments={storage}
              loggedIn={loggedIn}
              onSubmit={onSubmit}
            />
          </div>
          <div id="deleteWrapper" className="hidden">
            <Delete />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
