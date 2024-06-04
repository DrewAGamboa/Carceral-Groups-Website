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
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var documentTypes = await _dbContext.Documents
                .Where(m => m.GeographicLocationId == geographicLocationId)
                .Select(m => m.DocumentType)
                .Distinct()
                .OrderBy(m => m.Name)
                .ToArrayAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return documentTypes;
        }
    }
}