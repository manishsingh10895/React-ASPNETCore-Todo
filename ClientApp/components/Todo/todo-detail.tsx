import * as React from 'react';
import { browserHistory } from 'react-router';
import { TodoItem } from './todo-item';

export class TodoDetail extends React.Component<any,any>{

    constructor(props) {
        super(props);

        this.state = { name: '', detail: '', isCompleted: false, loading: true, isInputChanged: false};

        console.log("Todo Detail");

        fetch('/api/Todo/' + this.props.params.id)
            .then(response => response.json())
            .then((data: TodoItem) => {
                this.setState({name: data.name, detail: data.detail, isCompleted: data.isCompleted, loading: false});
            });
    }

    private renderActionSection()
    {
        let buttonStyles = {
            display: this.state.isInputChanged ? 'block': 'none',
        }


        return <button style={buttonStyles} className="btn btn-success btn-lg"
            onClick={this.saveDetails.bind(this)}
        >
            Save
        </button>
    }

    private saveDetails(e)
    {
        e.preventDefault();

        fetch('/api/Todo/' + this.props.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                detail: this.state.detail,
                id: this.props.params.id, 
                isCompleted: this.state.isCompleted
            })
        }).then(response=> console.log(response));

        browserHistory.goBack();
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
                <h2 className="text-center">Your Task</h2>
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
                        {this.renderActionSection()}
                    </div>
                </form>
            </div>
        </div>
    }

}  