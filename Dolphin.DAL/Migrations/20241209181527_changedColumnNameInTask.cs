using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dolphin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class changedColumnNameInTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Story_Point",
                table: "tasks",
                newName: "StoryPoint");

            migrationBuilder.RenameColumn(
                name: "Start_Date",
                table: "tasks",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "End_Date",
                table: "tasks",
                newName: "EndDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StoryPoint",
                table: "tasks",
                newName: "Story_Point");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "tasks",
                newName: "Start_Date");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "tasks",
                newName: "End_Date");
        }
    }
}
