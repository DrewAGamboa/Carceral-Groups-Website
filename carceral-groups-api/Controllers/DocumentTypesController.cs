using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("GeographicLocations/{geographicLocationId}/[controller]")]
    public class DocumentTypesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public DocumentTypesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<DocumentType?[]> Get(int geographicLocationId)
        {
            var documentTypes = await _dbContext.Documents
                .Where(m => m.GeographicLocationId == geographicLocationId)
                .Select(m => m.DocumentType)
                .Distinct()
                .ToArrayAsync();

            return documentTypes;
        }
    }
}