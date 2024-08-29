using Microsoft.EntityFrameworkCore.Query;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class Tasks
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public enum Task_Status { ToDo, InProgress, Done, Closed}
        public Task_Status Status { get; set; }
        public enum Priority_Level { Low, Medium, High }
        public Priority_Level Priority {  get; set; }
        [Required]
        [Range(0,100)]
        public decimal Progress { get; set; }
        [Required]
        public int Story_Point { get; set; }
        [Required]
        public DateTime Start_Date { get; set; }
        [Required]
        public DateTime End_Date { get; set; }
        public Guid? Parent_Id { get; set; }
        [ForeignKey("User_Id")]
        public Guid User_Id { get; set; }
        public User User { get; set; }
        [ForeignKey("Project_Id")] 
        public int Project_Id { get; set; }

        public Project Project { get; set; } 

    }
}
