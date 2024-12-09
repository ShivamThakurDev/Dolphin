using Dolphin.DAL.Model.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskStatus = Dolphin.DAL.Model.Enum.TaskStatus;

namespace Dolphin.DAL.Model
{
    public class Tasks:BaseEntity
    {

        [Required]
        [Column(Order = 1)]
        public string Name { get; set; }
        [Required]
        [Column(Order = 2)]
        public string Description { get; set; }

        [Column(Order = 3)]
        public TaskStatus Status { get; set; }
        [Column(Order = 4)]
        public PriorityLevel Priority {  get; set; }
        [Required]
        [Range(0,100)]
        [Column(Order = 5)]
        public decimal Progress { get; set; }
        [Required]
        [Column(Order = 6)]
        public int StoryPoint { get; set; }
        [Required]
        [Column(Order = 7)]
        public DateTime StartDate
        {
            get => _startDate;
            set => _startDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _startDate;
        [Required]
        [Column(Order = 8)]
        

        public DateTime EndDate
        {
            get => _endDate;
            set => _endDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _endDate;

        [Column(Order =9)]
        public Guid? ParentId { get; set; }

    }
}
