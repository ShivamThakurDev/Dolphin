using Dolphin.DAL.Model.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskStatus = Dolphin.DAL.Model.Enum.TaskStatus;

namespace Dolphin.DAL.Model
{
    public class Tasks:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public PriorityLevel Priority {  get; set; }
        public decimal Progress { get; set; }
        public int StoryPoint { get; set; }
        public DateTime StartDate
        {
            get => _startDate;
            set => _startDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _startDate;       

        public DateTime EndDate
        {
            get => _endDate;
            set => _endDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _endDate;
        public Guid? ParentId { get; set; }
        [ForeignKey("AgencyId")]
        public Guid? AgencyId { get; set; }
        public Agency Agency { get; set; }

    }
}
