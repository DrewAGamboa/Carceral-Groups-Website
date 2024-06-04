using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public DocumentsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<DocumentResponse?> Get(int id)
        {
            var query = _dbContext.Documents.Where(m => m.DocumentId == id)
                .Select(m => new DocumentResponse{
                    DocumentId = m.DocumentId,
                    DocumentTitle = m.DocumentTitle,
                    DocumentURI = m.URI,
                    Citation = m.Citation
                });

            return await query.FirstOrDefaultAsync();
        }

        [HttpGet]
        [Route("ByLocationAndType")]
        public async Task<DocumentListResponse?> Get(int geographicLocationId, int documentTypeId)
        {
            var DocumentListResponse = new DocumentListResponse{
                Documents = []
            };
            
            DocumentListResponse.Documents = await _dbContext.Documents.Where(m => m.GeographicLocationId == geographicLocationId && m.DocumentTypeId == documentTypeId)
                .Select(m => new DocumentListResponseItem{
                    DocumentId = m.DocumentId,
                    DocumentTitle = m.DocumentTitle
                })
                .OrderBy(m => m.DocumentTitle)
                .ToListAsync();

            return DocumentListResponse;
        }
    }
}