using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class FileType
    {
        public int FileTypeId { get; set; }

        [StringLength(maximumLength: 64)]
        public required string Name { get; set; }
    }
}