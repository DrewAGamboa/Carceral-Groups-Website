using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FiltersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public FiltersController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<FiltersResponse> Get()
        {
            var categories = await _dbContext.Categories.ToListAsync();
            var response = new FiltersResponse{
                Filters = []
            };

            foreach(var category in categories){
                response.Filters.Add(new FiltersResponseFilter{
                    Category = category.Name,
                    CategoryId = category.CategoryId,
                    Institutions = await _dbContext.Documents
                        .Where(m => m.CategoryId == category.CategoryId)
                        .Select(m => m.Institution != null ? 
                            new FiltersResponseFilterInstitution(m.Institution.InstitutionId, m.Institution.Name) 
                            : new FiltersResponseFilterInstitution(-1, string.Empty) 
                        )
                        .Distinct()
                        .ToListAsync()
                });
            }

            return response;
        }
    }
}