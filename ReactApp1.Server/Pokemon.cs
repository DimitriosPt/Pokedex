namespace ReactApp1.Server
{
    public class Pokemon
    {
        /// <summary>
        /// Gets the pokemon's name.
        /// </summary>
        public string Name { get; set; }

        public IList<string> Types { get; set; } = new List<string>();

        /// <summary>
        /// Creates a new instance of the <see cref="Pokemon"/> class.
        /// </summary>
        /// <param name="name"></param>
        public Pokemon(string name, IList<string> types)
        {
            Name = name;
            Types = types;
        }

    }
}
