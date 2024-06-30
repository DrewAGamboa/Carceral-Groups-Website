using CarceralGroupsAPI;
using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GeographicLocationsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public GeographicLocationsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IEnumerable<GeographicLocationCRUDModel?>> Post(GeographicFilterRequest request)
        {
            var query = _dbContext.LocationDocumentStats.AsQueryable();
            var predicate = PredicateBuilder.New<LocationDocumentStat>();

            foreach(var item in request.Filters){
                predicate = predicate.Or(m => m.CategoryId == item.CategoryId && m.InstitutionId == item.InstitutionId);
            }

            // Use a separate LocationDocumentStats table to store the document count for each location. 
            // This is to avoid having to calculate the document count for each location every time a request is made.
            // The application is more read-heavy than write-heavy, so this is a good trade-off.
            // Github issue: https://github.com/DrewAGamboa/Carceral-Groups-Website/issues/124
            var result = await query
                .Where(predicate)
                .Where(m => m.DocumentCount > 0)
                .Select(m => new GeographicLocationCRUDModel(m.GeographicLocation, m.Category, m.DocumentCount))
                .ToListAsync();

            // Group by GeographicLocationId and select the location with the highest document count.
            // This is to avoid having multiple entries for the same location.
            // Display the color of the location with the highest document count.
            result = result.GroupBy(m => m.GeographicLocationId)
                .Select(m => m.OrderByDescending(n => n.DocumentCount).FirstOrDefault())
                .ToList();
                
            return result;
        }

        [HttpPost("destinations")]
        public async Task<IEnumerable<Document?>> PostDestinations(GeographicFilterRequest request)
        {
            var query = _dbContext.Documents.AsQueryable();
            var predicate = PredicateBuilder.New<Document>();

            foreach (var item in request.Filters)
            {
                predicate = predicate.Or(m => m.CategoryId == item.CategoryId && m.InstitutionId == item.InstitutionId);
            }

            var documents = await query.AsNoTracking()
                .Where(predicate)
                .Where(m => m.ToGeographicLocations.Count > 0)
                .Include(m => m.GeographicLocation)
                .Include(m => m.ToGeographicLocations)
                .ToListAsync();
            return documents;
        }
    }
}
