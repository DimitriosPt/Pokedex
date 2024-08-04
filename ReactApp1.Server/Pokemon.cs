namespace ReactApp1.Server
{
    public class Pokemon
    {
        /// <summary>
        /// Gets the pokemon's name.
        /// </summary>
        public string Name { get; set; }

        public IList<string> Types { get; set; } = new List<string>();

        public string SpriteURL { get; set; }

        /// <summary>
        /// Creates a new instance of the <see cref="Pokemon"/> class.
        /// </summary>
        /// <param name="name"></param>
        public Pokemon(string name, IList<string> types)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Name cannot be null or empty.", nameof(name));
            }

            if (types == null || !types.Any())
            {
                throw new ArgumentNullException(nameof(types));
            }

            Name = name;
            Types = types;
            SpriteURL = null;
        }

    }
}
