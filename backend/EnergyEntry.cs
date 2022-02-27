namespace backend;
public class EnergyEntry
{
    public DateTime timestamp { get; set; }
    public string reportingGroup { get; set; }
    public string locationName { get; set; }
    public double value { get; set; }
    public string unit { get; set; }
}
public class EnergyEntryTimespan {
    public DateTime fromTimestamp { get; set; }
    public DateTime toTimestamp { get; set; }
    public string locationName { get; set; }
    public List<string> reportingGroup { get; set; }
    public double value { get; set; }
    public string unit { get; set; }
}
