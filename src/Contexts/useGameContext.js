import {useContext} from 'react';
import {gameContext} from './GameContext';

export default () => {
    return useContext(gameContext);
};