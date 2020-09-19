import React from 'react';
import Square from './Square';
import useGameContext from '../Hooks/useGameContext';

export default () => {

    const {squares} = useGameContext();

    return <>
        <div className='board'>
            {squares.map((square, index) => {
                return <Square square={square} index={index} key={index} />
            })}
        </div>
    </>
}