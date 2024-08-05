using pokedex.Server.Models;

namespace pokedex.Server.Services.Interfaces
{
    public interface IPokemonRepository
    {
        /// <summary>
        /// Gets the Pokemon data from the API.
        /// </summary>
        /// <param name="name">The name of the pokemon to retrieve data for.</param>
        /// <returns>The pokemon if one was found, null otherwise.</returns>
        public Task<Pokemon> GetPokemon(string name);

        /// <summary>
        /// Gets the Pokemon stats from the API.
        /// </summary>
        /// <param name="name">The name of the pokemon.</param>
        /// <returns>The stats in a named dictionary.</returns>
        public Task<Statblock> GetPokemonStats(string name);

        /// <summary>
        /// Gets the Pokemon data from the API.
        /// </summary>
        /// <param name="id">The ID of the pokemon to retrieve data for.</param>
        /// <returns>The pokemon if one was found, null otherwise.</returns>
        public Task<Pokemon> GetPokemon(int id);
    }
}
