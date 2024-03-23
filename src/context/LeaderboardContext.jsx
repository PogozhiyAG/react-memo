import { createContext, useState } from "react";
import { getLeaderBoard, postLeaderBoard } from "../api";

export const LeaderboardContext = createContext({});

export const LeaderboardContextProvider = ({ children }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  const getOrderedLeadersFromApiResponse = response => response.leaders.sort((a, b) => a.time - b.time).slice(0, 10);

  const loadLeaders = async () => {
    const leaderBoardResponse = await getLeaderBoard();
    setLeaderBoard(getOrderedLeadersFromApiResponse(leaderBoardResponse));
  };

  const sendGameResult = async ({ name, time }) => {
    const leaderBoardResponse = await postLeaderBoard({ name, time });
    setLeaderBoard(getOrderedLeadersFromApiResponse(leaderBoardResponse));
  };

  const resultIsInLeaderBoard = duration => {
    if (leaderBoard.length === 0) {
      return true;
    }

    return duration < leaderBoard[leaderBoard.length - 1].time;
  };

  const value = {
    leaderBoard,
    loadLeaders,
    resultIsInLeaderBoard,
    sendGameResult,
  };

  return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>;
};
