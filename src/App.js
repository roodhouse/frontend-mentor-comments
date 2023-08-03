import './App.css';
import Comment from './components/Comment'
import Add from './components/Add';

// comment card
// add comment card
// delete module

function App() {
  return (
    <div className="App" id='app'>
      <div id='mainWrapper'>
        <div id='mainContainer' className='bg-veryLightGray px-4 py-8'>
          <div id='commentWrapper'>
            <Comment />
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
