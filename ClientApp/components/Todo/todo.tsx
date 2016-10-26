import * as React from 'react';
import { TodoItem } from './todo-item';
import { TodoList } from './todo-list';
import { Link } from 'react-router'; 

interface TodoState
{
    todos: TodoItem[];
    loading: boolean;
}

export class Todo extends React.Component<any, TodoState>
{
    constructor(props) {
        super(props);

        this.state = {todos: [], loading: true};

        fetch('/api/Todo/')
            .then(response => response.json())
            .then((data: TodoItem[]) => {
                this.setState({todos: data, loading: false});
            });
    }

    public render()
    {
        let renderedItem = this.state.loading ? this.RenderLoader() : this.RenderTodos();

        return <div>
                    <div className="col-sm-12">
                        <div>
                            <div className="pull-left">
                                <Link to={ '/newTodo' } activeClassName='active' className="btn btn-success btn-lg btn-new">
                                    <span className='glyphicon glyphicon-plus'></span>
                                </Link>
                            </div>
                            <h2 className="text-center todo-header">Todo List</h2>
                        </div>
                    </div>

                    {renderedItem}
                </div>
    }

    private RenderLoader()
    {
        return <h4>Loading .....</h4>
    }

    private RenderTodos()
    {
        console.log("Todos Rendred");
        return <TodoList todos={this.state.todos}></TodoList>
    }

}