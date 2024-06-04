using System.Collections.Immutable;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("GeographicLocations/{geographicLocationId}/[controller]")]
    public class FileTypesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public FileTypesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<FileType?[]> Get(int geographicLocationId)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var fileTypes = await _dbContext.Documents
                .Where(m => m.GeographicLocationId == geographicLocationId)
                .Select(m => m.FileType)
                .Distinct()
                .OrderBy(m => m.Name)
                .ToArrayAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return fileTypes;
        }
    }
}