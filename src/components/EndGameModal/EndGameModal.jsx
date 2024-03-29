import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useContext, useEffect, useState } from "react";
import { LeaderboardContext } from "../../context/LeaderboardContext";
import { STATUS_WON } from "../../hooks/useGame";
import { Achievement } from "../Achievement/Achievement";
import { useAchievements } from "../../hooks/useAchievements";

export function EndGameModal({ game }) {
  const isWon = game.gameStatus === STATUS_WON;
  const useLeaderBoard = game.level >= 3;
  const elapsed = game.timer.getElapsed();
  const achievements = useAchievements();
  const achievementIds = isWon
    ? Object.keys(achievements)
        .filter(k => achievements[k].evaluate(game))
        .map(k => Number(k))
    : [];

  const [isNeedSubmitResults, setIsNeedSubmitResults] = useState(false);
  const [user, setUser] = useState();
  const [title, setTitle] = useState(isWon ? "Вы победили!" : "Вы проиграли!");
  const { leaderBoard, loadLeaders, resultIsInLeaderBoard, sendGameResult } = useContext(LeaderboardContext);

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  useEffect(() => {
    if (isWon && useLeaderBoard) {
      loadLeaders();
    }
  }, []);

  useEffect(() => {
    if (isWon && useLeaderBoard) {
      const isInLeaderBoard = resultIsInLeaderBoard(elapsed.totalSeconds);
      setIsNeedSubmitResults(isInLeaderBoard);
      setTitle("Вы попали на лидерборд!");
    }
  }, [leaderBoard]);

  const handleOnClick = async () => {
    if (isNeedSubmitResults && user) {
      await sendGameResult({
        name: user,
        time: elapsed.totalSeconds,
        acheivements: achievementIds,
      });
    }
    game.reset();
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isNeedSubmitResults && (
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholder="Пользователь"
          className={styles.inputText}
        ></input>
      )}

      <p className={styles.description}>Затраченное время:</p>

      <div className={styles.time}>
        {elapsed.minutes.toString().padStart("2", "0")}.{elapsed.seconds.toString().padStart("2", "0")}
      </div>

      <div className={styles.achievementContainer}>
        {achievementIds.map(aid => (
          <Achievement key={aid} id={aid} active />
        ))}
      </div>

      <Button onClick={handleOnClick}>Начать сначала</Button>
    </div>
  );
}
