using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Text.Json;


namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class EnergiaKulutusController : ControllerBase
{
    private readonly ILogger<EnergiaKulutusController> _logger;

    public EnergiaKulutusController(ILogger<EnergiaKulutusController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name="GetEnergyEntry")]
    public async Task<ActionResult<IEnumerable<EnergyEntryTimespan>>> GetEnergyEntries()
    {
        List<EnergyEntry>? ls = await APIRequest();
        if(ls != null) {
            await TallennaCSV(ls);
            var tmp = ls.GroupBy(x => new {Month=x.timestamp.Month, Year=x.timestamp.Year, Location=x.locationName}).ToList();
            List<EnergyEntryTimespan> lsTimespan = new List<EnergyEntryTimespan>();
            foreach(var group in tmp) {
                var dateGroup = group.Select(x=>x.timestamp);
                EnergyEntryTimespan eets = new EnergyEntryTimespan{
                    fromTimestamp=dateGroup.Min(),
                    toTimestamp=dateGroup.Max(),
                    locationName=group.Key.Location,
                    reportingGroup=group.Select(x=>x.reportingGroup).Distinct().ToList(),
                    unit = group.Select(x=>x.unit).First(),
                    value = group.Select(x=>x.value).Sum()
                };
                lsTimespan.Add(eets);
            }
            return lsTimespan;
        }
        return NoContent();
    }

    public async Task<List<EnergyEntry>?> APIRequest() {
        List<EnergyEntry>? serialized = new List<EnergyEntry>();
        using(var httpClient = new HttpClient()) {
            Stream? json = await httpClient.GetStreamAsync("https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=2019-01-01&EndTime=2019-12-31");
            serialized = await JsonSerializer.DeserializeAsync<List<EnergyEntry>>(json);
            
        }
        return serialized;
    }
    public async Task TallennaCSV(List<EnergyEntry> entryt, string separator=";") {
        using(var w = new StreamWriter($"csvTiedostot/{DateTime.Now.ToString("yyyy-M-dd--HH-mm-ss")}.csv")) {
            string tiedostoonKirjotettavat = $"locationName{separator}reportingGroup{separator}value{separator}unit{separator}timestamp\n";
            tiedostoonKirjotettavat += String.Join("\n", entryt
            .Select(x => $"{x.locationName}{separator}{x.reportingGroup}{separator}{x.value}{separator}{x.unit}{separator}{x.timestamp.ToString("yyyy-M-dd--HH-mm-ss")}"));
            await w.WriteAsync(tiedostoonKirjotettavat);
        }
    }
}
