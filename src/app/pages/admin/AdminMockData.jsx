import { Button } from "../../common/components/form";
import useMockData from "../../utils/mockData";

const AdminMockData = () => {
  const { initialize, progress, status, error } = useMockData();
  const handlerClick = () => {
    initialize();
  };
  return (
    <>
      <h3>Инициализация данных</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress} %</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <br />
      <Button className="btn btn-primary" onClick={handlerClick}>
        инициализировать
      </Button>
    </>
  );
};

export default AdminMockData;
