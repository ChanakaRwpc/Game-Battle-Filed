import axios from "axios";

const Start = async () => {
  const response = await axios.get("http://localhost:2194/api/game/start");
  return response.data;
};

const Initdata = async () => {
  const response = await axios.get(`http://localhost:2194/api/game/initdata`);
  return response.data;
};
const Fire = async (row, col, girdId, ships,input) => {
  const response = await axios.post(
    `http://localhost:2194/api/game/fire?row=${row}&col=${col}&input=${input}`,
    ships
  );
  return response.data;
};

const GameService = {
  Start,
  Initdata,
  Fire,
};

export default GameService;
