namespace pokedex.Server.Models
{
    /// <summary>
    /// A table that contains the advantages and disadvantages for a particular type.
    /// </summary>
    public class TypeRelationTable
    {
        /// <summary>
        /// The API ID of the type.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// The name of the type.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// A collection of types that this type is strong against.
        /// </summary>
        public IEnumerable<string> TypeAdvantages { get; set; }

        /// <summary>
        /// A collection of types that this type is weak against.
        /// </summary>
        public IEnumerable<string> TypeDisadvantages { get; set; }

        /// <summary>
        /// Creates an instance of the <see cref="TypeRelationTable"/> class.
        /// </summary>
        /// <param name="iD"></param>
        /// <param name="type"></param>
        /// <param name="typeAdvantages"></param>
        /// <param name="typeDisadvantages"></param>
        public TypeRelationTable(int iD, string type, IEnumerable<string> typeAdvantages, IEnumerable<string> typeDisadvantages)
        {
            ID = iD;
            Type = type;
            TypeAdvantages = typeAdvantages;
            TypeDisadvantages = typeDisadvantages;
        }
    }
}
