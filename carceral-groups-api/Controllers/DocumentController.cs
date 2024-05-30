using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                DocumentCRUDModel? document = await _dbContext.Documents.AsNoTracking()
                    .Where(m => m.DocumentId == id)
                    .Select(m => new DocumentCRUDModel(m))
                    .FirstOrDefaultAsync();

                if(document == null)
                    return NotFound(document);
                
                return Ok(document);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody] DocumentCRUDModel request)
        {
            try{
                var documentExists = _dbContext.Documents.Any(m => m.DocumentTitle == request.DocumentTitle);
                if(documentExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var document = new Document{
                    DocumentTitle = request.DocumentTitle,
                    FileTitle = request.FileTitle,
                    URI = request.URI,
                    DocumentTypeId = request.DocumentTypeId,
                    CategoryId = request.CategoryId,
                    InstitutionId = request.InstitutionId,
                    GeographicLocationId = request.GeographicLocationId
                };

                await _dbContext.Documents.AddAsync(document);
                await _dbContext.SaveChangesAsync();
                return Ok(new DocumentCreateResponse(document));
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] DocumentCRUDModel request)
        {
            Document? document = null;

            try{
                document = await _dbContext.Documents.FirstOrDefaultAsync(m => m.DocumentId == id);
                if(document == null)
                    return NotFound();

                var documentExists = _dbContext.Documents.Any(m => m.DocumentTitle == request.DocumentTitle && m.DocumentId != id);
                if(documentExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                document.DocumentTitle = request.DocumentTitle;
                document.FileTitle = request.FileTitle;
                document.URI = request.URI;
                document.DocumentTypeId = request.DocumentTypeId;
                document.CategoryId = request.CategoryId;
                document.InstitutionId = request.InstitutionId;
                document.GeographicLocationId = request.GeographicLocationId;

                _dbContext.Documents.Update(document);
                await _dbContext.SaveChangesAsync();
                return Ok(new DocumentCRUDModel(document));
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
        {
            Document? document = null;

            try{
                document = await _dbContext.Documents.FirstOrDefaultAsync(m => m.DocumentId == id);
                if(document == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.Documents.Remove(document);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}