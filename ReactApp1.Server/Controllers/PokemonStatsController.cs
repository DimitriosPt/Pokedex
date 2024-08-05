using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PokemonStatsController : Controller
    {
        private IPokemonRepository _pokemonRepository;

        public PokemonStatsController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var returnedPokemon = await _pokemonRepository.GetPokemonStats(name);

            if (returnedPokemon == null)
            {
                return NotFound("Pokemon not found");
            }

            return Ok(returnedPokemon);

        }
    }
}
