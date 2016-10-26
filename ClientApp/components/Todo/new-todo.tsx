import * as React from 'react';
import { browserHistory } from 'react-router';
import { TodoItem } from './todo-item';

export class NewTodo extends React.Component<any,any>{

    constructor(props) {
        super(props);

        this.state = { name: '', detail: '', loading: true, isInputChanged: false};
    }

    private saveNewTask(e)
    {
        e.preventDefault();

        let task = {
            name: this.state.name,
            detail: this.state.detail,
            isCompleted: false
        };

        fetch('/api/Todo/', {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        browserHistory.goBack();
    }

    private renderActionSection()
    {
        let buttonStyles = {
            display: this.state.isInputChanged ? 'block': 'none',
            margin: '10px'
        }

        return <button style={buttonStyles} className="btn btn-success btn-lg"
            onClick={this.saveNewTask.bind(this)}
        >
            Save
        </button>
    }

    private saveDetails(e)
    {
        e.preventDefault();
    }

    public handleDetailChange(e)
    {
        this.setState({
            detail: e.target.value,
            isInputChanged: true
        });
    }

    public handleNameChange(e)
    {
        this.setState({
            name: e.target.value,
            isInputChanged: true
        });
    }

    public render()
    {
        return <div>
            <div>
                <h2 className="text-center todo-header">New Task</h2>
                <form action="">
                    <div className="col-md-3">
                        <label htmlFor="taskName" className="control-label">Name</label>
                    </div>
                    <div className="col-md-9">
                        <input type="text" id="taskName"
                            value= {this.state.name} 
                            className="form-control"
                            onChange={this.handleNameChange.bind(this)}
                        />
                    </div>

                    <br/><br/><br/><br/>

                    <div className="col-md-3">
                        <label htmlFor="taskDetail" className="control-label">Detail</label>
                    </div>
                    <div className="col-md-9">
                        <textarea cols={30} rows={5} className="form-control"
                            value = {this.state.detail}
                            onChange={this.handleDetailChange.bind(this)}
                        ></textarea>
                    </div>

                    <div className="col-sm-12">
                        <div className="pull-right">
                            {this.renderActionSection()}
                        </div>                        
                    </div>
                </form>
            </div>
        </div>
    }

}  