import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // css fixed but bugs reintroduced
  // but 3: cannnot update created comment
  // bug 4: cannnot delete created comment
  // bug 1: cannot update first level reply
  // bug 2: cannot delete first level reply
  // bug 5: cannot update 3rd level comment
  // bug 6: cannnot delete 3rd level comment

  // full screen view
  // sorting logic from readme


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
    // let commentId =
    //   e.target.parentElement.parentElement.parentElement.parentElement
    //     .parentElement.parentElement;
        
    // let parentId = commentId.parentElement.parentElement.parentElement;
    
    // commentId = parseInt(commentId.id);
    // parentId = parseInt(parentId.id);

    // let mainComment = e.target.closest('.mainComment')

    //       let parentIndex = storage.comments.findIndex(
    //         (item) => item.id === parentId
    //       );
    
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
          "pl-6"
        );

        let editComment = document.createElement("textarea");
        editComment.setAttribute("name", "editComment");
        editComment.setAttribute("id", "editComment");
        editComment.setAttribute("cols", 30);
        editComment.setAttribute("rows", 3);

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
        })
      
    } else {
      
      let parentComment = currentComment.closest('.replyContainer').firstChild
      
      // find grandparent comment 
      let grandparentComment = parentComment.parentElement.parentElement.previousSibling
      // find current id
      let currentId = parseInt(currentComment.id)
      // find parent id
      let parentId = parseInt(parentComment.id)
      // find grandparent id
      let grandparentId = parseInt(grandparentComment.id)
  
      // find grandparent index    
      let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentId)
      // find parent index
      let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentId)
      // find current index
      let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentId)

      if (e.target.id !== 'editContainer') {
  
        if (parentComment === null) {
          console.log('reply')
        } else {
          let editContainer = e.target.parentElement.parentElement
          let theComment = editContainer.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild
          let theAt = theComment.firstChild.innerHTML
          let theCommentText = theComment.firstChild.nextSibling.nextSibling.innerHTML
  
        }
  
      }

    }
    // if (e.target.id !== "editContainer") {
    //   e.target = e.target.parentElement.parentElement;
    //   let removeText =
    //     e.target.parentElement.parentElement.parentElement.parentElement
    //       .firstChild.nextSibling.firstChild.firstChild.firstChild;
      
    //   let currentText = mainComment.firstChild.nextSibling.firstChild.firstChild.innerHTML;

    //   if (currentText === undefined) {
    //     // currentText = savedText;
    //     runEditComment(e);
    //   } else {
    //     runEditComment(e);
    //   }

    //   function runEditComment(e) {
    //     e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild.classList.add(
    //       "hidden"
    //     );
    //     let bodyContainer =
    //       e.target.parentElement.parentElement.parentElement.parentElement
    //         .firstChild.nextSibling.firstChild;

    //     let editCommentWrapper = document.createElement("div");
    //     editCommentWrapper.setAttribute("id", "editCommentWrapper");

    //     let editCommentContainer = document.createElement("div");
    //     editCommentContainer.setAttribute("id", "editCommentContainer");
    //     editCommentContainer.classList.add("bg-white", "rounded-lg", "p-4");

    //     let formContainer = document.createElement("div");
    //     formContainer.setAttribute("id", "formContainer");

    //     let form = document.createElement("form");
    //     form.setAttribute("novalidate", true);
    //     form.classList.add("flex", "flex-col");

    //     let editTextContainer = document.createElement("div");
    //     editTextContainer.setAttribute("id", "editTextContainer");
    //     editTextContainer.classList.add(
    //       "mb-4",
    //       "rounded-lg",
    //       "border",
    //       "border-lightGray",
    //       "pt-3",
    //       "pl-6"
    //     );

    //     let editComment = document.createElement("textarea");
    //     editComment.setAttribute("name", "editComment");
    //     editComment.setAttribute("id", "editComment");
    //     editComment.setAttribute("cols", 30);
    //     editComment.setAttribute("rows", 3);
        
    //     if (removeText.innerHTML === undefined) {
        
    //       editComment.innerHTML = currentText
    //     } else {
        
    //       editComment.innerHTML = removeText.innerHTML + ' ' + currentText;
    //     }

    //     let editSubmitContainer = document.createElement("div");
    //     editSubmitContainer.setAttribute("id", "editSubmitContainer");
    //     editSubmitContainer.classList.add(
    //       "bg-moderateBlue",
    //       "text-white",
    //       "rounded-lg",
    //       "py-3",
    //       "px-[30px]",
    //       "w-[102px]",
    //       "flex",
    //       "justify-center",
    //       "self-end"
    //     );

    //     let updateButton = document.createElement("button");
    //     updateButton.setAttribute("type", "submit");
    //     updateButton.innerHTML = "UPDATE";

    //     bodyContainer.appendChild(editCommentWrapper);
    //     editCommentWrapper.appendChild(editCommentContainer);
    //     editCommentContainer.appendChild(formContainer);
    //     formContainer.appendChild(form);
    //     form.appendChild(editTextContainer);
    //     editTextContainer.appendChild(editComment);
    //     form.appendChild(editSubmitContainer);
    //     editSubmitContainer.appendChild(updateButton);

    //     updateButton.addEventListener("click", (e) => {
    //       e.preventDefault();

    //       let parentIndex = storage.comments.findIndex(
    //         (item) => item.id === parentId
    //       );
    //       if (parentIndex !== -1) {
    //         let parentComment = storage.comments[parentIndex];

    //         if (parentComment.replies) {
    //           let commentIndex = parentComment.replies.findIndex(
    //             (item) => item.id === commentId
    //           );
    //           let currentComment = parentComment.replies[commentIndex];
    //           currentText = editComment.value;

    //           let theAt = currentText.split(currentText.substring(0, currentText.indexOf(' ')))

    //           currentText = theAt[1]

    //           let updatedComment = {
    //             content: currentText,
    //             createdAt: "today",
    //             id: currentComment.id,
    //             replies: currentComment.replies,
    //             replyingTo: currentComment.replyingTo,
    //             score: currentComment.score,
    //             user: {
    //               image: {
    //                 png: currentComment.user.image.png,
    //                 webp: currentComment.user.image.webp,
    //               },
    //               username: currentComment.user.username,
    //             },
    //           };

    //           const updatedComments = [...storage.comments];
    //           updatedComments[parentIndex].replies[commentIndex] =
    //             updatedComment;

    //           const updatedStorage = {
    //             ...storage,
    //             comments: updatedComments,
    //           };

    //           localStorage.setItem(
    //             "allComments",
    //             JSON.stringify(updatedStorage)
    //           );
    //           setStorage(updatedStorage);
    //           // show updated comment
    //           e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
    //             "hidden"
    //           );
    //           bodyContainer.removeChild(editCommentWrapper);
    //         }
    //       } else {
    //         let currentComment = parseInt(
    //           e.target.parentElement.parentElement.parentElement.parentElement
    //             .parentElement.parentElement.parentElement.parentElement.id
    //         );
    //         let currentText =
    //           e.target.parentElement.parentElement.firstChild.firstChild;

    //         let currentIndex = currentComment - 1;
            
    //         currentComment = storage.comments[currentIndex];
    //         currentText = editComment.value;

    //         if (currentComment !== undefined) {
    //           let updatedComment = {
    //             content: currentText,
    //             createdAt: "today",
    //             id: currentComment.id,
    //             replies: currentComment.replies,
    //             replyingTo: currentComment.replyingTo,
    //             score: currentComment.score,
    //             user: {
    //               image: {
    //                 png: currentComment.user.image.png,
    //                 webp: currentComment.user.image.webp,
    //               },
    //               username: currentComment.user.username,
    //             },
    //           };
  
    //           const updatedComments = [...storage.comments];
    //           updatedComments[currentIndex] = updatedComment;
  
    //           const updatedStorage = {
    //             ...storage,
    //             comments: updatedComments,
    //           };
  
    //           localStorage.setItem("allComments", JSON.stringify(updatedStorage));
    //           setStorage(updatedStorage);
    //           // show updated comment
    //           e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
    //             "hidden"
    //           );
    //           bodyContainer.removeChild(editCommentWrapper);
    //         } else {
    //             currentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
    //             .parentElement.parentElement.parentElement.parentElement.id)
                
    //             let parentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
    //               .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)


    //               if(isNaN(parentComment)) {
    //                 // new comment update
    //               } else {
    //                 let grandparentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
    //                   .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    //                   .parentElement.parentElement.id)
                     
    //                 let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentComment);
    
    
    
    //                 let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentComment)
    
    //                 let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentComment)
    
    //                 let current = storage.comments[grandparentIndex].replies[parentIndex].replies[currentIndex]
    
    //                 let theAt = currentText.split(currentText.substring(0, currentText.indexOf(' ')))
    
    //               currentText = theAt[1]
    
    //                 let updatedComment = {
    //                   content: currentText,
    //                   createdAt: 'today',
    //                   id: current.id,
    //                   replies: current.replies,
    //                   replyingTo: current.replyingTo,
    //                   score: current.score,
    //                   user: {
    //                     image: {
    //                       png: current.user.image.png,
    //                       webp: current.user.image.webp
    //                     },
    //                     username: current.user.username
    //                   }
    //                 }
                    
    //               const updatedComments = [...storage.comments];
    
    //               updatedComments[grandparentIndex].replies[parentIndex].replies[currentIndex] = updatedComment
      
    //               const updatedStorage = {
    //                 ...storage,
    //                 comments: updatedComments,
    //               };
      
    //               localStorage.setItem("allComments", JSON.stringify(updatedStorage));
    //               setStorage(updatedStorage);
    //               // show updated comment
    //               e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
    //                 "hidden"
    //               );
    //               bodyContainer.removeChild(editCommentWrapper);

    //               }


    //           }
    //         }

    //     });
    //   }
    // }
  }

  // delete button logic
  function handleDelete(e) {
    
    let deleteId = e.target.closest('.reply')
    
    if (deleteId === null) {
      deleteId = e.target.closest('.mainComment')
      deleteId = parseInt(deleteId.id)
      let deleteComment = e.target;
      let deleteWrapper = document.getElementById("deleteWrapper");
      deleteWrapper.classList.remove("hidden");
      deleteWrapper = deleteWrapper.firstChild.firstChild;
      document.getElementById("mainWrapper").scrollIntoView();

        function disableScroll() {
          // Get the current page scroll position
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          let scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
          // if any scroll is attempted, set this to the previous value
          window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
          };
        }
        disableScroll();

        let cancelButton = document.getElementById("noButton");
        cancelButton.addEventListener("click", () => {
          // revert the disable scroll function above
          function enableScroll() {
            window.onscroll = function () {};
          }
          enableScroll();
          deleteWrapper = document.getElementById("deleteWrapper");
          deleteWrapper.classList.add("hidden");
          deleteComment.scrollIntoView();
        });

        let confirmButton = document.getElementById('yesButton')
        confirmButton.addEventListener('click', () => {
          let deleteIndex = storage.comments.findIndex(
            (item) => item.id === deleteId
          );
          let updatedComments = storage.comments.filter(function (item, index) {
            return index !== deleteIndex
          })
    
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
        deleteId = parseInt(deleteId.id)
        let deleteComment = e.target;
        let deleteWrapper = document.getElementById("deleteWrapper");
        deleteWrapper.classList.remove("hidden");
        deleteWrapper = deleteWrapper.firstChild.firstChild;
        document.getElementById("mainWrapper").scrollIntoView();
    
        function disableScroll() {
          // Get the current page scroll position
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          let scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
          // if any scroll is attempted, set this to the previous value
          window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
          };
        }
        disableScroll();
    
        let cancelButton = document.getElementById("noButton");
        cancelButton.addEventListener("click", () => {
          // revert the disable scroll function above
          function enableScroll() {
            window.onscroll = function () {};
          }
          enableScroll();
          deleteWrapper = document.getElementById("deleteWrapper");
          deleteWrapper.classList.add("hidden");
          deleteComment.scrollIntoView();
        });
    
        let confirmButton = document.getElementById('yesButton')
        confirmButton.addEventListener('click', () => {
          let deleteIndex = storage.comments.findIndex(
            (item) => item.id === deleteId
          );
    
          if (deleteIndex === -1) {

            // comment of a comment
            let currentId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            let parentId = currentId.parentElement.parentElement.parentElement
            let grandparentId = parentId.parentElement.parentElement.parentElement

            currentId = parseInt(currentId.id)
            parentId = parseInt(parentId.id)
            grandparentId = parseInt(grandparentId.id)

            if (isNaN(grandparentId)) {
              // reply of reply
              let parentIndex = storage.comments.findIndex((item) => item.id === parentId)
              let currentIndex = storage.comments[parentIndex].replies.findIndex((item) => item.id === currentId)

              let updatedComments = storage.comments
              let newCommentsArray = updatedComments[parentIndex].replies.filter(function (item, index) {
                return index !== currentIndex
              })
              
              updatedComments[parentIndex].replies = newCommentsArray

              let updatedStorage = {
                ...storage,
                comments: updatedComments,
              };

              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
              setStorage(updatedStorage)

              // revert the disable scroll function 
              function enableScroll() {
                window.onscroll = function () {};
              }
              enableScroll()
              deleteWrapper = document.getElementById('deleteWrapper')
              deleteWrapper.classList.add('hidden')

            } else {
              let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentId)
          
              let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentId)
  
              let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentId )
  
              let updatedComments = storage.comments
      
              let newCommentsArray = updatedComments[grandparentIndex].replies[parentIndex].replies.filter(function (item, index){
                
                return index !== currentIndex
              })
      
              updatedComments[grandparentIndex].replies[parentIndex].replies = newCommentsArray
      
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
            }

    
          } else {
              let updatedComments = storage.comments.filter(function (item, index) {
                return index !== deleteIndex
              })
        
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
          }
              
        })
    }
  }

  return (
    <div className="App" id="app">
      <div id="mainWrapper">
        <div id="mainContainer" className="bg-veryLightGray py-8">
          <div id="commentReplyWrapper" className=" px-4">
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
          <div id="addCommentWrapper" className="px-4">
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
