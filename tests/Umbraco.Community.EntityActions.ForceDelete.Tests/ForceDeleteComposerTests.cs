using Umbraco.Community.EntityActions.ForceDelete.Composers;

namespace Umbraco.Community.EntityActions.ForceDelete.Tests;

public class ForceDeleteComposerTests
{
    [Fact]
    public void ForceDeleteComposer_Exists()
    {
        var composer = new ForceDeleteComposer();

        Assert.NotNull(composer);
    }
}
