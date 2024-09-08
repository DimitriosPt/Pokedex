using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;

namespace pokedex.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AllPokemonController : Controller
    {
        /// <summary>
        /// Private backer for the pokemon data source.
        /// </summary>
        private readonly IPokemonRepository _pokemonRepository;

        /// <summary>
        /// Creates a new instance of the <see cref="AllPokemonController"/>.
        /// </summary>
        /// <param name="pokemonRepository"></param>
        public AllPokemonController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var returnedPokemon = await _pokemonRepository.GetAllPokemon();

            if (returnedPokemon == null)
            {
                return NotFound("Pokemon not found");
            }

            return Ok(returnedPokemon);
        }
    }
}