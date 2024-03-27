import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage";
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage";
import { TestPage } from "./pages/TestPage/TestPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SelectLevelPage />,
    },
    {
      path: "/game/:pairsCount/:tryCount",
      element: <GamePage />,
    },
    {
      path: "/leaderboard",
      element: <LeaderboardPage />,
    },
    {
      path: "/test",
      element: <TestPage />,
    },
  ],
  /**
   * basename нужен для корректной работы в gh pages
   * он же указан в homepage package.json и в index.html
   */
  { basename: "/react-memo" },
);
