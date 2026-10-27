namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddChat : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ChatMessages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SenderName = c.String(nullable: false),
                        SenderEnrollmentNo = c.String(),
                        MessageText = c.String(nullable: false),
                        Timestamp = c.DateTime(nullable: false),
                        IsAdmin = c.Boolean(nullable: false),
                        IsHidden = c.Boolean(nullable: false),
                        IsWarning = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ChatMessages");
        }
    }
}
