import { useContext, createContext, useState, useEffect } from "react";
import React from "react";

const TaskContext = createContext();

const TaskProvider = ({children}) => {

    const [taskData, setTaskData] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskData));
    }, [taskData]);

    const addTask = (title, content, check) => {
        setTaskData([...taskData, { id: Date.now(), title, content, check }]);
    };

    const toggleCheck = (id) => {
        setTaskData((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, check: !task.check } : task
            )
        );
    };

    

    const updateTask = (id, updatedTitle, updatedContent, updatedCheck) => {
        setTaskData((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, title: updatedTitle, content: updatedContent, check: updatedCheck }
                    : task
            )
        );
    };
    

    const deleteTask = (id) => {
        setTaskData((x) => x.filter((task) => id !== task.id));
    } 
    

    return <TaskContext.Provider
    
     value = 
     {{taskData,
      setTaskData, 
      addTask, 
      updateTask, 
      deleteTask, 
      toggleCheck    
      }}
     
     >{children}</TaskContext.Provider>
}

const useTask = () => {
    const context = useContext(TaskContext);

    if(context === undefined) {
        throw new Error("useTask must be within TaskProvider");
    }

    return context;
}

export {TaskProvider, useTask};