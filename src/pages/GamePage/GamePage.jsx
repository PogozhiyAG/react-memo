import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { pairsCount, tryCount } = useParams();

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} tryCount={parseInt(tryCount, 10)} previewSeconds={5}></Cards>
    </>
  );
}
