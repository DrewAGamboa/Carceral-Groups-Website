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

            var result = await query
                .Where(predicate)
                .Where(m => m.DocumentCount > 0)
                .Select(m => new GeographicLocationCRUDModel(m.GeographicLocation, m.Category, m.DocumentCount))
                .ToListAsync();
            result = result.GroupBy(m => m.GeographicLocationId)
                .Select(m => m.OrderByDescending(n => n.DocumentCount).FirstOrDefault())
                .ToList();
            return result;
        }
    }
}
