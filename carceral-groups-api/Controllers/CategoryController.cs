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

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            Category? category = null;

            try{
                category = await _dbContext.Categories.AsNoTracking()
                    .FirstOrDefaultAsync(m => m.CategoryId == id);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            if(category != null){
                return Ok(category);
            }

            return NotFound(category);
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody]string name)
        {
            var category = new Category{
                Name = name
            };

            try{
                var categoryExists = _dbContext.Categories
                    .Any(m => m.Name == name);

                if(categoryExists){
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
                }
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
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
        public async Task<IActionResult> Put(int id, [FromBody] string name)
        {
            Category? category = null;

            try{
                category = await _dbContext.Categories.FirstOrDefaultAsync(m => m.CategoryId == id);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            if(category != null)
            {
                try{
                    category.Name = name;
                    _dbContext.Categories.Update(category);
                    await _dbContext.SaveChangesAsync();
                    return Ok(category);
                }
                catch(Exception){
                    return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
                }
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Category? category = null;

            try{
                category = await _dbContext.Categories.Where(m => m.CategoryId == id)
                    .FirstOrDefaultAsync();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            if(category != null)
            {
                try{
                    _dbContext.Categories.Remove(category);
                    await _dbContext.SaveChangesAsync();
                    return Ok();
                }
                catch(Exception){
                    return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
                }
            }

            return NotFound();
        }
    }
}