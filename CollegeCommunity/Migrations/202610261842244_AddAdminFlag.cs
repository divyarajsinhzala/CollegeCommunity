namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAdminFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "IsAdmin", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Students", "FirstName", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "LastName", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "EnrollmentNo", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "GRNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "Department", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "Branch", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "CollegeEmail", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "CollegeEmail", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Students", "Branch", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Students", "Department", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Students", "GRNumber", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Students", "EnrollmentNo", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Students", "LastName", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Students", "FirstName", c => c.String(nullable: false, maxLength: 50));
            DropColumn("dbo.Students", "IsAdmin");
        }
    }
}
