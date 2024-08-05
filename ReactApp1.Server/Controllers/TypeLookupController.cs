using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;

namespace pokedex.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TypeLookupController : Controller
    {
        /// <summary>
        /// Private backer for the pokemon data source.
        /// </summary>
        private readonly IPokemonRepository _pokemonRepository;

        public TypeLookupController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        /// <summary>
        /// Gets the type relations for a given human readable type name.
        /// </summary>
        /// <param name="typeName">The human readable name of the type.</param>
        /// <returns></returns>
        [HttpGet("{typeName}")]
        public async Task<IActionResult> Get(string typeName)
        {
            var returnedID = await _pokemonRepository.GetTypeID(typeName);


            if (returnedID == -1)
            {
                return NotFound("Pokemon not found");
            }

            var returnedTypeRelations = await _pokemonRepository.GetTypeRelations(returnedID);


            return Ok(returnedTypeRelations);

        }
    }
}
