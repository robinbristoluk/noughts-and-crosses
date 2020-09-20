import React from 'react';
import Square from './Square';
import useGameContext from '../Hooks/useGameContext';
import classNames from 'classnames';

export default () => {

    const {squares, isGameOver} = useGameContext();

    const boardClasses = classNames('board', { 'board--game-over': isGameOver });

    return (
        <div className={boardClasses}>
            {squares.map((square, index) => {
                return <Square square={square} index={index} key={index} />
            })}
        </div>
    );
}