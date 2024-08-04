using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using pokedex.Server.Services.Interfaces;
using System.Net;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FindPokemonController : ControllerBase
    {
        /// <summary>
        /// Private backer for the pokemon data source.
        /// </summary>
        private readonly IPokemonRepository _pokemonRepository;

        public FindPokemonController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var returnedPokemon = await _pokemonRepository.GetPokemon(name);

            if (returnedPokemon == null)
            {
                return NotFound("Pokemon not found");
            }

            return Ok(returnedPokemon);

        }
    }
}
