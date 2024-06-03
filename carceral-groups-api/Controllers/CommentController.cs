using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                CommentCRUDModel? comment = await _dbContext.Comments.AsNoTracking()
                    .Where(m => m.CommentId == id)
                    .Select(m => new CommentCRUDModel(m))
                    .FirstOrDefaultAsync();

                if(comment == null)
                    return NotFound(comment);
                
                return Ok(comment);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody] CommentCreateRequest request)
        {
            try{
                var comment = new Comment{
                    FullName = request.FullName,
                    Email = request.Email,
                    CommentText = request.CommentText,
                    IsApproved = false,
                    DocumentId = request.DocumentId
                };

                await _dbContext.Comments.AddAsync(comment);
                await _dbContext.SaveChangesAsync();
                return Ok(new CommentCreateResponse(comment));
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CommentCRUDModel request)
        {
            Comment? comment = null;

            try{
                comment = await _dbContext.Comments.FirstOrDefaultAsync(m => m.CommentId == id);
                if(comment == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                comment.FullName = request.FullName;
                comment.Email = request.Email;
                comment.CommentText = request.CommentText;
                comment.IsApproved = request.IsApproved;
                comment.DocumentId = request.DocumentId;

                _dbContext.Comments.Update(comment);
                await _dbContext.SaveChangesAsync();
                return Ok(new CommentCRUDModel(comment));
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
        {
            Comment? comment = null;

            try{
                comment = await _dbContext.Comments.FirstOrDefaultAsync(m => m.CommentId == id);
                if(comment == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.Comments.Remove(comment);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}