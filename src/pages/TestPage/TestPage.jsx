import { useGame } from "../../hooks/useGame";

export const TestPage = () => {
  const game = useGame({ level: 2 });
  //const timer = useTimer({ resolution: 1000 });

  return (
    <>
      <div>{JSON.stringify(game)}</div>

      <hr></hr>
      {game.cards.map((c, i) => (
        <div key={i} onClick={() => game.pickCard(c)}>
          {JSON.stringify(c)}
        </div>
      ))}

      <hr></hr>

      <div>{JSON.stringify(game.timer)}</div>
      <div>{JSON.stringify(game.timer.getElapsed())}</div>

      <button onClick={() => game.useSuperForce(1)}>use superForceInsight</button>
      <button onClick={() => game.useSuperForce(2)}>use superForceAlohomora</button>

      <br />
      <button onClick={() => game.timer.start()}>game.timer.start()</button>
      <button onClick={() => game.timer.stop()}>game.timer.stop()</button>
      <button onClick={() => game.timer.resume()}>game.timer.resume()</button>
      <button onClick={() => game.timer.reset()}>game.timer.reset()</button>

      <br />
      <button onClick={() => game.reset()}>game.reset()</button>
    </>
  );
};
