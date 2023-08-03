import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';
import Data from './data.json'
import Reply from './components/comment/Reply';
import Delete from './components/Delete';


  // add logic for "you"  and delete buttons
// delete module

function App() {
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
