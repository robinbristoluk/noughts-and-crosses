import React from 'react';
import './App.css';
import GameContextProvider from './Contexts/GameContext';
import Header from './Components/Header';
import Board from './Components/Board';

function App() {
  return (
    <GameContextProvider>
      <div className="App">
        <Header />
        <Board />
      </div>
    </GameContextProvider>
    
  );
}

export default App;
