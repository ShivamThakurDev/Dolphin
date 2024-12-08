using Dolphin.DAL.Model.Enum;


namespace Dolphin.DAL.DTOs
{
    public class TaskResponseDto
    {
      
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Model.Enum.TaskStatus Status { get; set; }
        public PriorityLevel Priority { get; set; }
        public decimal Progress { get; set; }
        public int Story_Point { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public Guid? ParentId { get; set; }

    }
}
