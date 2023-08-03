import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';


  // add logic for "you"  and delete buttons
// delete module

function App() {
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray px-4 py-8'>
          <div id='commentReplyWrapper'>
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
          <div id='addCommentWrapper'>
            <Add />
          </div>
          {/* <div id='delete'>
            <Delete />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
