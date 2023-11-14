using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserContextDataFactory : IDesignTimeDbContextFactory<MaaserDataContext>
    {
        public MaaserDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
             .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactMaaserTrackerMUI-starter.Web"))
             .AddJsonFile("appsettings.json")
             .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true)
             .Build();

            return new MaaserDataContext(config.GetConnectionString("ConStr"));
        }
    }
}