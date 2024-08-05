using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;
using System.Net;
using System.Xml.Linq;
using pokedex.Server.Models;

namespace pokedex.Server.Services
{
    /// <summary>
    /// Class that handles the retrieval of Pokemon data from the API.
    /// </summary>
    public class PokemonRepository : IPokemonRepository
    {
        private string endpoint = "https://pokeapi.co/api/v2/pokemon/";

        /// <summary>
        /// Attempts to retrieve Pokemon data from the API using the provided name.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<Pokemon> GetPokemon(string name)
        {
            string pokemonName = name.ToLower();
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + pokemonName);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return null;
                }

                var json = await response.Content.ReadAsStringAsync();

                var parsedJson = JObject.Parse(json);

                List<string> types = parsedJson?["types"]?.Select(t => t["type"]?["name"]?.ToString() ?? string.Empty).ToList() ?? new List<string>();

                var spriteUrl = parsedJson?["sprites"]?["front_default"]?.ToString() ?? string.Empty;

                // TODO: Implement logic to deserialize and process the Pokemon data from the JSON response

                Pokemon pokemonData = new Pokemon($"{pokemonName}", types) { SpriteURL = spriteUrl };

                // Return the processed Pokemon data
                return pokemonData;
            }
        }

        /// <summary>
        /// Attempts to retrieve a pokemon from the API using the provided ID.
        /// </summary>
        /// <param name="id">The ID number of the pokemon</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Pokemon> GetPokemon(int id)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + id);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return null;
                }

                var json = await response.Content.ReadAsStringAsync();

                var parsedJson = JObject.Parse(json);

                string name = parsedJson?["name"]?.ToString() ?? string.Empty;

                List<string> types = parsedJson?["types"]?.Select(t => t["type"]?["name"]?.ToString() ?? string.Empty).ToList() ?? new List<string>();

                // TODO: Implement logic to deserialize and process the Pokemon data from the JSON response

                Pokemon pokemonData = new Pokemon($"{name}", types);

                // Return the processed Pokemon data
                return pokemonData;
            }
        }

        /// <summary>
        /// Gets a pokemons statblock.
        /// </summary>
        /// <param name="name">The name of the pokemon.</param>
        /// <returns>A dictionary where the key is a stat and the value is the value.</returns>
        public async Task<Statblock> GetPokemonStats(string name)
        {
            string pokemonName = name.ToLower();

            Dictionary<string, int> stats = new Dictionary<string, int>();

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + pokemonName);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return null;
                }

                var json = await response.Content.ReadAsStringAsync();

                var parsedJson = JObject.Parse(json);

                var statsArray = parsedJson?["stats"]?.ToArray() ?? new JToken[0];

                for (int i = 0; i < statsArray.Length; i++)
                {
                    var stat = statsArray[i];
                    var statName = stat["stat"]?["name"]?.ToString() ?? string.Empty;
                    var statValue = stat["base_stat"]?.ToObject<int>() ?? 0;

                    stats.Add(statName, statValue);
                }

                // Return the processed Pokemon data
                return new Statblock(name, stats);
            }

        }
    }
}
