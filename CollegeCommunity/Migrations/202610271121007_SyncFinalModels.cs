namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SyncFinalModels : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clubs", "ImageUrl", c => c.String());
            DropColumn("dbo.Clubs", "CreatedAt");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Clubs", "CreatedAt", c => c.DateTime(nullable: false));
            DropColumn("dbo.Clubs", "ImageUrl");
        }
    }
}
