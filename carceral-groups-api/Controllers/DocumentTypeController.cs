using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentTypeController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                DocumentType? documentType = await _dbContext.DocumentTypes.AsNoTracking()
                    .FirstOrDefaultAsync(m => m.DocumentTypeId == id);

                if(documentType == null)
                    return NotFound(documentType);

                return Ok(documentType);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody]string name)
        {
            try{
                var documentTypeExists = _dbContext.DocumentTypes.Any(m => m.Name == name);
                if(documentTypeExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var documentType = new DocumentType{
                    Name = name
                };

                await _dbContext.DocumentTypes.AddAsync(documentType);
                await _dbContext.SaveChangesAsync();
                return Ok(documentType);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string name)
        {
            DocumentType? documentType = null;

            try{
                documentType = await _dbContext.DocumentTypes.FirstOrDefaultAsync(m => m.DocumentTypeId == id);
                if(documentType == null)
                    return NotFound();

                var documentTypeExists = _dbContext.DocumentTypes.Any(m => m.Name == name);
                if(documentTypeExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                documentType.Name = name;

                _dbContext.DocumentTypes.Update(documentType);
                await _dbContext.SaveChangesAsync();
                return Ok(documentType);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            DocumentType? documentType = null;

            try{
                documentType = await _dbContext.DocumentTypes.FirstOrDefaultAsync(m => m.DocumentTypeId == id);
                if(documentType == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.DocumentTypes.Remove(documentType);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}