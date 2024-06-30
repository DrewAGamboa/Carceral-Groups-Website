using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult?> GetAll()
        {
            try
            {
                List<Category> categories = await _dbContext.Categories.AsNoTracking().ToListAsync();
                return Ok(categories);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                Category? category = await _dbContext.Categories.AsNoTracking()
                    .FirstOrDefaultAsync(m => m.CategoryId == id);

                if(category == null)
                    return NotFound(category);
                
                return Ok(category);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody]CategoryCRUDModel request)
        {
            try{
                var categoryExists = _dbContext.Categories.Any(m => m.Name == request.Name);
                if(categoryExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var category = new Category{
                    Name = request.Name,
                    Color = request.Color
                };

                await _dbContext.Categories.AddAsync(category);
                await _dbContext.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CategoryCRUDModel request)
        {
            Category? category = null;

            try{
                category = await _dbContext.Categories.FirstOrDefaultAsync(m => m.CategoryId == id);
                if(category == null)
                    return NotFound();

                var categoryExists = _dbContext.Categories.Any(m => m.Name == request.Name);
                if(categoryExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                category.Name = request.Name;
                category.Color = request.Color;

                _dbContext.Categories.Update(category);
                await _dbContext.SaveChangesAsync();
                return Ok(category);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Category? category = null;

            try{
                category = await _dbContext.Categories.FirstOrDefaultAsync(m => m.CategoryId == id);
                if(category == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.Categories.Remove(category);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}