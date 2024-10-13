using BattleFieldBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleFieldBackEnd.Services
{
    public class GameService
    {
        //private Grid _grid;

        public GameService()
        {
            //_grid = new Grid();
            //InitializeShips();
            //PlaceShipsRandomly();
        }

        private Grid InitializeShips()
        {
            Grid _grid = new Grid();
            _grid.Ships.Add(new Ship { Name = "Battleship", Size = 5, No = "B" });
            _grid.Ships.Add(new Ship { Name = "Destroyer", Size = 4 , No = "D1" });
            _grid.Ships.Add(new Ship { Name = "Destroyer", Size = 4 , No = "D2" });
            return _grid;
        }

        private void PlaceShipsRandomly(Grid _grid)
        {
            var random = new Random();
            foreach (var ship in _grid.Ships)
            {
                bool placed = false;
                while (!placed)
                {
                    int row = random.Next(Grid.Size);
                    int col = random.Next(Grid.Size);
                    bool horizontal = random.Next(2) == 0;

                    if (CanPlaceShip(row, col, ship.Size, horizontal, _grid))
                    {
                        for (int i = 0; i < ship.Size; i++)
                        {
                            int r = row + (horizontal ? 0 : i);
                            int c = col + (horizontal ? i : 0);
                            _grid.Cells[r, c] = ship.No.ToString();
                            ship.Coordinates.Add((r, c));
                        }
                        placed = true;
                    }
                }
            }
        }

        private bool CanPlaceShip(int row, int col, int size, bool horizontal,Grid _grid)
        {
            for (int i = 0; i < size; i++)
            {
                int r = row + (horizontal ? 0 : i);
                int c = col + (horizontal ? i : 0);
                if (r >= Grid.Size || c >= Grid.Size || _grid.Cells[r, c] != null)
                    return false;
            }
            return true;
        }

        public Grid FireShot(int row, int col,Grid gridData, string input)
        {
            int rowValue = input == "X" ? row : input[0] - 'A';
            int colValue = input == "X" ? col :  int.Parse(input[1].ToString());


            if (gridData.Cells[rowValue, colValue] == null || gridData.Cells[rowValue, colValue] == "Miss") {
                gridData.Cells[rowValue, colValue] = "Miss";
                return gridData;
            }

            var ship = gridData.Ships.FirstOrDefault(s => s.No.ToString() == gridData.Cells[rowValue, colValue]);
            if (ship != null) {
                ship.Coordinates.Remove((rowValue, colValue));
                gridData.Cells[rowValue, colValue] = "Hit";
            }
                return gridData;


        }

        public Grid GetGrid() => null;

        public List<Grid> ListGetGrid() {

            List<Grid> initData = new List<Grid>();

            Grid grid1 = InitializeShips();
            grid1.userType = "U";
            PlaceShipsRandomly(grid1);
            initData.Add(grid1);


            Grid grid2 = InitializeShips();
            grid2.userType = "M";
            PlaceShipsRandomly(grid2);
            initData.Add(grid2);
            return initData;
        }
    }
}
