using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public CommentsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<List<CommentCRUDModel>?> Get(int documentId)
        {
            var comments = await _dbContext.Comments.Where(m => m.IsApproved && m.DocumentId == documentId)
                .Select(m => new CommentCRUDModel(m))
                .ToListAsync();

            return comments;
        }
    }
}