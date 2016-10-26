using System;
using System.ComponentModel.DataAnnotations;

namespace ReactCore.Models
{
    public class TodoItem 
    {
        public TodoItem(string name, string detail) {
            ID = Guid.NewGuid().ToString();
            Name = name;
            Detail = detail;
            IsCompleted = false;
        }

        public TodoItem() {}

        [KeyAttribute]
        public string ID { get; set; }

        [RequiredAttribute]
        public string Name { get; set; }

        [RequiredAttribute]
        public string Detail { get; set; }

        public bool IsCompleted {get; set;}
    }
}