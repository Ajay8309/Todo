import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { useTask } from "../Context/TaskContext";

const TaskList = () => {
    const { addTask, taskData, updateTask, deleteTask } = useTask();

    const [openForm, setOpenForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [check, setCheck] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTaskId !== null) {
            updateTask(editingTaskId, title, content, check);
        } else {
            addTask(title, content, check);
        }

        setTitle("");
        setContent("");
        setCheck(false);
        setEditingTaskId(null);
        setOpenForm(false);
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setContent(task.content);
        setCheck(task.check);
        setEditingTaskId(task.id);
        setOpenForm(true);
    };

    const handleDelete = (task) => {
        deleteTask(task.id);
    }

    return (
        <div className="TaskContainer">
            {openForm && (
                <div className="TaskForm">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <label>
                            Mark done
                            <input
                                type="checkbox"
                                checked={check}
                                onChange={(e) => setCheck((prev) => !prev)}
                            />
                        </label>
                        <button type="submit">
                            {editingTaskId !== null ? "Update Task" : "Add Task"}
                        </button>
                    </form>
                </div>
            )}

            <button onClick={() => setOpenForm((prev) => !prev)}>
                {openForm ? "Close" : "+"}
            </button>

            {taskData.length === 0 ? (
                <p>No tasks available. Add a new task to get started!</p>
            ) : (
                taskData.map((task) => (
                    <div key={task.id}>
                        <TaskItem
                            id={task.id}
                            title={task.title}
                            content={task.content}
                            check={task.check}
                        />
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
