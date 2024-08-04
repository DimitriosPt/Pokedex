namespace pokedex.Server.Services.Interfaces
{
    public interface IPokemonRepository
    {
        /// <summary>
        /// Gets the Pokemon data from the API.
        /// </summary>
        /// <param name="name">The name of the pokemon to retrieve data for.</param>
        /// <returns>The pokemon if one was found, null otherwise.</returns>
        public Task<ReactApp1.Server.Pokemon> GetPokemon(string name);

        /// <summary>
        /// Gets the Pokemon data from the API.
        /// </summary>
        /// <param name="id">The ID of the pokemon to retrieve data for.</param>
        /// <returns>The pokemon if one was found, null otherwise.</returns>
        public Task<ReactApp1.Server.Pokemon> GetPokemon(int id);
    }
}
