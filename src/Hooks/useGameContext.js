import {useContext} from 'react';
import {gameContext} from '../Contexts/GameContext';

export default () => {
    return useContext(gameContext);
};