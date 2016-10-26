using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MySQL.Data.EntityFrameworkCore.Extensions;
using ReactCore.Models;

namespace ReactCore.Data
{
    public class TodoContext: DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options){}

        public DbSet<TodoItem> Todos {get; set;}        
    }

    // TodoContext Factory for initialization 
    public static class TodoContextFactory {
        private static DbContextOptionsBuilder optionsBuilder;
        public static DbContextOptionsBuilder OptionsBuilder {get;}

        public static TodoContext Create(string connectionString)
        {
            TodoDatabaseSeeder.GetSampleData();

            var optionsBuilder = new DbContextOptionsBuilder<TodoContext>();
            optionsBuilder.UseMySQL(connectionString);

            TodoContextFactory.optionsBuilder = optionsBuilder;

            // Ensure that database is created before application runs
            TodoContext context = new TodoContext(optionsBuilder.Options);

            context.Database.EnsureCreated();

            return context;
        }
    }
}