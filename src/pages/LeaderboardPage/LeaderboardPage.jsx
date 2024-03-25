import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderboardPage.module.css";
import { LeaderboardContext } from "../../context/LeaderboardContext";
import React, { useContext, useEffect } from "react";

export const LeaderboardPage = () => {
  const { leaderBoard, loadLeaders } = useContext(LeaderboardContext);

  const navigateTo = useNavigate();

  useEffect(() => {
    loadLeaders();
  }, []);

  const formatTime = duration => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.heading}>Лидерборд</div>
          <div>
            <Button onClick={() => navigateTo("/")}>Начать игру</Button>
          </div>
        </div>
        <div className={styles.tableContent}>
          <div className={styles.tableCell}>
            <span className={styles.columnHeading}>Позиция</span>
          </div>
          <div className={styles.tableCell}>
            <span className={styles.columnHeading}>Пользователь</span>
          </div>
          <div className={styles.tableCell}>
            <span className={styles.columnHeading}>Время</span>
          </div>

          {leaderBoard.map((r, i) => (
            <React.Fragment key={i}>
              <div className={styles.tableCell}># {i + 1}</div>
              <div className={styles.tableCell}>{r.name}</div>
              <div className={styles.tableCell}>{formatTime(r.time)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
