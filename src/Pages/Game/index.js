import { useEffect } from "react";
import GameHeader from "./components/GameHeader";
import GameQuestion from "./components/GameQuestion";
import WelcomeModal from "./components/WelcomeModal";
import EndModal from "./components/EndModal";
import { useGameContext } from "hooks/useGameContext";
import { useModal } from "hooks/useModal";
import "./Game.css";

function Game() {
  const game = useGameContext();
  const welcomeModal = useModal(true);
  const endModal = useModal(false);

  // Stop the timer on game start.
  useEffect(() => {
    if (!game.hasStarted) {
      game.time.pause();
    }
  }, [game.hasStarted, game.time]);
    
  const startGame = () => {
    welcomeModal.close();
    game.start();
  }

  const restart = () => {
    endModal.close();
    game.restart();
    welcomeModal.open();
  }

  useEffect(() => {
    if (game.hasEnded) {
      endModal.open();
      game.time.pause();
    }
  }, [game.hasEnded, endModal, game.time]);

  return (
    <>
      <div className="game">
        <GameHeader />
        <div className="game__content">
          <div className="game__content-wrapper">
            <GameQuestion />
          </div>
        </div>
      </div>
      <WelcomeModal isOpen={welcomeModal.isOpen} onClose={startGame} />
      <EndModal isOpen={endModal.isOpen} onClose={restart} hasWon={game.player.hasWon} />
    </>
  );
}

export default Game;
