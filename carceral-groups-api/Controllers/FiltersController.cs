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

            // TODO: Remove when added as column to DB
            response.Filters = AddColorToCategories(response.Filters);

            return response;
        }


        // TODO: Remove when added as column to DB
        private List<FiltersResponseFilter> AddColorToCategories(List<FiltersResponseFilter> categories){
            var random = new Random();
            foreach(var category in categories){
                category.Color = Colors[random.Next(Colors.Count)];
            }
            return categories;
        }

        // TODO: Remove when added as column to DB
        private List<string> Colors = new List<string>{
            "red",
            "blue",
            "green",
            "purple",
            "orange",
            "darkred",
            "lightred",
            "beige",
            "pink",
            "lightblue",
            "lightgreen",
        };
    }
}