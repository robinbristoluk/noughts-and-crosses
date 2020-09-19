import React from 'react';
import classNames from 'classnames';
import useGameContext from '../Hooks/useGameContext';
import { CSSTransition } from 'react-transition-group';

export default () => {

    const {isGameWon, isGameDrawn, isGameOver, playAgain, whoseTurn, nextPlayerToStart} = useGameContext();

    const classes = classNames({ 'x': nextPlayerToStart === 'X', 'o': nextPlayerToStart === 'O' });

    return  (
        <CSSTransition classNames='gameStatus' in={isGameOver} timeout={300} unmountOnExit>        
            <div className='gameStatus'>
                {isGameWon && <p>Game won by {whoseTurn}</p>}
                {isGameDrawn && <p>Game drawn</p>}
                <button onClick={() => playAgain()}>Play again?</button>
                <p><span className={classes}>{nextPlayerToStart}'s</span> turn to start</p>
            </div>
        </CSSTransition>
    );
}