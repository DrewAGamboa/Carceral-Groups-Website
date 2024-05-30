using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("GeographicsLocations/{geographicLocationId}/[controller]")]
    public class DocumentTypesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public DocumentTypesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<string[]> Get(int geographicLocationId)
        {
            var documentTypes = await _dbContext.Documents
                .Where(m => m.GeographicLocationId == geographicLocationId)
                .Select(m => m.DocumentType != null ? m.DocumentType.Name : string.Empty)
                .Distinct()
                .ToArrayAsync();

            return documentTypes;
        }
    }
}