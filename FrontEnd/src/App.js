import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./Grid";
import { useDispatch, useSelector } from "react-redux";
import { InitData, Fire, StartGame } from "./GameSlices";

const App = () => {
  const dispatch = useDispatch();
  const [myGrid, setMyGrid] = useState([]);
  const [opponentGrid, setOpponentGrid] = useState([]);
  const { data, firedata } = useSelector((state) => state.GameSlices);

  useEffect(() => {
    dispatch(InitData());
  }, []);

  useEffect(() => {
    if (firedata?.userType === "U") {
      setMyGrid(firedata);
    } else {
      setOpponentGrid(firedata);
    }
  }, [firedata]);

  const handleCellClick = (row, col, girdId, ships, label) => {
    if (ships?.userType === "M") {
      const initialValues = {
        row: row,
        col: col,
        girdId: girdId,
        ships: ships,
        input: label,
      };

      dispatch(Fire(initialValues));

      setTimeout(() => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const initialValues = {
          row: row,
          col: col,
          girdId: "",
          ships: myGrid.cells?.length > 0 ? myGrid : data?.[0],
          input: "X",
        };
        dispatch(Fire(initialValues));
      }, 1000);
    }
  };

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <div style={{ display: "flex", gap: "10%", justifyContent: "center" }}>
        <div>
          <h2>Your Grid</h2>
          {myGrid?.ships?.every((ship) => ship.isSunk) && "Opponent Won"}
          <Grid
            onCellClick={handleCellClick}
            ships={myGrid.cells?.length > 0 ? myGrid : data?.[0]}
            girdId={"U"}
          />
        </div>
        <div>
          <h2>Opponent Grid</h2>
          {opponentGrid?.ships?.every((ship) => ship.isSunk) && "You Won"}
          <Grid
            onCellClick={handleCellClick}
            ships={opponentGrid.cells?.length > 0 ? opponentGrid : data?.[1]}
            girdId={"M"}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
