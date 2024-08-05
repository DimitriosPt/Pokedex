using Microsoft.VisualStudio.TestTools.UnitTesting;
using pokedex.Server.Models;

namespace PokedexTest
{
    [TestClass]
    public class PokemonModelTest
    {
        /// <summary>
        /// Tests the default constructor of the Pokemon class.
        /// </summary>
        [TestMethod]
        [TestCategory(TestList.Unit)]
        public void TestPokemon_DefaultConstructor()
        {
            // Arrange
            string pokemonName = "Pikachu";
            List<string> types = new List<string> { "Electric" };

            // Act

            var pokemon = new Pokemon(pokemonName, types);

            // Assert
            Assert.IsNotNull(pokemon);
            Assert.AreEqual(pokemonName, pokemon.Name);
            Assert.AreEqual(types, pokemon.Types);
        }

        /// <summary>
        /// Tests that <see cref="Pokemon.Pokemon(string, IList{string})"/> throws an exception when the name is null or empty.
        /// </summary>
        [TestMethod]
        [TestCategory(TestList.Unit)]
        [ExpectedException(typeof(ArgumentException))]
        public void TestPokemon_DefaultContstructor_NullOrEmptyNameThrowsException()
        {
            string pokemonName = null;
            List<string> types = new List<string> { "Electric" };

            var pokemon = new Pokemon(pokemonName, types);
        }
    }
}