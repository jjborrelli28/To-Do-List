import React, { useReducer, useEffect } from "react";
import { toDoListReducer } from "./toDoListReducer";
import { useForm } from "./useForm";
import { Tasks } from "./Tasks";

const init = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const ToDoListApp = () => {
  const [tasks, dispatch] = useReducer(toDoListReducer, [], init);

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const action = {
      type: "delete",
      payload: taskId,
    };

    dispatch(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim().length <= 1) {
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      desc: description,
      readOnly: true,
    };

    const action = {
      type: "add",
      payload: newTask,
    };

    dispatch(action);
    reset();
  };

  const handleEdit = (taskId) => {
    const action = {
      type: "edit",
      payload: taskId,
    };
    dispatch(action);
  };

  const handleTaskChange = (e, taskId) => {
    const action = {
      type: "editing",
      payload: taskId,
      desc: e.target.value,
    };
    dispatch(action);
  };

  return (
    <>
      <header>
        <h1>
          <i className="fas fa-edit"></i> To Do List
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Enter Task"
            onChange={handleInputChange}
            value={description}
            className="input"
          />
          <button className="btnInput" type="submit">
            <i className="fas fa-plus"></i>
          </button>
        </form>
        <hr />
      </header>
      <main>
        <div className={tasks.length ? "container" : "displayNone"}>
          {tasks.map((task) => (
            <Tasks
              task={task}
              handleTaskChange={handleTaskChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </main>
      <footer>By Juan Jose Borrelli - Copyright ©:</footer>
    </>
  );
};
