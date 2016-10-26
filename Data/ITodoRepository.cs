using System.Collections.Generic;
using ReactCore.Models;

namespace ReactCore.Data
{
    public interface ITodoRepository
    {
        void Add(TodoItem item);
        TodoItem GetOne(string id);
        IEnumerable<TodoItem> GetAll();
        void DeleteById(string id);
        void DeleteAll();

        void Update(TodoItem item);

        void Delete(TodoItem item);
        void CommitChanges();
    }
}