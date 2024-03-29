import { EVENT_TYPE_USE_SUPERFORCE } from "./useGame";

const Achievements = {
  1: {
    name: "На сложном уровне",
    activeImageUrl: "./images/hardLevel_active.svg",
    inactiveImageUrl: "./images/hardLevel_inactive.svg",
    evaluate: game => game.tryCount === 1,
  },
  2: {
    name: "Без использования суперсил",
    activeImageUrl: "./images/magicBall_active.svg",
    inactiveImageUrl: "./images/magicBall_inactive.svg",
    evaluate: game => game.gameLog.current.findIndex(l => l.eventType === EVENT_TYPE_USE_SUPERFORCE) === -1,
  },
};

export const useAchievements = () => Achievements;
