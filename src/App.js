import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header'
import Footer from "./components/Footer";
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import About from "./components/About";


function App() {
  const [showAddTask, setShowAddTask] = useState(true)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  // Add
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    // setTasks(prevTasks => {
    //   return [...prevTasks,{id,...task}]
    // })

    // setTasks([...tasks,{id,...task}])
  }
  // Delete
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })


    setTasks(tasks.filter(task => task.id !== id))
    // const newTasks = tasks.filter(task => task.id !== id)
    // setTasks(newTasks)
  }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskTotoggle = await fetchTask(id)
    const updTask = { ...taskTotoggle, reminder: !taskTotoggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    // console.log(data)

    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder: data.reminder
        } : task
      )
    )
  }
  return (
    <Router>
      <div className="container">
        {/*判斷showAddTask是true:false,showAdd 在Header.js呼叫 名稱要一樣 */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {/* {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks To show')} */}
        <Routes>
          <Route path='/' element={ <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks To show')}
            </>}/>
          {/* <Route path='/' exact render={(props) => (
           
          )} /> */}

          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
