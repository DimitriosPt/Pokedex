using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;

namespace pokedex.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TypesController : Controller
    {
        /// <summary>
        /// Private backer for the pokemon data source.
        /// </summary>
        private readonly IPokemonRepository _pokemonRepository;

        public TypesController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (id < 0 || id > 20)
            {

               return BadRequest("Invalid type ID");
            }

            var typeRelations = await _pokemonRepository.GetTypeRelations(id);

            if (typeRelations == null)
            {
                return NotFound("Pokemon not found");
            }

            return Ok(typeRelations);
        }
    }
}
