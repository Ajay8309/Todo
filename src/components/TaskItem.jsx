import React from 'react'
import { useTask } from '../Context/TaskContext'




const TaskItem = ({id, title, content, check}) => {

    const {toggleCheck} = useTask();

    const handleCheckboxChange = () => {
        toggleCheck(id); 
    };


  return (
    <div className='taskCard'>
        <h3>Task</h3>
        <div className="title">
           title: {title}
        </div>
        <div className="content">
            content: {content}
        </div>
        <label htmlFor="">mark done
        <input type="checkbox" onChange={handleCheckboxChange}  checked={check} />
        </label>
    </div>
  )
}

export default TaskItem