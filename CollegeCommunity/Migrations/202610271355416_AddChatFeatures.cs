namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddChatFeatures : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ChatMessages", "AttachedImageUrl", c => c.String());
            AddColumn("dbo.ChatMessages", "IsPrivate", c => c.Boolean(nullable: false));
            AddColumn("dbo.ChatMessages", "TargetUser", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ChatMessages", "TargetUser");
            DropColumn("dbo.ChatMessages", "IsPrivate");
            DropColumn("dbo.ChatMessages", "AttachedImageUrl");
        }
    }
}
