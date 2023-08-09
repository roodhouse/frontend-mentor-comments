import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';

  // bug 4: edit of comment and then refresh causes the @name to appear as many times as there are edits
      // an edit to a comment is removing the span with the @, then on refresh the span comes back so the @ is printed twice
    // comments are sharing the same id. how to change the id by one each time
  // bug 5: unable to delete 3rd level comment
      // might redo delete logic altogther as it can break easily
  // bug 6: 3rd level comments share plus/minus with parent
  // bug 6: mobile css got messed up


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
          // id: newId,
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

      let replyButton =
        replyBox.firstChild.firstChild.firstChild.firstChild.nextSibling
          .firstChild.nextSibling.firstChild;

      replyButton.addEventListener("click", (f) => {
        f.preventDefault();

        let theContent =
          f.target.parentElement.parentElement.parentElement.firstChild
            .firstChild.value;
        if(theContent === '') {
          return
        } else {
            let newPng = storage.currentUser.image.png;
            let newWebp = storage.currentUser.image.webp;
            let newUsername = storage.currentUser.username;
    
            const newResponse = {
              content: theContent,
              createdAt: "today",
              // id: storage.comments.length + 1, // You can generate new ID as needed
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
            theContent.innerHTML = "";
            theContent.value = "";
        }
      });
    } else if (parentIndex === -1) {
      let grandparentComment = parseInt(
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.id
      );
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

          let newPng = storage.currentUser.image.png;
          let newWebp = storage.currentUser.image.webp;
          let newUsername = storage.currentUser.username;

          const parentComment = storage.comments[grandparentIndex].replies[parentIndex];
          const maxId = parentComment.replies.reduce((max, reply) => Math.max(max, reply.id), 0);
          console.log(parentComment)

          const newResponse = {
            content: theContent,
            createdAt: "today",
            // id: maxId + 1, // You can generate new ID as needed
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
            theContent.value = "";
          }

        });
      }
    }
  }

  // edit button click logic
  function handleEdit(e) {
    let commentId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;
    let parentId = commentId.parentElement.parentElement.parentElement;
    commentId = parseInt(commentId.id);
    parentId = parseInt(parentId.id);

    if (e.target.id !== "editContainer") {
      e.target = e.target.parentElement.parentElement;
      let removeText =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.nextSibling.firstChild.firstChild.firstChild;
      let currentText =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.nextSibling.firstChild.firstChild;
      let savedText = currentText.innerHTML;
      currentText.removeChild(removeText);
      currentText = removeText.innerHTML + currentText.innerHTML;

      if (currentText === "undefined") {
        currentText = savedText;
        runEditComment(e);
      } else {
        runEditComment(e);
      }

      function runEditComment(e) {
        e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild.classList.add(
          "hidden"
        );
        let bodyContainer =
          e.target.parentElement.parentElement.parentElement.parentElement
            .firstChild.nextSibling.firstChild;

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
        editComment.innerHTML = currentText;

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

        updateButton.addEventListener("click", (e) => {
          e.preventDefault();

          let parentIndex = storage.comments.findIndex(
            (item) => item.id === parentId
          );
          if (parentIndex !== -1) {
            let parentComment = storage.comments[parentIndex];

            if (parentComment.replies) {
              let commentIndex = parentComment.replies.findIndex(
                (item) => item.id === commentId
              );
              let currentComment = parentComment.replies[commentIndex];
              currentText = editComment.value;

              let updatedComment = {
                content: currentText,
                createdAt: "today",
                id: currentComment.id,
                replies: currentComment.replies,
                replyingTo: currentComment.replyingTo,
                score: currentComment.score,
                user: {
                  image: {
                    png: currentComment.user.image.png,
                    webp: currentComment.user.image.webp,
                  },
                  username: currentComment.user.username,
                },
              };

              const updatedComments = [...storage.comments];
              updatedComments[parentIndex].replies[commentIndex] =
                updatedComment;

              const updatedStorage = {
                ...storage,
                comments: updatedComments,
              };

              localStorage.setItem(
                "allComments",
                JSON.stringify(updatedStorage)
              );
              setStorage(updatedStorage);
              // show updated comment
              e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
                "hidden"
              );
              bodyContainer.removeChild(editCommentWrapper);
            }
          } else {
            let currentComment = parseInt(
              e.target.parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.parentElement.parentElement.id
            );
            let currentText =
              e.target.parentElement.parentElement.firstChild.firstChild;

            let currentIndex = currentComment - 1;
            
            currentComment = storage.comments[currentIndex];
            currentText = editComment.value;

            if (currentComment !== undefined) {
              console.log('here')
              let updatedComment = {
                content: currentText,
                createdAt: "today",
                id: currentComment.id,
                replies: currentComment.replies,
                replyingTo: currentComment.replyingTo,
                score: currentComment.score,
                user: {
                  image: {
                    png: currentComment.user.image.png,
                    webp: currentComment.user.image.webp,
                  },
                  username: currentComment.user.username,
                },
              };
  
              const updatedComments = [...storage.comments];
              updatedComments[currentIndex] = updatedComment;
  
              const updatedStorage = {
                ...storage,
                comments: updatedComments,
              };
  
              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
              setStorage(updatedStorage);
              // show updated comment
              e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
                "hidden"
              );
              bodyContainer.removeChild(editCommentWrapper);
            } else {
                console.log('down here')
                currentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.parentElement.parentElement.id)
                
                let parentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
                  .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)

                let grandparentComment = parseInt(e.target.parentElement.parentElement.parentElement.parentElement
                  .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                  .parentElement.parentElement.id)

                let grandparentIndex = storage.comments.findIndex((item) => item.id === grandparentComment);

                let parentIndex = storage.comments[grandparentIndex].replies.findIndex((item) => item.id === parentComment)

                let currentIndex = storage.comments[grandparentIndex].replies[parentIndex].replies.findIndex((item) => item.id === currentComment)

                let current = storage.comments[grandparentIndex].replies[parentIndex].replies[currentIndex]

                let updatedComment = {
                  content: currentText,
                  createdAt: 'today',
                  id: current.id,
                  replies: current.replies,
                  replyingTo: current.replyingTo,
                  score: current.score,
                  user: {
                    image: {
                      png: current.user.image.png,
                      webp: current.user.image.webp
                    },
                    username: current.user.username
                  }
                }

                console.log(current.replyingTo)
                
                const updatedComments = [...storage.comments];

              updatedComments[grandparentIndex].replies[parentIndex].replies[currentIndex] = updatedComment
  
              const updatedStorage = {
                ...storage,
                comments: updatedComments,
              };
  
              localStorage.setItem("allComments", JSON.stringify(updatedStorage));
              setStorage(updatedStorage);
              // show updated comment
              e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.classList.remove(
                "hidden"
              );
              bodyContainer.removeChild(editCommentWrapper);

              }
            }

        });
      }
    }
  }

  // delete button logic
  function handleDelete(e) {
    
    let deleteId = e.target.closest('.reply')
    console.log(deleteId)
    
    if (deleteId === null) {
      deleteId = e.target.closest('.mainComment')
      deleteId = parseInt(deleteId.id)
      let deleteIndex = deleteId - 1
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
        console.log(deleteId)
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
            console.log('here')
            let parentId = e.target.closest('.mainComment')
            
            parentId = parseInt(parentId.id)

            //// need logic here for sub comments deletion...
            let parentIndex = parentId - 1
            deleteIndex = storage.comments.findIndex( (item) => item.id === parentId)
            console.log(deleteIndex)
            let updatedComments = storage.comments
    
            let newCommentsArray = updatedComments[parentIndex].replies.filter(function (item, index){
              
              return index !== deleteIndex
            })
    
            updatedComments[parentIndex].replies = newCommentsArray
    
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
    
          } else {
            console.log('here in the else')
            console.log(deleteIndex)
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
