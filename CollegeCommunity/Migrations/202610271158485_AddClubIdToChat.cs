namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddClubIdToChat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ChatMessages", "ClubId", c => c.Int(nullable: false));
            CreateIndex("dbo.ChatMessages", "ClubId");
            AddForeignKey("dbo.ChatMessages", "ClubId", "dbo.Clubs", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChatMessages", "ClubId", "dbo.Clubs");
            DropIndex("dbo.ChatMessages", new[] { "ClubId" });
            DropColumn("dbo.ChatMessages", "ClubId");
        }
    }
}
