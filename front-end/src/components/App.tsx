import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 * The function displays the entire screen with the Mock Header
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>
          Mock
          </h1>
      </p>
      <REPL />      
    </div>
  );
}

export default App;
