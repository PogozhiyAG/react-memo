import { useEffect, useState } from "react";
import { generateDeck } from "../utils/cards";
import { SuperForces } from "./useSuperForces";
import { useStopwatch } from "./useStopwatch";
import { shuffle } from "lodash";

const levelPairCount = {
  1: 3,
  2: 6,
  3: 9,
};

const defaultSuperforces = {
  1: 1,
  2: 1,
};

export const STATUS_LOST = "STATUS_LOST";
export const STATUS_WON = "STATUS_WON";
export const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
export const STATUS_PREVIEW = "STATUS_PREVIEW";

export const EVENT_TYPE_USE_SUPERFORCE = "USE_SUPERFORCE";
export const EVENT_TYPE_USE_LIFE = "USE_LIFE";

export const useGame = ({
  level = 1,
  tryCount = 1,
  previewDuration = 5,
  availableSuperForces = { ...defaultSuperforces },
}) => {
  const [cards, setCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [superForces, setSuperForces] = useState({});
  const timer = useStopwatch({ resolution: 300 });
  const [isReadOnly, setIsReadOnly] = useState();
  const [gameStatus, setGameStatus] = useState();
  const [gameLog, setGameLog] = useState([]);

  const [resetFlag, setResetFlag] = useState();
  const [startFlag, setStartFlag] = useState();

  const reset = () => setResetFlag(new Date());

  const refreshCards = () => setCards([...cards]);

  useEffect(() => {
    setGameStatus(STATUS_PREVIEW);
    const deck = shuffle(generateDeck(levelPairCount[level]).map(c => ({ ...c, open: true })));
    setCards(deck);
    setTries(tryCount);
    setSuperForces({ ...availableSuperForces });
    setIsReadOnly(true);
    setGameLog([]);
    timer.reset();
    setStartFlag(new Date());
  }, [resetFlag]);

  useEffect(() => {
    if (!startFlag) {
      return;
    }

    let timeout = setTimeout(() => {
      setGameStatus(STATUS_IN_PROGRESS);
      cards.forEach(c => (c.open = false));
      refreshCards();
      setIsReadOnly(false);
      timer.start();
    }, previewDuration * 1000);

    return () => clearTimeout(timeout);
  }, [startFlag]);

  const Won = () => {
    timer.stop();
    setGameStatus(STATUS_WON);
  };

  const Lost = () => {
    timer.stop();
    setGameStatus(STATUS_LOST);
  };

  const logEvent = (eventType, data) =>
    setGameLog([
      ...gameLog,
      {
        time: new Date(),
        eventType,
        data,
      },
    ]);

  const pickCard = card => {
    if (isReadOnly || card.open || gameStatus !== STATUS_IN_PROGRESS) {
      return;
    }

    const openTheCard = () => {
      card.open = true;
      refreshCards();
    };

    const openCards = cards.filter(card => card.open).concat(card);
    if (openCards.length === cards.length) {
      openTheCard();
      Won();
      return;
    }

    const groups = openCards.reduce((count, card) => {
      const key = `${card.suit}_${card.rank}`;
      count[key] = (count[key] || 0) + 1;
      return count;
    }, {});

    const cardsWithotPair = Object.values(groups).filter(count => count === 1).length;
    if (cardsWithotPair >= 2) {
      if (tries > 1) {
        setTries(tries - 1);
        logEvent(EVENT_TYPE_USE_LIFE);
        return;
      }
      Lost();
    }

    openTheCard();
  };

  const useSuperForce = forceId => {
    if (isReadOnly) {
      return;
    }

    if (superForces[forceId] > 0) {
      setSuperForces({
        ...superForces,
        [forceId]: superForces[forceId] - 1,
      });

      logEvent(EVENT_TYPE_USE_SUPERFORCE, forceId);

      SuperForces[forceId].use(gameContext);
    }
  };

  //game state
  const gameContext = {
    level,

    cards,
    setCards,

    tries,
    setTries,
    tryCount,

    gameStatus,
    setGameStatus,

    isReadOnly,
    setIsReadOnly,

    superForces,
    setSuperForces,

    timer,

    gameLog,

    Won,
    Lost,

    refreshCards,
    pickCard,
    useSuperForce,
    reset,
  };

  return gameContext;
};
