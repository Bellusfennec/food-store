import useMockData from "../../utils/mockData";

const MockDataAdmin = () => {
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
      <button className="btn btn-primary" onClick={handlerClick}>
        инициализировать
      </button>
    </>
  );
};

export default MockDataAdmin;
