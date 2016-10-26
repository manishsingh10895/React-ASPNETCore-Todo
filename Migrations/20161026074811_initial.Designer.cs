using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ReactCore.Data;

namespace ASP.Migrations
{
    [DbContext(typeof(TodoContext))]
    [Migration("20161026074811_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1");

            modelBuilder.Entity("ReactCore.Models.TodoItem", b =>
                {
                    b.Property<string>("ID");

                    b.Property<string>("Detail")
                        .IsRequired();

                    b.Property<bool>("IsCompleted");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("ID");

                    b.ToTable("Todos");
                });
        }
    }
}
