import { useState } from 'react';
import Board from './components/Board';

function App() {
  const [tagCount, setTagCount] = useState(0)

  const useCounter = () => {
    setTagCount(tagCount + 1)
    return tagCount
  }
  return (
    <div className="app">
      <Board tagCounter={useCounter} />
      <Board tagCounter={useCounter} />
      <Board tagCounter={useCounter} />
      <Board tagCounter={useCounter} />
    </div>
  );
}

export default App;
