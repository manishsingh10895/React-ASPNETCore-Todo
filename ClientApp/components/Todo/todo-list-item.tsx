import * as React from 'react';
import { browserHistory } from 'react-router';
import { TodoItem } from './todo-item';


export class TodoListItem extends React.Component<any, any>
{
    private maxDetailLength = 100;

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = { isCompleted: this.props.task.isCompleted, isDeleted: false };
    }

    private renderTaskStatus()
    {
        console.log("Task Status Action");

        if(this.state.isCompleted)
        {
            return 
        } else {
            return <button className="btn btn-success btn-ok btn-todo-item-fab" title="Task Completed"
                onClick={this.completeCurrentTask.bind(this)}
            >
                <span className="glyphicon glyphicon-ok"></span>
            </button>
        }
    }

    private completeCurrentTask(e)
    {
        e.stopPropagation();

        fetch('/api/Todo/' + this.props.task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.props.task.name,
                detail: this.props.task.detail,
                id: this.props.task.id, 
                isCompleted: true
            })
        }).then(response=> {
            this.setState({isCompleted: true});
        });
    }

    private goToDetail()
    {
        browserHistory.push('/todo/'+ this.props.task.id);
    }

    private deleteTask(e)
    {
        e.stopPropagation();

        fetch('/api/Todo/'+ this.props.task.id, {
            method: 'DELETE',
        }).then(response => console.log(response));

        this.setState({isDeleted: true});
    }

    private renderTask()
    {
        const task:TodoItem = this.props.task;

        console.log(this.state.isCompleted);

        const taskStyles = {
            'borderTop': this.state.isCompleted ? '5px solid green': '5px solid red',
            'cursor': 'pointer',
            'borderRadius': '5px',
            'margin': '6px',
            // 'border': '1px solid black',
            boxShadow: '1px 1px 6px grey'
        };

        const removeButtonStyles = {
            'zIndex': 100
        };

        // If This task is deleted return nothing
        if(this.state.isDeleted) return ;

        
        return <div>
            <div style={taskStyles} className="col-sm-12 task-box" onClick={this.goToDetail.bind(this)} >
                <div className="pull-right">
                    {this.renderTaskStatus()}
                    <button className="btn btn-danger btn-todo-item-fab btn-remove" style= {removeButtonStyles}                         
                        onClick={this.deleteTask.bind(this)}>
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                </div>
                <h4 className="task-item-header">{task.name}</h4>
                <p className="task-item-detail">{task.detail.slice(0, this.maxDetailLength)}</p>
            </div>
        </div>
    }

    public render() {
        return <div className="col-sm-6">
                {this.renderTask()}
            </div>
    }
}