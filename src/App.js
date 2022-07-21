import { useState } from "react"


import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(true)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: '123',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: '456',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    }, {
      id: 3,
      text: '789',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ])
  // Add
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }

    setTasks([...tasks, newTask])

    // setTasks(prevTasks => {
    //   return [...prevTasks,{id,...task}]
    // })

    // setTasks([...tasks,{id,...task}])
  }
  // Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
    // const newTasks = tasks.filter(task => task.id !== id)
    // setTasks(newTasks)
  }
  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            !task.reminder
        } : task
      )
    )
  }
  return (
    <div className="container">
      {/*判斷showAddTask是true:false,showAdd 在Header.js呼叫 名稱要一樣 */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks To show')}
    </div>
  );
}

export default App;
