using System.Collections.Generic;
using ReactCore.Models;

namespace ReactCore.Data
{
    public static class TodoDatabaseSeeder
    {
        public static List<TodoItem> GetSampleData()
        {
            var SampleList = new List<TodoItem>();

            SampleList.Add(new TodoItem("Wake Up", "At 7:00"));
            SampleList.Add(new TodoItem("Die", "60 years laters"));
            
            return SampleList;         
        } 
    }
}