namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEventsAnnouncementsClubs : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clubs", "Description", c => c.String());
            AddColumn("dbo.Clubs", "CreatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Events", "Description", c => c.String());
            AddColumn("dbo.Events", "Location", c => c.String());
            AddColumn("dbo.Events", "CreatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Announcements", "Description", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Announcements", "Description", c => c.String());
            DropColumn("dbo.Events", "CreatedAt");
            DropColumn("dbo.Events", "Location");
            DropColumn("dbo.Events", "Description");
            DropColumn("dbo.Clubs", "CreatedAt");
            DropColumn("dbo.Clubs", "Description");
        }
    }
}
