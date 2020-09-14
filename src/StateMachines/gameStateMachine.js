import { Machine, assign } from 'xstate';

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
    initial: 'playing',
    states: {
        playing: {
            on: {
                MAKE_MOVE: {
                    target: 'checkingBoard',
                    actions: 'updateGame'
                }
            }
        },
        checkingBoard: {
            always: [
                {
                    target: '#GS.gameOver.won',
                    cond: 'isGameWon',
                    actions: 'setWinningCombo'
                },
                {
                    target: '#GS.gameOver.drawn',
                    cond: 'isBoardFull'
                },
                { 
                    target: '#GS.playing',
                    actions: 'updateWhoseTurn'
                }
            ]
        },
        gameOver: {
            states: {
                won: {},
                drawn: {}
            },
            on: {
                PLAY_AGAIN: [
                    {  
                        target: '#GS.playing',
                        actions: 'resetGame'
                    }
                ]
            }
        },
    }
},
{
    actions: {
        updateGame: assign({
            squares: ({squares, isXTurn}, event) => squares.map((sq, index) => {
                return index === event.square ?
                    (isXTurn ? 'X' : 'O') :
                    sq;
            })
        }),
        updateWhoseTurn: assign({
            isXTurn: context => !context.isXTurn
        }),
        resetGame: assign({
            squares: Array(9).fill(null),
            xStartedLast: context => !context.xStartedLast,
            isXTurn: context => !context.xStartedLast,
            winningCombo: null
        }),
        setWinningCombo: assign({
            winningCombo: (context) => getWinningLine(context.squares)
        })
    },
    guards: {
        isGameWon: context => {
            const winningLine = getWinningLine(context.squares);
            return !!winningLine;
        },
        isBoardFull: context => {
            return !context.squares.some(s => s === null);
        },
        wasXTurn: context => context.isXTurn,
        wasOTurn: context => !context.isXTurn
    }
});