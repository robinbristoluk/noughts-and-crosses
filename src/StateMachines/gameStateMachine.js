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
                    target: 'checking_board',
                    actions: 'update_game'
                }
            }
        },
        checking_board: {
            always: [
                {
                    target: '#GS.game_over.won',
                    cond: 'is_game_won',
                    actions: 'set_winning_combo'
                },
                {
                    target: '#GS.game_over.drawn',
                    cond: 'is_board_full'
                },
                { 
                    target: '#GS.playing',
                    actions: 'update_whose_turn'
                }
            ]
        },
        game_over: {
            states: {
                won: {},
                drawn: {}
            },
            on: {
                PLAY_AGAIN: [
                    {  
                        target: '#GS.playing',
                        actions: 'reset_game'
                    }
                ]
            }
        },
    }
},
{
    actions: {
        update_game: assign({
            squares: ({squares, isXTurn}, event) => squares.map((sq, index) => {
                return index === event.square ?
                    (isXTurn ? 'X' : 'O') :
                    sq;
            })
        }),
        update_whose_turn: assign({
            isXTurn: context => !context.isXTurn
        }),
        reset_game: assign({
            squares: Array(9).fill(null),
            xStartedLast: context => !context.xStartedLast,
            isXTurn: context => !context.xStartedLast,
            winningCombo: null
        }),
        set_winning_combo: assign({
            winningCombo: (context) => getWinningLine(context.squares)
        })
    },
    guards: {
        is_game_won: context => {
            const winningLine = getWinningLine(context.squares);
            return !!winningLine;
        },
        is_board_full: context => {
            return !context.squares.some(s => s === null);
        },
        was_x_turn: context => context.isXTurn,
        was_o_turn: context => !context.isXTurn,
        x_started_last_game: context => context.xStartedLast,
        o_started_last_game: context => !context.xStartedLast
    }
});