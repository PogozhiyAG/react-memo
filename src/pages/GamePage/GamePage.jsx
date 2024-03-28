import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { level, tryCount } = useParams();

  return (
    <>
      <Cards level={parseInt(level, 10)} tryCount={parseInt(tryCount, 10)} previewSeconds={5}></Cards>
    </>
  );
}
