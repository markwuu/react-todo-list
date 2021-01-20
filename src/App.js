import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)

  const taskList = tasks.map(task => (
      <Todo
        name={task.name}
        id={task.id}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    )
  );

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    alert(name);
    console.log('tasks', tasks);
    const newTask = {id: "todo" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    console.log('id', id);
    const updatedTasks = tasks.filter(task => id !== task.id );
    console.log('updatedTask', updatedTasks);
    setTasks(updatedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name={'All'}/>
        <FilterButton name={'Active'}/>
        <FilterButton name={'Completed'}/>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
