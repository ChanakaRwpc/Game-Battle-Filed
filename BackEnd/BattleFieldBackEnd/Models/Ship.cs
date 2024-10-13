using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleFieldBackEnd.Models
{
    public class Ship
    {
        public string No { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }
        public List<(int Row, int Col)> Coordinates { get; set; } = new List<(int, int)>();
        public bool IsSunk => Coordinates.All(c => c == (-1, -1));
        public HashSet<(int, int)> Hits { get; set; } = new HashSet<(int, int)>();
    }
}
