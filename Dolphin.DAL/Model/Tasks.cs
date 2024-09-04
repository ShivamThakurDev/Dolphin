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
    public class Tasks:BaseEntity
    {

        [Required]
        [Column(Order = 2)]
        public string Name { get; set; }
        [Required]
        [Column(Order = 3)]
        public string Description { get; set; }
        public enum Task_Status { ToDo, InProgress, Done, Closed}
        [Column(Order = 4)]
        public Task_Status Status { get; set; }
        public enum Priority_Level { Low, Medium, High }
        [Column(Order = 5)]
        public Priority_Level Priority {  get; set; }
        [Required]
        [Range(0,100)]
        [Column(Order = 6)]
        public decimal Progress { get; set; }
        [Required]
        [Column(Order = 7)]
        public int Story_Point { get; set; }
        [Required]
        [Column(Order = 8)]
        public DateTime Start_Date { get; set; }
        [Required]
        [Column(Order = 9)]
        public DateTime End_Date { get; set; }
        [Column(Order = 10)]
        public Guid? Parent_Id { get; set; }
        [ForeignKey("User_Id")]
        [Column(Order = 11)]
        public Guid User_Id { get; set; }
        public User User { get; set; }
        [ForeignKey("Project_Id")]
        [Column(Order = 12)]
        public Guid Project_Id { get; set; }

        public Project Project { get; set; } 

    }
}
