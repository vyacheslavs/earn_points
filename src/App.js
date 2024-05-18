import './App.css';
import Board from './Board.js';
import HistoryBoard from './HistoryBoard.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HistoryBoard/>
        <div className='board-container'>
          <Board></Board>
        </div>
      </header>
    </div>
  );
}

export default App;
