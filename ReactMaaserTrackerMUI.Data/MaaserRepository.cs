using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserRepository
    {
        private readonly string _connectionString;

        public MaaserRepository(string connectionString)
        {
            _connectionString = connectionString;          
        }

        //Income
        public List<Income> GetIncome()
        {
            var context = new MaaserDataContext(_connectionString);
            return context.AllIncome.Include(i => i.Source).ToList();
        }

        public void AddIncome(Income income)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Add(income);
            context.SaveChanges();
        }

        //Source
        public List<Source> GetAllSources()
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Sources.ToList();
        }

        public Source GetSourceById(int id)
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Sources.FirstOrDefault(s => s.Id == id);
        }

        public List<Source> GetAllSourceWithIncomes()
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Sources.Include(s => s.SourceEarnings).ToList();
        }

        public void AddSource(Source source)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }

        public void EditSource(Source source)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Sources.Update(source);
            context.SaveChanges();
        }

        public void DeleteSource(Source source)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Sources WHERE Id = {source.Id}");
            context.SaveChanges();
        }

        //Maaser
        public List<Maaser> GetAllTransactions()
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Maaser.ToList();
        }
        
        public void GiveMaaser(Maaser m)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Add(m);
            context.SaveChanges();
        }


        //public OverviewViewModel DoMaaserMath()
        //{
        //    var totalIncome = ComputeTotalIncomes();
        //    var maaserObligated = totalIncome / 10;
        //    var totalMaaserGiven = ComputeTotalMaaser();
        //    var remainingMaaserOwed = maaserObligated - totalMaaserGiven;
        //}


        public decimal ComputeTotalIncomes()
        {
            List<Income> income = GetIncome();
            return income.Sum(i => i.Amount);
        }

        public decimal ComputeTotalMaaser()
        {
            List<Maaser> maaser = GetAllTransactions();
            return maaser.Sum(m => m.Amount);
        }
    }
}
