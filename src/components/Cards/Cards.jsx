import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { STATUS_IN_PROGRESS, STATUS_LOST, STATUS_PREVIEW, STATUS_WON, useGame } from "../../hooks/useGame";
import { SuperForce } from "../SuperForce/SuperForce";

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * level - уровень сложности
 * tryCount - сколько попыток
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ level = 1, tryCount = 1, previewSeconds = 5 }) {
  const game = useGame({ level, tryCount });

  const isGameEnded = game.gameStatus === STATUS_LOST || game.gameStatus === STATUS_WON;
  const elapsed = game.timer.getElapsed();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {game.gameStatus === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{elapsed.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{elapsed.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {game.gameStatus === STATUS_IN_PROGRESS && (
          <>
            <div className={styles.tries}>❤: {game.tries}</div>
            <div className={styles.superforcesComtainer}>
              {Object.keys(game.superForces).map(k => (
                <SuperForce id={k} count={game.superForces[k]} onClick={() => game.useSuperForce(k)} />
              ))}
            </div>
            <Button onClick={game.reset}>Начать заново</Button>
          </>
        )}
      </div>

      <div className={styles.cards}>
        {game.cards.map(card => (
          <Card
            key={card.id}
            onClick={() => game.pickCard(card)}
            open={game.gameStatus !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={game.gameStatus === STATUS_WON}
            useLeaderBoard={level >= 3}
            gameDurationSeconds={elapsed.seconds}
            gameDurationMinutes={elapsed.minutes}
            onClick={game.reset}
          />
        </div>
      ) : null}
    </div>
  );
}
