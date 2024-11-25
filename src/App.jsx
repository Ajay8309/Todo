import React from 'react'
import TaskList from './components/TaskList'
import Head from './components/Head'
// Todo App using Context API 
// user can create a todo which will have a title and content, check box to mark it
// How can we use context API here 


const App = () => {
  return (
    <div>
      <Head/>
      <TaskList/>
    </div>
  )
}

export default App