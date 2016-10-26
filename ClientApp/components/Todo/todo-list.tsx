import * as React from 'react';
import { TodoListItem }from './todo-list-item';

export class TodoList extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        console.log(props);
    }

    private renderListItems()
    {
        return this.props.todos.map((todo, index) => {
           return <TodoListItem task={todo} key={index}/>
        });

        // return <TodoListItem task={this.props.todos[0]}></TodoListItem>
    }

    public render()
    {
        return <div>
            {this.renderListItems()}
        </div>
    }
}

