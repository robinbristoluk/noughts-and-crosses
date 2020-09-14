import React, {createContext} from 'react';
import useGameStateMachine from '../StateMachines/useGameStateMachine';

export const gameContext = createContext();

export default ({children}) => {
    const [current, send] = useGameStateMachine();

    const isInState = (toCheck) => current.matches(toCheck);

    const providerObj = {
        squares: current.context.squares,
        whoseTurn: current.context.isXTurn ? 'X' : 'O',
        isPlaying: isInState('playing'),
        isGameOver: isInState('game_over'),
        isGameWon: isInState('game_over.won'),
        isGameDrawn: isInState('game_over.drawn'),
        iCheckingBoard: isInState('checking_board'),
        isSquareEmpty: index => {
            return !current.context.squares[index];
        },
        isWinningSquare: index => {
            return current.context.winningCombo !== null && current.context.winningCombo.includes(index);
        },
        markSquare: index => send('MAKE_MOVE', {square: index}),
        playAgain: () => send('PLAY_AGAIN')
    };

    return <gameContext.Provider value={providerObj}>
        {children}
    </gameContext.Provider>
};