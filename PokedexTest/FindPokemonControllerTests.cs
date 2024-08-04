using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using pokedex.Server.Services.Interfaces;
using ReactApp1.Server;
using ReactApp1.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PokedexTest
{
    [TestClass]
    public class FindPokemonControllerTests
    {
        private static Mock<IPokemonRepository> _mockPokemonRepository;

        [ClassInitialize]
        public static void ClassInitialize(TestContext context)
        {
            _mockPokemonRepository = new Mock<IPokemonRepository>();
            _mockPokemonRepository.Setup(mockPokemonRepository => mockPokemonRepository.GetPokemon(It.IsAny<string>())).ReturnsAsync(new Pokemon("Pikachu", new List<string> { "Electric" }));
        }

        /// <summary>
        /// Tests the <see cref="FindPokemonController.Get(string)"/> method.
        /// </summary>
        [TestMethod]
        [TestCategory(TestList.Unit)]
        public void TestFindPokemonController_GetPokemonByName()
        {
            var findPokemonController = new FindPokemonController(_mockPokemonRepository.Object);

            var result = findPokemonController.Get("Pikachu").Result as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Pikachu", (result.Value as Pokemon).Name);

            Assert.AreEqual("Electric", (result.Value as Pokemon).Types.Single());
        }
    }
}
