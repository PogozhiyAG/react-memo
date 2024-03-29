import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  const [mode, setMode] = useState(false);
  const navigateTo = useNavigate();

  const tryCount = mode ? 3 : 1;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/1/${tryCount}`}>
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/2/${tryCount}`}>
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/3/${tryCount}`}>
              3
            </Link>
          </li>
        </ul>
        <div>
          <input
            id="cb-mode"
            type="checkbox"
            value={mode}
            className={styles.checkbox}
            onChange={e => setMode(e.target.checked)}
          />
          <label htmlFor="cb-mode" className={styles.checkboxLabel}>
            Легкий режим (3 жизни)
          </label>
        </div>
        <div className={styles.contentRow}>
          <Button onClick={() => navigateTo(`/game/1/${tryCount}`)}>Играть</Button>
        </div>
        <div className={styles.contentRow}>
          <Link to="/leaderboard" className={styles.link}>
            Перейти к лидерборду
          </Link>
        </div>
      </div>
    </div>
  );
}
