using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ProductController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Products.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductDto dto)
    {
        var uploads = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploads))
            Directory.CreateDirectory(uploads);

        var fileName = Guid.NewGuid() + Path.GetExtension(dto.File.FileName);
        var path = Path.Combine(uploads, fileName);

        using var stream = new FileStream(path, FileMode.Create);
        await dto.File.CopyToAsync(stream);

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            FilePath = "/uploads/" + fileName
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok(product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductDto dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        if (dto.File != null)
        {
            var uploads = Path.Combine(_env.WebRootPath, "uploads");

            var fileName = Guid.NewGuid() + Path.GetExtension(dto.File.FileName);
            var path = Path.Combine(uploads, fileName);

            using var stream = new FileStream(path, FileMode.Create);
            await dto.File.CopyToAsync(stream);

            product.FilePath = "/uploads/" + fileName;
        }

        product.Name = dto.Name;
        product.Description = dto.Description;

        await _context.SaveChangesAsync();

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok();
    }
}