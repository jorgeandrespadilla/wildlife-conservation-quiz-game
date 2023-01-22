import Wildlife from "assets/wildlife.svg";
import { useGameContext } from "hooks/useGameContext";
import Life from "../Life";
import Timer from "../Timer";
import "./GameHeader.css";

function GameHeader() {
  const game = useGameContext();

  return (
    <div className="game__header">
      <div className="game__header__wrapper">
        <div className="game__title__wrapper">
          <img src={Wildlife} alt="Wildlife Conservation" className="game__logo" />
          <h1 className="game__title">Wildlife Conservation</h1>
        </div>
        <div className="game__indicators">
          <Timer timeProgress={game.time.progress} remainingTime={game.time.remaining} />
          <Life remainingLives={game.life.remaining} totalLives={game.life.total} lifeProgress={game.life.progress} />
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
