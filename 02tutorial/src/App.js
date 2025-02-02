import logo from './logo.svg';
import './App.css';

function App() {
  // Gives a random name from list of 3 names!
  const handleNameChange = () => {
    const names = ['Bob', 'Kevin', 'Stuart'];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Hello {handleNameChange()}!
        </p>

      </header>
    </div>
  );
}

export default App;
