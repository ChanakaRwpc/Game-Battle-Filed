using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleFieldBackEnd.Models
{
    public class Grid
    {
        public const int Size = 10;
        public string userType = "";
        public string[,] Cells { get; set; } = new string[Size, Size];
        public List<Ship> Ships { get; set; } = new List<Ship>();

    }
}
