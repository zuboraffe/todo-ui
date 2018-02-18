import * as React from 'react';

class Task {
  id: number;
  user: string;
  title: string;
  deadline: Date|null;
  checked: boolean;
  constructor(id: number, user: string, title: string, deadline: Date|null) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.deadline = deadline;
    this.checked = false;
  }
}

interface AddButtonProps {
  addTask(user: string, title: string, deadline: Date|null): void;
}
interface AddButtonStates {
  isOpenNewPanel: boolean;
  title: string;
  deadline: Date|null;
}
class AddButton extends React.Component<AddButtonProps, AddButtonStates> {
  constructor(props: AddButtonProps) {
    super(props);
    this.state = {
      isOpenNewPanel: false,
      title: '',
      deadline: null,
    };
    this.handleClickTogglePanel = this.handleClickTogglePanel.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickTogglePanel() {
    this.setState({
      isOpenNewPanel: this.state.isOpenNewPanel ? false : true,
    });
  }

  handleClickAdd(): void {
    this.props.addTask('user', this.state.title, this.state.deadline);
  }

  handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
        title: ev.currentTarget.value
    });
  }

  render() {
    if (this.state.isOpenNewPanel) {
      return (
        <div>
          <button onClick={this.handleClickTogglePanel}>[-]</button>
          <input type="text" value={this.state.title} onChange={this.handleChange} />
          <input type="text" onChange={this.handleChange} />
          <button onClick={this.handleClickAdd}>add</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleClickTogglePanel}>[+]</button>
        </div>
      );
    }
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

  addTask(user: string, title: string, deadline: Date|null) {
    let newId: number = this.state.tasks[this.state.tasks.length - 1].id + 1;
    let newTask: Task = new Task (newId, user, title, deadline);
    this.setState({
      tasks: this.state.tasks.concat(newTask)
    });
  }

  render() {
    const taskList = this.state.tasks.map((task) => {
      return (
        <li key={task.id}>
          {task.id} : {task.title} : 
          {task.deadline == null ? '' : task.deadline.toDateString()} : {task.checked ? '[ ]' : '[X]'}
        </li>
      );
    });

    return (
      <div>
        <AddButton addTask={this.addTask} />
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
