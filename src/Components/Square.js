import React from 'react';
import classnames from 'classnames';
import useGameContext from '../Contexts/useGameContext';

export default ({square, index}) => {

    const {markSquare, isPlaying, isSquareEmpty, isGameWon, isWinningSquare} = useGameContext();

    const handleClick = () => {
        if (isPlaying && isSquareEmpty(index)) {
            markSquare(index);
        }
    };

    const classes = classnames('square', { 'square--winning': isGameWon && isWinningSquare(index) });

    return <div className={classes} onClick={handleClick}>
        {square}
    </div>
};