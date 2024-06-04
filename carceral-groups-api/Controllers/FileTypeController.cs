using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileTypeController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                FileType? fileType = await _dbContext.FileTypes.AsNoTracking()
                    .FirstOrDefaultAsync(m => m.FileTypeId == id);

                if(fileType == null)
                    return NotFound(fileType);

                return Ok(fileType);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody]string name)
        {
            try{
                var fileTypeExists = _dbContext.FileTypes.Any(m => m.Name == name);
                if(fileTypeExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var fileType = new FileType{
                    Name = name
                };

                await _dbContext.FileTypes.AddAsync(fileType);
                await _dbContext.SaveChangesAsync();
                return Ok(fileType);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string name)
        {
            FileType? fileType = null;

            try{
                fileType = await _dbContext.FileTypes.FirstOrDefaultAsync(m => m.FileTypeId == id);
                if(fileType == null)
                    return NotFound();

                var fileTypeExists = _dbContext.FileTypes.Any(m => m.Name == name);
                if(fileTypeExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                fileType.Name = name;

                _dbContext.FileTypes.Update(fileType);
                await _dbContext.SaveChangesAsync();
                return Ok(fileType);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            FileType? fileType = null;

            try{
                fileType = await _dbContext.FileTypes.FirstOrDefaultAsync(m => m.FileTypeId == id);
                if(fileType == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.FileTypes.Remove(fileType);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}