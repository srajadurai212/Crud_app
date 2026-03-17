using Microsoft.AspNetCore.Http;

public class ProductDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public IFormFile File { get; set; }
}