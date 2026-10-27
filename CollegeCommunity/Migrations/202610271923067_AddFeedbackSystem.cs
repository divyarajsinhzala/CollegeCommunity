namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFeedbackSystem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Feedbacks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StudentId = c.Int(nullable: false),
                        Subject = c.String(nullable: false, maxLength: 100),
                        Message = c.String(nullable: false),
                        SubmittedAt = c.DateTime(nullable: false),
                        IsResolved = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Students", t => t.StudentId, cascadeDelete: true)
                .Index(t => t.StudentId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Feedbacks", "StudentId", "dbo.Students");
            DropIndex("dbo.Feedbacks", new[] { "StudentId" });
            DropTable("dbo.Feedbacks");
        }
    }
}
