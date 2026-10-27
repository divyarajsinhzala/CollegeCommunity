namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddClubMemberships : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ClubMemberships",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StudentId = c.Int(nullable: false),
                        ClubId = c.Int(nullable: false),
                        JoinedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clubs", t => t.ClubId, cascadeDelete: true)
                .ForeignKey("dbo.Students", t => t.StudentId, cascadeDelete: true)
                .Index(t => t.StudentId)
                .Index(t => t.ClubId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ClubMemberships", "StudentId", "dbo.Students");
            DropForeignKey("dbo.ClubMemberships", "ClubId", "dbo.Clubs");
            DropIndex("dbo.ClubMemberships", new[] { "ClubId" });
            DropIndex("dbo.ClubMemberships", new[] { "StudentId" });
            DropTable("dbo.ClubMemberships");
        }
    }
}
