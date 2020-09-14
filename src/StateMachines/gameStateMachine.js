import { Machine, assign } from 'xstate';
import * as ValidStates from './validStates';
import * as ValidEvents from './validEvents';
import * as ValidActions from './validActions';
import * as ValidGuards from './validGuards';

const winning_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

const getWinningLine = (squares) => {
    const winningCombo =  winning_combos.find(([a,b,c]) => {
        return (squares[a] === squares[b]) &&
               (squares[b] === squares[c]) &&
               !!squares[a];
    });
    return winningCombo;
}

export default Machine({
    id: 'GS',
    context: {
        squares: Array(9).fill(null),
        isXTurn: true,
        xStartedLast: true,
        winningCombo: null
    },
    initial: [ValidStates.PLAYING],
    states: {
        [ValidStates.PLAYING]: {
            initial: ValidStates.X_TURN,
            states: {
                [ValidStates.X_TURN]: {},
                [ValidStates.O_TURN]: {}
            },
            on: {
                [ValidEvents.MAKE_MOVE]: {
                    target: ValidStates.CHECKING_BOARD,
                    actions: [ValidActions.UPDATE_BOARD]
                }
            }
        },
        [ValidStates.CHECKING_BOARD]: {
            always: [
                {
                    target: `#GS.${ValidStates.GAME_OVER}.${ValidStates.WON}`,
                    cond: ValidGuards.IS_GAME_WON,
                    actions: [ValidActions.SET_WINNING_COMBO]
                },
                {
                    target: `#GS.${ValidStates.GAME_OVER}.${ValidStates.DRAWN}`,
                    cond: ValidGuards.IS_BOARD_FULL
                },
                { 
                    target: `#GS.${ValidStates.PLAYING}.${ValidStates.X_TURN}`,
                    cond: ValidGuards.WAS_X_TURN,
                    actions: [ValidActions.UPDATE_WHOSE_TURN]
                },
                { 
                    target: `#GS.${ValidStates.PLAYING}.${ValidStates.O_TURN}`,
                    cond: ValidGuards.WAS_O_TURN,
                    actions: [ValidActions.UPDATE_WHOSE_TURN]
                }
            ]
        },
        [ValidStates.GAME_OVER]: {
            states: {
                [ValidStates.DRAWN]: {

                },
                [ValidStates.WON]: {

                }
            },
            on: {
                [ValidEvents.PLAY_AGAIN]: [
                    {  
                        target: `#GS.${ValidStates.PLAYING}.${ValidStates.X_TURN}`,
                        cond: ValidGuards.O_STARTED_LAST_GAME,
                        actions: [ValidActions.RESET_GAME]
                    },
                    {  
                        target: `#GS.${ValidStates.PLAYING}.${ValidStates.O_TURN}`,
                        cond: ValidGuards.X_STARTED_LAST_GAME,
                        actions: [ValidActions.RESET_GAME]
                    }
                ]
            }
        },
    }
},
{
    actions: {
        [ValidActions.UPDATE_BOARD]: assign({
            squares: ({squares, isXTurn}, event) => squares.map((sq, index) => {
                return index === event.square ?
                    (isXTurn ? 'X' : 'O') :
                    sq;
            })
        }),
        [ValidActions.UPDATE_WHOSE_TURN]: assign({
            isXTurn: context => !context.isXTurn
        }),
        [ValidActions.RESET_GAME]: assign({
            squares: Array(9).fill(null),
            xStartedLast: context => !context.xStartedLast,
            isXTurn: context => !context.xStartedLast,
            winningCombo: null
        }),
        [ValidActions.SET_WINNING_COMBO]: assign({
            winningCombo: (context) => getWinningLine(context.squares)
        })
    },
    guards: {
        [ValidGuards.IS_GAME_WON]: context => {
            const winningLine = getWinningLine(context.squares);
            return !!winningLine;
        },
        [ValidGuards.IS_BOARD_FULL]: context => {
            return !context.squares.some(s => s === null);
        },
        [ValidGuards.WAS_X_TURN]: context => context.isXTurn,
        [ValidGuards.WAS_O_TURN]: context => !context.isXTurn,
        [ValidGuards.X_STARTED_LAST_GAME]: context => context.xStartedLast,
        [ValidGuards.O_STARTED_LAST_GAME]: context => !context.xStartedLast
    }
});