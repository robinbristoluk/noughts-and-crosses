import React from 'react';
import classnames from 'classnames';
import useGameContext from '../Hooks/useGameContext';

export default ({square, index}) => {

    const {markSquare, isPlaying, isSquareEmpty, isGameWon, isWinningSquare} = useGameContext();

    const handleClick = () => {
        if (isPlaying && isSquareEmpty(index)) {
            markSquare(index);
        }
    };

    const classes = classnames('square', { 'square--winning': isGameWon && isWinningSquare(index), 'square--x': square === 'X', 'square--o': square === 'O'  });

    return <div className={classes} onClick={handleClick}>
        <span>{square}</span>
    </div>
};