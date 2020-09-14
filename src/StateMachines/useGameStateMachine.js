import { useMachine }  from '@xstate/react';
import gameStateMachine from './gameStateMachine';

const useGameStateMachine = () => {
    return useMachine(gameStateMachine);
}

export default useGameStateMachine;