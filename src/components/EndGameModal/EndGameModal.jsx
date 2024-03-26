import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useContext, useEffect, useState } from "react";
import { LeaderboardContext } from "../../context/LeaderboardContext";

export function EndGameModal({ isWon, useLeaderBoard, gameDurationMinutes, gameDurationSeconds, onClick }) {
  const [isNeedSubmitResults, setIsNeedSubmitResults] = useState(false);
  const [user, setUser] = useState();
  const [title, setTitle] = useState(isWon ? "Вы победили!" : "Вы проиграли!");
  const { leaderBoard, loadLeaders, resultIsInLeaderBoard, sendGameResult } = useContext(LeaderboardContext);

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const duration = gameDurationMinutes * 60 + gameDurationSeconds;

  useEffect(() => {
    if (isWon && useLeaderBoard) {
      loadLeaders();
    }
  }, []);

  useEffect(() => {
    if (isWon && useLeaderBoard) {
      const isInLeaderBoard = resultIsInLeaderBoard(duration);
      setIsNeedSubmitResults(isInLeaderBoard);
      setTitle("Вы попали на лидерборд!");
    }
  }, [leaderBoard]);

  const handleOnClick = async () => {
    if (isNeedSubmitResults && user) {
      await sendGameResult({
        name: user,
        time: duration,
      });
    }
    onClick();
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
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={handleOnClick}>Начать сначала</Button>
    </div>
  );
}
