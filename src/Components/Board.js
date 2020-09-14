import React from 'react';
import Square from './Square';
import useGameContext from '../Contexts/useGameContext';

export default () => {

    const {squares, isGameWon, isGameDrawn, isGameOver, playAgain} = useGameContext();

    return <>
        {isGameWon && <p>GAME WON</p>}
        {isGameDrawn && <p>GAME DRAWN</p>}
        {isGameOver && <button onClick={() => playAgain()}>Play again?</button>}
        <div className='board'>
        {squares.map((square, index) => {
            return <Square square={square} index={index} key={index} />
        })}
    </div>
    </>
}