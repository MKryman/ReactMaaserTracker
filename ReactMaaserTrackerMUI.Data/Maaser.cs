namespace ReactMaaserTrackerMUI.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateGiven { get; set; }
    }
}