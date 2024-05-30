using CarceralGroupsAPI;
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
        public async Task<IEnumerable<GeographicLocation?>> Post(GeographicFilterRequest request)
        {
            var query = _dbContext.Documents.AsQueryable();

            foreach(var item in request.Filters){
                query = query.Where(m => m.CategoryId == item.CategoryId && m.InstitutionId == item.InstitutionId);
            }

            return await query.Select(m => m.GeographicLocation).Distinct().ToListAsync();
        }
    }
}
