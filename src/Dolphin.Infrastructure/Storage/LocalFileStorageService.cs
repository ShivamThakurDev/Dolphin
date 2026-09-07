using Dolphin.Application.Common;
using Microsoft.Extensions.Configuration;

namespace Dolphin.Infrastructure.Storage;

public sealed class LocalFileStorageService(IConfiguration configuration) : IFileStorageService
{
    private readonly string _root = configuration["FileStorage:LocalRoot"] ?? Path.Combine(AppContext.BaseDirectory, "storage");

    public async Task<StoredFile> SaveAsync(Stream content, string fileName, string contentType, CancellationToken cancellationToken = default)
    {
        Directory.CreateDirectory(_root);
        var storageKey = $"{DateTimeOffset.UtcNow:yyyy/MM}/{Guid.NewGuid():N}{Path.GetExtension(fileName)}";
        var path = Path.Combine(_root, storageKey.Replace('/', Path.DirectorySeparatorChar));
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        await using var target = File.Create(path);
        await content.CopyToAsync(target, cancellationToken);
        return new StoredFile(storageKey, fileName, contentType, target.Length);
    }

    public Task<Stream> OpenReadAsync(string storageKey, CancellationToken cancellationToken = default)
    {
        var path = Path.Combine(_root, storageKey.Replace('/', Path.DirectorySeparatorChar));
        return Task.FromResult<Stream>(File.OpenRead(path));
    }
}
