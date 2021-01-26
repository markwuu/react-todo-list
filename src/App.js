import React, { useState, useRef, useEffect } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1){
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        name={task.name}
        id={task.id}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
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
    const newTask = {id: "todo" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if(id === task.id){
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => id !== task.id );
    setTasks(updatedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2
        id="list-heading"
        tabIndex="-1"
        ref={listHeadingRef}
      >
        {tasks.length} tasks remaining
      </h2>
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
