import { useContext } from 'react';
import { GameContext } from 'context/GameProvider';

export const useGameContext = () => {
    const gameContext = useContext(GameContext);
    return gameContext;
};
