const API_URL = {
  leaderboard: "https://wedev-api.sky.pro/api/v2/leaderboard",
};

export const getLeaderBoard = () =>
  fetch(API_URL.leaderboard, {
    method: "GET",
  }).then(r => r.json());

export const postLeaderBoard = ({ name, time, achievements }) => {
  return fetch(API_URL.leaderboard, {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
      achievements,
    }),
  }).then(r => r.json());
};
