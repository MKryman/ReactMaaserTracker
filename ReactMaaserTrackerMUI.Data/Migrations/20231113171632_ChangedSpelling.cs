using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactMaaserTrackerMUI.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangedSpelling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Recepient",
                table: "Maaser",
                newName: "Recipient");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Recipient",
                table: "Maaser",
                newName: "Recepient");
        }
    }
}
