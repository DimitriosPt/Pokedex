namespace pokedex.Server.Models
{
    public class Statblock
    {
        public string Name { get; set; }

        public Dictionary<string, int> Stats { get; set; } = new Dictionary<string, int>();

        /// <summary>
        /// Creates an instance of the <see cref="Statblock"/> class.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="stats"></param>
        public Statblock(string name, Dictionary<string, int> stats)
        {
            this.Name = name;
            this.Stats = stats;
        }

    }
}
