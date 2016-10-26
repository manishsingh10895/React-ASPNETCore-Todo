using System;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactCore.Data;
using ReactCore.Models;

namespace ReactCore.Controllers
{
    [RouteAttribute("api/[controller]")]
    public class TodoController : Controller
    {
        private ITodoRepository _repository;
        private ILogger<TodoController> _logger;

        public TodoController(ITodoRepository repository, ILogger<TodoController> logger) {
            _repository = repository;
            _logger = logger;
        }

        [HttpGetAttribute]
        public IActionResult GetAll()
        {
            return Ok(_repository.GetAll());
        }

        [HttpGetAttribute("{id}")]
        public IActionResult GetOne(string id)
        {
            var item = _repository.GetOne(id);

            if(item == null) {
                return NotFound();
            } 

           return Ok(item);
        }

        [HttpPostAttribute]
        public IActionResult Add([FromBodyAttribute] TodoItem item) 
        {
            if(item == null) return BadRequest();

            if(item.ID == null) item.ID = Guid.NewGuid().ToString();
             _logger.LogInformation(item.Name);

            if(ModelState.IsValid) {
                _repository.Add(item);
                _repository.CommitChanges();
                return Ok(item);
            } else {
                return BadRequest();
            }
        }

        [HttpPutAttribute("{id}")]
        public IActionResult Update(string id, [FromBodyAttribute]TodoItem item)
        {
            if(item == null || !ModelState.IsValid) return BadRequest();

            var oldItem = _repository.GetOne(id);
            if(oldItem == null) return NotFound("Item not found");

            _repository.Update(item);
            _repository.CommitChanges();
            return Ok("Item Updated");
        }

        [HttpDeleteAttribute("{id}")]
        public IActionResult Delete(string id) {
            TodoItem item = _repository.GetOne(id);

            if(item != null) 
            {
                _repository.Delete(item);
                _repository.CommitChanges();

                return Ok("Task Deleted");
            }
            return NotFound();
        }
    }
}
