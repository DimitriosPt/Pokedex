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

        /// <summary>
        /// Gets the <see cref="TypeRelationTable"/> for a given type.
        /// </summary>
        /// <param name="id">The id of the type.</param>
        /// <returns></returns>
        public Task<TypeRelationTable> GetTypeRelations(int id);

        /// <summary>
        /// Gets the ID for a given type.
        /// </summary>
        /// <param name="id">The human readable name like "fire" or "normal"</param>
        /// <returns>The numeric key that aligns with the element.</returns>
        public Task<int> GetTypeID(string typeName);

        /// <summary>
        /// Gets all the pokemon from the API.
        /// </summary>
        /// <returns>An IList of pokemon.</returns>
        public Task<IList<Pokemon>> GetAllPokemon();
    }
}
