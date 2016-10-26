using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using ReactCore.Models;

namespace ReactCore.Data
{
    public class TodoRepository: ITodoRepository
    {
        private TodoContext _context;
        private ILogger<TodoRepository> _logger;

        public TodoRepository(TodoContext context, ILogger<TodoRepository> logger)
        {
            _logger = logger;
            _context = context;
        }

        public void Add(TodoItem item)
        {
            _context.Set<TodoItem>().Add(item);
        }

        public IEnumerable<TodoItem> GetAll()
        {
            return _context.Set<TodoItem>().AsEnumerable();
        }

        public TodoItem GetOne(string id) 
        {
            return _context.Set<TodoItem>().FirstOrDefault(x => x.ID == id);
        }

        public void Update(TodoItem newItem)
        {
            TodoItem oldItem = _context.Set<TodoItem>().FirstOrDefault(x=> x.ID == newItem.ID);

            oldItem.Detail = newItem.Detail;
            oldItem.Name = newItem.Name;
            oldItem.IsCompleted = newItem.IsCompleted;

            EntityEntry itemEntry = _context.Entry(oldItem);
            itemEntry.State = EntityState.Modified;
        }

        public void Delete(TodoItem item) 
        {
            EntityEntry entry = _context.Entry<TodoItem>(item);
            entry.State = EntityState.Deleted;
        }

        public void DeleteById(string id)
        {
            TodoItem item = this.GetOne(id);
            EntityEntry entry = _context.Entry<TodoItem>(item);

            entry.State = EntityState.Deleted;
        }

        public void DeleteAll()
        {
            IEnumerable<TodoItem> items = _context.Set<TodoItem>().AsEnumerable();

            foreach(var item in items) {
                _context.Entry<TodoItem>(item).State = EntityState.Deleted;
            }
        }

        public void CommitChanges()
        {
            _context.SaveChanges();
        }
    }
}