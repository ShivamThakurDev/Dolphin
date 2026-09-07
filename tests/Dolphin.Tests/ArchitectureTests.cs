using FluentAssertions;

namespace Dolphin.Tests;

public sealed class ArchitectureTests
{
    [Fact]
    public void Domain_project_does_not_reference_application_or_infrastructure()
    {
        var referencedAssemblies = typeof(Dolphin.Domain.Common.BaseEntity)
            .Assembly
            .GetReferencedAssemblies()
            .Select(a => a.Name)
            .ToList();

        referencedAssemblies.Should().NotContain("Dolphin.Application");
        referencedAssemblies.Should().NotContain("Dolphin.Infrastructure");
        referencedAssemblies.Should().NotContain("Dolphin.Api");
    }
}
