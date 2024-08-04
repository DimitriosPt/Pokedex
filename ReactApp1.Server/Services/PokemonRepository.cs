using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using pokedex.Server.Services.Interfaces;
using ReactApp1.Server;
using System.Net;

namespace pokedex.Server.Services
{
    public class PokemonRepository : IPokemonRepository
    {
        private string endpoint = "https://pokeapi.co/api/v2/pokemon/";

        public async Task<Pokemon> GetPokemon(string name)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + name);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return null;
                }

                var json = await response.Content.ReadAsStringAsync();

                List<string> types = JObject.Parse(json)?["types"]?.Select(t => t["type"]?["name"]?.ToString() ?? string.Empty).ToList() ?? new List<string>();

                // TODO: Implement logic to deserialize and process the Pokemon data from the JSON response

                Pokemon pokemonData = new Pokemon($"{name}", types);

                // Return the processed Pokemon data
                return pokemonData;
            }
        }

        public Task<Pokemon> GetPokemon(int id)
        {
            throw new NotImplementedException();
        }
    }
}
