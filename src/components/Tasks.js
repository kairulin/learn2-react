import { useState } from "react"

const Tasks = () => {
    const [tasks,setTasks] = useState([
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

    return (
        <>
            {tasks.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks