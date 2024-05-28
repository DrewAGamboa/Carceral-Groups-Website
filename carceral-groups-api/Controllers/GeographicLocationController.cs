using System.Net;
using CarceralGroupsAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carceral_groups_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GeographicLocationController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet("{id}")]
        public async Task<IActionResult?> Get(int id)
        {
            try{
                GeographicLocationCRUDModel? geogrphicLocation = await _dbContext.GeographicLocations.AsNoTracking()
                    .Where(m => m.GeographicLocationId == id)
                    .Select(m => new GeographicLocationCRUDModel(m))
                    .FirstOrDefaultAsync();

                if(geogrphicLocation == null)
                    return NotFound(geogrphicLocation);
                
                return Ok(geogrphicLocation);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }
        }

        [HttpPost]
        public async Task<IActionResult?> Post([FromBody] GeographicLocationCRUDModel request)
        {
            try{
                var geographicLocationExists = _dbContext.GeographicLocations.Any(m => (m.GeographicLocationName == request.GeographicLocationName) ||
                (m.Latitude == request.Latitude && m.Longitude == request.Longitude));
                
                if(geographicLocationExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                var geographicLocation = new GeographicLocation{
                    GeographicLocationName = request.GeographicLocationName,
                    Latitude = request.Latitude,
                    Longitude = request.Longitude
                };

                await _dbContext.GeographicLocations.AddAsync(geographicLocation);
                await _dbContext.SaveChangesAsync();
                return Ok(geographicLocation);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] GeographicLocationCRUDModel request)
        {
            GeographicLocation? geographicLocation = null;

            try{
                geographicLocation = await _dbContext.GeographicLocations.FirstOrDefaultAsync(m => m.GeographicLocationId == id);
                if(geographicLocation == null)
                    return NotFound();

                var geographicLocationExists = _dbContext.GeographicLocations.Any(m => ((m.GeographicLocationName == request.GeographicLocationName) ||
                (m.Latitude == request.Latitude && m.Longitude == request.Longitude)) &&
                m.GeographicLocationId != id);

                if(geographicLocationExists)
                    return StatusCode((int)HttpStatusCode.Conflict, Messages.ResourceAlreadyExists);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                geographicLocation.GeographicLocationName = request.GeographicLocationName;
                geographicLocation.Latitude = request.Latitude;
                geographicLocation.Longitude = request.Longitude;

                _dbContext.GeographicLocations.Update(geographicLocation);
                await _dbContext.SaveChangesAsync();
                return Ok(geographicLocation);
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            GeographicLocation? geographicLocation = null;

            try{
                geographicLocation = await _dbContext.GeographicLocations.FirstOrDefaultAsync(m => m.GeographicLocationId == id);
                if(geographicLocation == null)
                    return NotFound();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseReadError);
            }

            try{
                _dbContext.GeographicLocations.Remove(geographicLocation);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception){
                return StatusCode((int)HttpStatusCode.InternalServerError, Messages.DatabaseSaveError);
            }
        }
    }
}