
namespace PokedexTest
{
    using Microsoft.AspNetCore.Mvc;
    using Moq;
    using pokedex.Server.Controllers;
    using pokedex.Server.Models;
    using pokedex.Server.Services;
    using pokedex.Server.Services.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    [TestClass]
    public class AllPokemonTests
    {
        private static Mock<IPokemonRepository> _mockPokemonRepository;

        [ClassInitialize]
        public static void ClassInitialize(TestContext context)
        {
            _mockPokemonRepository = new Mock<IPokemonRepository>();
            _mockPokemonRepository.Setup(mockPokemonRepository => mockPokemonRepository.GetPokemon(It.IsAny<string>())).ReturnsAsync(new Pokemon("Pikachu", new List<string> { "Electric" }));
            _mockPokemonRepository.Setup(
                _mockPokemonRepository => _mockPokemonRepository.GetAllPokemon())
                .ReturnsAsync(
                new List<Pokemon>
                {
                    new Pokemon("Pikachu", new List<string> { "Electric" }),
                    new Pokemon("Charmander", new List<string> { "Fire" }),
                });
        }

        [TestMethod]
        [TestCategory(TestList.Unit)]
        public void FetchAllPokemonTest()
        {
               // Arrange
            var allPokemonController = new AllPokemonController(_mockPokemonRepository.Object);

            // Act
            var result = allPokemonController.Get().Result as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(2, (result.Value as List<Pokemon>).Count);
        }

        [TestMethod]
        [TestCategory(TestList.EndToEnd)]
        public void FetchAllPokemonTest_LiveTest()
        {
            var pokemonRepository = new PokemonRepository();

            // Arrange
            var allPokemonController = new AllPokemonController(pokemonRepository);

            var timer = Stopwatch.StartNew();
            // Act
            var result = allPokemonController.Get().Result as OkObjectResult;

            timer.Stop();
            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(1000, (result.Value as List<Pokemon>).Count);
        }
    }
}
