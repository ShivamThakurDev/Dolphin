using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dolphin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class changeTasksEntityName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tasks",
                table: "tasks");

            migrationBuilder.RenameTable(
                name: "tasks",
                newName: "Tasks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "tasks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tasks",
                table: "tasks",
                column: "Id");
        }
    }
}
