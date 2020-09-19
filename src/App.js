import React from 'react';
import './App.css';
import GameContextProvider from './Contexts/GameContext';
import Header from './Components/Header';
import Board from './Components/Board';
import GameStatus from './Components/GameStatus';

function App() {
  return (
    <GameContextProvider>
      <div className="app">
        <Header />
          <GameStatus />
        <Board />
      </div>
    </GameContextProvider>
    
  );
}

export default App;
