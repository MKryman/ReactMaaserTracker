using System.Text.Json.Serialization;

namespace ReactMaaserTrackerMUI.Data
{
    public class Income
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateEarned { get; set; }
        public int SourceId { get; set; }
        public Source Source { get; set; }
    }
}