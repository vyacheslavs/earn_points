import logo from './logo.svg';
import './App.css';
import Board from './Board.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='board-container'>
          <Board></Board>
        </div>
      </header>
    </div>
  );
}

export default App;
