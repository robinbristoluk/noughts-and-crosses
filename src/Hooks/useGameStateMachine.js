import { useMachine }  from '@xstate/react';
import gameStateMachine from '../StateMachines/gameStateMachine';

const useGameStateMachine = () => {
    return useMachine(gameStateMachine);
}

export default useGameStateMachine;