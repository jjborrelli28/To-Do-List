import React from "react";
import "../index.css";

const lock = <i className="fas fa-lock"></i>;
const unlock = <i className="fas fa-unlock-alt"></i>;

export const Tasks = ({ task, handleTaskChange, handleEdit, handleDelete }) => {
  return (
    <div className="task" key={task.id}>
      <div className="inputContainer">
        <input
          className={task.readOnly ? "inputTaskLock" : "inputTaskUnlock"}
          type="text"
          value={task.desc}
          readOnly={task.readOnly}
          onChange={(e) => handleTaskChange(e, task.id)}
        />
      </div>
      <div className="btnContainer">
        <button className="btnEdit" onClick={() => handleEdit(task.id)}>
          {task.readOnly ? lock : unlock}
        </button>
        <button className="btnDelete" onClick={() => handleDelete(task.id)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
