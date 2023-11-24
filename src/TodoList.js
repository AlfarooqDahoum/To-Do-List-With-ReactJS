import React, { useState } from 'react';
import './TodoList.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const [completedTasks, setCompletedTasks] = useState([])


  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, completed: false }])
      setInputValue('')
    }
  }
  const editTask = (index, newValue) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].text = newValue
    setTasks(updatedTasks)
  }
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
    setEditIndex(-1)
  }
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)

    if (updatedTasks[index].completed) {
      setCompletedTasks([...completedTasks, updatedTasks[index]])
    } else {
      const remainingTasks = completedTasks.filter((_, i) => i !== index)
      setCompletedTasks(remainingTasks);
    }
  }


  return (

    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setEditIndex(-1);
                  }
                }}
              />
            ) : (
              <>
                <span>{task.text}</span>
                <div className="button-container">
                  <button onClick={() => setEditIndex(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                  <button onClick={() => toggleComplete(index)}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      <div>
        <h2>Completed Tasks</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default TodoList;
