import React, {createContext} from 'react';
import useGameStateMachine from '../StateMachines/useGameStateMachine';
import * as ValidStates from '../StateMachines/validStates';
import * as ValidEvents from '../StateMachines/validEvents';

export const gameContext = createContext();

export default ({children}) => {
    const [current, send] = useGameStateMachine();

    const isInState = (toCheck) => current.matches(toCheck);

    const providerObj = {
        squares: current.context.squares,
        whoseTurn: current.context.isXTurn ? 'X' : 'O',
        isPlaying: isInState(ValidStates.PLAYING),
        isGameOver: isInState(ValidStates.GAME_OVER),
        isGameWon: isInState(`${ValidStates.GAME_OVER}.${ValidStates.WON}`),
        isGameDrawn: isInState(`${ValidStates.GAME_OVER}.${ValidStates.DRAWN}`),
        iCheckingBoard: isInState(ValidStates.CHECKING_BOARD),
        isSquareEmpty: index => {
            return !current.context.squares[index];
        },
        isWinningSquare: index => {
            return current.context.winningCombo !== null && current.context.winningCombo.includes(index);
        },
        markSquare: index => send(ValidEvents.MAKE_MOVE, {square: index}),
        playAgain: () => send(ValidEvents.PLAY_AGAIN)
    };

    return <gameContext.Provider value={providerObj}>
        {children}
    </gameContext.Provider>
};