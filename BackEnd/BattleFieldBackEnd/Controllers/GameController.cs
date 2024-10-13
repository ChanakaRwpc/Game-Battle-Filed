using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleFieldBackEnd.Models;
using BattleFieldBackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleFieldBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService = new GameService();

        [HttpGet("start")]
        public IActionResult StartGame()
        {
            return Ok(_gameService.GetGrid());
        }

        [HttpGet("initdata")]
        public IActionResult InitData()
        {
            return Ok(_gameService.ListGetGrid());
        }

        [HttpPost("fire")]
        public IActionResult Fire([FromQuery] int row, [FromQuery] int col, [FromBody] Grid gridData, [FromQuery]string input)
        {
            var result = _gameService.FireShot(row,  col ,gridData, input);
            return Ok(result);
        }
    }
}