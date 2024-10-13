import React, { useEffect, useState } from "react";
import "./Grid.css";

const Grid = ({ onCellClick, ships, girdId }) => {
  const getCellLabel = (row, column) => {
    const letter = String.fromCharCode(64 + row);
    return `${letter}${column}`;
  };

  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        const isHighlighted = ships?.ships
          ?.flatMap((ship) => ship.coordinates)
          .some((cell) => cell.item1 === i && cell.item2 === j);

        //   const isSunk = ships?.ships?.some((ship) => ship.isSunk && ships?.ships
        //   ?.flatMap((ship) => ship.coordinates)
        //   .some((cell) => cell.item1 === i && cell.item2 === j) );
        //   console.log(isSunk);
        const label = getCellLabel(i + 1, j);
        row.push(
          <div
            key={`${i}-${j}`}
            className={`cell ${isHighlighted ? "highlight" : ""}`}
            style={
              ships?.ships?.every((ship) => ship.isSunk)
                ? {
                    opacity: 0.5,
                    pointerEvents: "none",
                  }
                : {}
            }
            onClick={() => onCellClick(i, j, girdId, ships, label)}
          >
            {ships?.cells?.[i][j]}
            {/* {label} */}
          </div>
        );
      }
      grid.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }
    return grid;
  };

  return <div className="grid-container">{createGrid()}</div>;
};

export default Grid;
