using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InstitutionController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult?> GetAll()
        {
            try
            {
                List<Institution> institutions = await _dbContext.Institutions.AsNoTracking()
                    .OrderBy(m => m.Name)
                    .ToListAsync();
                return Ok(institutions);
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
                Institution? institution = await _dbContext.Institutions.AsNoTracking()
                    .FirstOrDefaultAsync(m => m.InstitutionId == id);

                if(institution == null)
                    return NotFound(institution);

                return Ok(institution);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody]string name)
        {
            try{
                var institutionExists = _dbContext.Institutions.Any(m => m.Name == name);
                if(institutionExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var institution = new Institution{
                    Name = name
                };

                await _dbContext.Institutions.AddAsync(institution);
                await _dbContext.SaveChangesAsync();
                return Ok(institution);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string name)
        {
            Institution? institution = null;

            try{
                institution = await _dbContext.Institutions.FirstOrDefaultAsync(m => m.InstitutionId == id);
                if(institution == null)
                    return NotFound();
                
                var institutionExists = _dbContext.Institutions.Any(m => m.Name == name);
                if(institutionExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                institution.Name = name;

                _dbContext.Institutions.Update(institution);
                await _dbContext.SaveChangesAsync();
                return Ok(institution);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Institution? institution = null;

            try{
                institution = await _dbContext.Institutions.FirstOrDefaultAsync(m => m.InstitutionId == id);
                if(institution == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.Institutions.Remove(institution);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}