using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("maasercomputer")]
        public OverviewViewModel DoMaaserMath()
        {
            var repo = new MaaserRepository(_connectionString);

            var totalIncome = repo.ComputeTotalIncomes();
            var maaserObligated = totalIncome / 10;
            var totalMaaserGiven = repo.ComputeTotalMaaser();
            var remainingMaaserOwed = maaserObligated - totalMaaserGiven;

            return new OverviewViewModel
            {
                TotalIncome = totalIncome,
                TotalMaaserObligation = maaserObligated,
                MaaserGiven = totalMaaserGiven,
                RemainingObligation = remainingMaaserOwed
            };
        }

        [HttpPost]
        [Route("givemaaser")]
        public void AddMaaser(Maaser m)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.GiveMaaser(m);
        }

        [HttpGet]
        [Route("getmaaserpayments")]
        public List<Maaser> GetMaaserPayments()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetAllTransactions();
        }

        [HttpGet][Route("getincome")]
        public List<Income> Incomes()
        {
            var repo = new MaaserRepository(_connectionString);
            var incomes =  repo.GetIncome();
            return incomes;
        }

        [HttpGet][Route("getgroupedincome")]
        public List<Source> GroupedIncomes()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetAllSourceWithIncomes();
        }

        [HttpPost]
        [Route("addincome")]
        public void AddIncome(Income i)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.AddIncome(i);
        }

        [HttpGet][Route("getincomesources")]
        public List<Source> GetSources()
        {
            var repo = new MaaserRepository(_connectionString);
            var sources =  repo.GetAllSources();
            return sources;
        }


        [HttpPost][Route("editsource")]
        public void UpdateSource(Source s)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.EditSource(s);
        }

        [HttpPost][Route("addsource")]
        public void NewSource(Source s)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.AddSource(s);
        }

        [HttpPost][Route("deletesource")]
        public void DeleteSource(Source s)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.DeleteSource(s);
        }
    }
}
