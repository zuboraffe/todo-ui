import * as React from 'react';
import { AppBar, TextField, RaisedButton, DatePicker, Checkbox, Paper } from 'material-ui';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';

class Task {
  id: number;
  user: string;
  title: string;
  deadline: Date|undefined;
  checked: boolean;
  constructor(id: number, user: string, title: string, deadline: Date|undefined) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.deadline = deadline;
    this.checked = false;
  }
}

interface AddButtonProps {
  addTask(user: string, title: string, deadline: Date|undefined): void;
}
interface AddButtonStates {
  title: string;
  deadline: Date|undefined;
  err_title: string;
  err_deadline: string;
}
class AddButton extends React.Component<AddButtonProps, AddButtonStates> {
  constructor(props: AddButtonProps) {
    super(props);
    this.state = {
      title: '',
      deadline: undefined,
      err_title: '',
      err_deadline: '',
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  handleClickAdd(): void {
    this.setState({
      err_title: this.state.title === '' ? '必須！' : '',
      err_deadline: this.state.deadline === undefined ? '必須！' : ''
    });
    if (this.state.title === '' || this.state.deadline === undefined) {
      return;
    }

    this.props.addTask('user', this.state.title, this.state.deadline);
    this.setState({
      title: '',
      deadline: undefined,
      err_title: '',
      err_deadline: '',
    });
  }

  handleChangeTitle(event: React.ChangeEvent<Element>, newValue: string) {
    this.setState({
        title: newValue
    });
  }
  handleChangeDate(event: React.ChangeEvent<Element>, newValue: Date) {
    this.setState({
        deadline: newValue
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <TextField hintText="new task name" value={this.state.title} errorText={this.state.err_title} onChange={this.handleChangeTitle} />
          <DatePicker hintText="dead line" value={this.state.deadline} errorText={this.state.err_deadline} onChange={this.handleChangeDate} />
          <RaisedButton label="add"  onClick={this.handleClickAdd} />
        </Paper>
      </div>
    );
  }
}

interface DashboardProps {
}
interface DashboardStates {
  tasks: Task[];
}
class Dashboard extends React.Component<DashboardProps, DashboardStates> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      tasks: [
        new Task(1, 'name1', 'title1', new Date),
        new Task(2, 'name2', 'title2', new Date),
        new Task(3, 'name3', 'title3', new Date),
        new Task(4, 'name4', 'title4', new Date),
        new Task(5, 'name5', 'title5', new Date),
      ],
    };
    this.addTask = this.addTask.bind(this);
  }

  addTask(user: string, title: string, deadline: Date|undefined) {
    let newId: number = this.state.tasks[this.state.tasks.length - 1].id + 1;
    let newTask: Task = new Task (newId, user, title, deadline);
    this.setState({
      tasks: this.state.tasks.concat(newTask)
    });
  }
  handleCheck(index: number, checked: boolean) {
    let tasks: Task[] = this.state.tasks;
    tasks[index].checked = checked;
    this.setState({
      tasks: tasks
    });
  }

  render() {
    return (
      <div>
        <AppBar title="Todo" showMenuIconButton={false}/>
        <AddButton addTask={this.addTask} />
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Deadline</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.tasks.map((task, index) => {
              return (
                <TableRow key={index} rowNumber={index}>
                  <TableRowColumn><Checkbox key={index} checked={task.checked} onCheck={(event: React.MouseEvent<Checkbox>, checked: boolean) => this.handleCheck(index, checked)} /></TableRowColumn>
                  <TableRowColumn>{task.title}</TableRowColumn>
                  <TableRowColumn>{task.deadline == null ? '' : task.deadline.toDateString()}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
