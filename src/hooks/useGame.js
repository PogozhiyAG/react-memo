import { useEffect, useState } from "react";
import { generateDeck } from "../utils/cards";
import { SuperForces } from "./useSuperForces";
import { useTimer } from "./useTimer";

const levelPairCount = {
  1: 3,
  2: 6,
  3: 9,
};

const defaultSuperforces = {
  1: 1,
  2: 1,
};

// const STATUS_LOST = "STATUS_LOST";
// const STATUS_WON = "STATUS_WON";
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
const STATUS_PREVIEW = "STATUS_PREVIEW";

export const useGame = ({
  level = 1,
  tryCount = 1,
  previewDuration = 5,
  availableSuperForces = { ...defaultSuperforces },
}) => {
  const [cards, setCards] = useState(generateDeck(levelPairCount[level]));
  const [tries, setTries] = useState(tryCount);
  const [superForces, setSuperForces] = useState(availableSuperForces);
  const timer = useTimer({ resolution: 1000 });
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [gameStatus, setGameStatus] = useState(STATUS_PREVIEW);

  const refreshCards = () => setCards([...cards]);

  //preview => start game
  useEffect(() => {
    cards.forEach(c => (c.open = true));
    refreshCards();
    setIsReadOnly(true);

    let timeout = setTimeout(() => {
      setGameStatus(STATUS_IN_PROGRESS);
      cards.forEach(c => (c.open = false));
      refreshCards();
      setIsReadOnly(false);
      timer.start();
    }, previewDuration * 1000);

    return () => clearTimeout(timeout);
  }, []);

  //Click the card
  const pickCard = card => {
    if (isReadOnly) {
      return;
    }

    card.open = true;
    refreshCards();
  };

  //Use super force by id
  const useSuperForce = forceId => {
    if (isReadOnly) {
      return;
    }

    if (superForces[forceId] > 0) {
      setSuperForces({
        ...superForces,
        [forceId]: superForces[forceId] - 1,
      });

      SuperForces[forceId].use(gameContext);
    }
  };

  //game state
  const gameContext = {
    cards,
    setCards,

    tries,
    setTries,

    gameStatus,
    setGameStatus,

    isReadOnly,
    setIsReadOnly,

    superForces,
    setSuperForces,

    timer,

    refreshCards,
    pickCard,
    useSuperForce,
  };

  return gameContext;
};
