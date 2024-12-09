using Dolphin.DAL.Model.Enum;


namespace Dolphin.DAL.DTOs
{
    public class TaskRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Model.Enum.TaskStatus Status { get; set; }
        public PriorityLevel Priority { get; set; }
        public decimal Progress { get; set; }
        public int StoryPoint { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? ParentId { get; set; }

    }
}
