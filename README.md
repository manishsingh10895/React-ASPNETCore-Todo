# React-ASPNETCore-Todo
Simple todo SPA with React ASPNET Core , EntityFramework Core and MySql as Database

Project scaffolded using yeomen aspnetcore-spa generator

Requirements
- Dotnet core [download](https://www.microsoft.com/net/core)
- Node js > 4.0
- mysql-server

**First change mysql connection string in appsettings.json** 

If you need sample data then TodoDatabaseSeeder can do this for you

```cs
    public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            // Fetch mysql connection string
            string connection = Configuration.GetConnectionString("MySql");

            // Add Sample Data in database 
            // Comment this section after first time
            TodoContext context = TodoContextFactory.Create(connection);
            context.AddRange(TodoDatabaseSeeder.GetSampleData());
            context.SaveChanges();

            services.AddDbContext<TodoContext>(options => options.UseMySQL(connection));

            services.AddOptions();

            services.AddScoped<ITodoRepository, TodoRepository>();
        }
```

run 

```bash
    dotnet ef migrations add "Initial"
```

for migrating database to MySQL


To run this app 
```bash
    git clone https://github.com/manishsingh10895/React-ASPNETCore-Todo.git ReactCore
    cd ReactCore
    npm i
    npm i -g webpack
    webpack
    dotnet restore
    dotnet run 
``` 




    
