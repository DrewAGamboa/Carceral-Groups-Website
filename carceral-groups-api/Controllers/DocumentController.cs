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

        [HttpGet]
        public async Task<IActionResult?> GetAll()
        {
            try
            {
                List<DocumentCRUDModel> documents = await _dbContext.Documents.AsNoTracking()
                    .Include(m => m.DocumentType)
                    .Include(m => m.FileType)
                    .Include(m => m.Category)
                    .Include(m => m.Institution)
                    .Include(m => m.GeographicLocation)
                    .OrderBy(m => m.DocumentTitle)
                    .Select(m => new DocumentCRUDModel(m))
                    .ToListAsync();

                return Ok(documents);
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
                DocumentCRUDModel? document = await _dbContext.Documents.AsNoTracking()
                    .Include(m => m.ToGeographicLocations)
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

            // https://learn.microsoft.com/en-us/ef/core/saving/transactions#controlling-transactions
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try{
                var requestToGeographicLocation = request.ToGeographicLocations.Select(m => m.GeographicLocationId).ToList();
                var toGeographicLocations = _dbContext.GeographicLocations.Where(m => requestToGeographicLocation.Contains(m.GeographicLocationId))
                .ToList();

                var document = new Document{
                    DocumentTitle = request.DocumentTitle,
                    FileTitle = request.FileTitle,
                    URI = request.URI,
                    Citation = request.Citation,
                    DocumentTypeId = request.DocumentTypeId,
                    FileTypeId = request.FileTypeId,
                    CategoryId = request.CategoryId,
                    InstitutionId = request.InstitutionId,
                    GeographicLocationId = request.GeographicLocationId,
                    ToGeographicLocations = toGeographicLocations
                };

                // increment location stat. TODO: refactor this into a method
                var locationStat = await _dbContext.LocationDocumentStats.FirstOrDefaultAsync(m => m.GeographicLocationId == request.GeographicLocationId && m.CategoryId == request.CategoryId && m.InstitutionId == request.InstitutionId);
                if (locationStat == null)
                {
                    locationStat = new LocationDocumentStat
                    {
                        GeographicLocationId = request.GeographicLocationId,
                        CategoryId = request.CategoryId,
                        InstitutionId = request.InstitutionId,
                        DocumentCount = 0,
                        LastUpdated = DateTime.UtcNow
                    };
                    await _dbContext.LocationDocumentStats.AddAsync(locationStat);
                    await _dbContext.SaveChangesAsync();
                }
                locationStat.DocumentCount++;
                locationStat.LastUpdated = DateTime.UtcNow;
                _dbContext.LocationDocumentStats.Update(locationStat);
                await _dbContext.SaveChangesAsync();

                await _dbContext.Documents.AddAsync(document);
                await _dbContext.SaveChangesAsync();

                transaction.Commit();
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
                document = await _dbContext.Documents.Include(m => m.ToGeographicLocations).FirstOrDefaultAsync(m => m.DocumentId == id);
                if(document == null)
                    return NotFound();

                var documentExists = _dbContext.Documents.Any(m => m.DocumentTitle == request.DocumentTitle && m.DocumentId != id);
                if(documentExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            // https://learn.microsoft.com/en-us/ef/core/saving/transactions#controlling-transactions
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try{
                // decrement previous location stat. TODO: refactor this into a method
                var oldLocationStat = await _dbContext.LocationDocumentStats.FirstOrDefaultAsync(m => m.GeographicLocationId == document.GeographicLocationId && m.CategoryId == document.CategoryId && m.InstitutionId == document.InstitutionId);
                if (oldLocationStat != null)
                {
                    oldLocationStat.DocumentCount--;
                    oldLocationStat.LastUpdated = DateTime.UtcNow;
                    _dbContext.LocationDocumentStats.Update(oldLocationStat);
                    await _dbContext.SaveChangesAsync();
                }
                if (oldLocationStat != null && oldLocationStat.DocumentCount <= 0)
                {
                    _dbContext.LocationDocumentStats.Remove(oldLocationStat);
                    await _dbContext.SaveChangesAsync();
                }

                var requestToGeographicLocation = request.ToGeographicLocations.Select(m => m.GeographicLocationId).ToList();
                var toGeographicLocations = _dbContext.GeographicLocations.Where(m => requestToGeographicLocation.Contains(m.GeographicLocationId))
                .ToList();

                document.DocumentTitle = request.DocumentTitle;
                document.FileTitle = request.FileTitle;
                document.URI = request.URI;
                document.Citation = request.Citation;
                document.DocumentTypeId = request.DocumentTypeId;
                document.FileTypeId = request.FileTypeId;
                document.CategoryId = request.CategoryId;
                document.InstitutionId = request.InstitutionId;
                document.GeographicLocationId = request.GeographicLocationId;
                document.ToGeographicLocations = toGeographicLocations;

                // increment location stat. TODO: refactor this into a method
                var locationStat = await _dbContext.LocationDocumentStats.FirstOrDefaultAsync(m => m.GeographicLocationId == request.GeographicLocationId && m.CategoryId == request.CategoryId && m.InstitutionId == request.InstitutionId);
                if (locationStat == null)
                {
                    locationStat = new LocationDocumentStat
                    {
                        GeographicLocationId = request.GeographicLocationId,
                        CategoryId = request.CategoryId,
                        InstitutionId = request.InstitutionId,
                        DocumentCount = 0,
                        LastUpdated = DateTime.UtcNow
                    };
                    await _dbContext.LocationDocumentStats.AddAsync(locationStat);
                    await _dbContext.SaveChangesAsync();
                }
                locationStat.DocumentCount++;
                locationStat.LastUpdated = DateTime.UtcNow;
                _dbContext.LocationDocumentStats.Update(locationStat);
                await _dbContext.SaveChangesAsync();

                _dbContext.Documents.Update(document);
                await _dbContext.SaveChangesAsync();

                transaction.Commit();
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
                document = await _dbContext.Documents.Include(m => m.ToGeographicLocations).FirstOrDefaultAsync(m => m.DocumentId == id);
                if(document == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            // https://learn.microsoft.com/en-us/ef/core/saving/transactions#controlling-transactions
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try{
                // decrement previous location stat. TODO: refactor this into a method
                var locationStat = await _dbContext.LocationDocumentStats.FirstOrDefaultAsync(m => m.GeographicLocationId == document.GeographicLocationId && m.CategoryId == document.CategoryId && m.InstitutionId == document.InstitutionId);
                if (locationStat != null)
                {
                    locationStat.DocumentCount--;
                    _dbContext.LocationDocumentStats.Update(locationStat);
                    await _dbContext.SaveChangesAsync();

                }
                if (locationStat != null && locationStat.DocumentCount <= 0)
                {
                    _dbContext.LocationDocumentStats.Remove(locationStat);
                    await _dbContext.SaveChangesAsync();
                }

                _dbContext.Documents.Remove(document);
                await _dbContext.SaveChangesAsync();
                transaction.Commit();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}