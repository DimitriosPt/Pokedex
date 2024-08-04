using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FindPokemonController : ControllerBase
    {
        private string endpoint = "https://pokeapi.co/api/v2/pokemon/";

        [HttpGet("{name}")]
        public async Task<IActionResult> Get(string name)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + name);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return NotFound("Pokemon not found");
                }

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Error retrieving Pokemon");
                }

                var json = await response.Content.ReadAsStringAsync();

                List<string> types = JObject.Parse(json)?["types"]?.Select(t => t["type"]?["name"]?.ToString() ?? string.Empty).ToList() ?? new List<string>();

                // TODO: Implement logic to deserialize and process the Pokemon data from the JSON response

                Pokemon pokemonData = new Pokemon($"{name}", types);

                // Return the processed Pokemon data
                return Ok(pokemonData);
            }
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(endpoint + "beldum");

                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return NotFound("Pokemon not found");
                }

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Error retrieving Pokemon");
                }

                var json = await response.Content.ReadAsStringAsync();

                var types = JObject.Parse(json)["types"]?.Select(t => t["type"]?["name"]?.ToString()).ToList();

                // TODO: Implement logic to deserialize and process the Pokemon data from the JSON response

                Pokemon pokemonData = new Pokemon($"beldum", types);

                // Return the processed Pokemon data
                return Ok(pokemonData);
            }
        }
    }
}
