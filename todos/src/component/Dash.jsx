import React, { useEffect, useState } from "react";
import "../css/dash.css";
function Dash() {
  let columnname = ["TODO", "INPROGRESS", "REVIEW", "DONE"];

  const [tasks, setTasks] = useState([
    { id: 1, category: "todo", title: "Learn React" },
  ]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    handleAddTask("todo");
  }, [newTask]);

  const handleAddTask = (category) => {
    if (newTask.trim() !== "") {
      const newId = tasks.length + 1;
      const newTaskObj = { id: newId, title: newTask, category };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, category) => {
    const updatedTasks = tasks.map((task) => {
      if (task === draggedTask) {
        return { ...task, category };
      }
      return task;
    });
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  return (
    <>
      <div className="boards">
        {columnname.map((elem) => {
          return (
            <div
              key={elem}
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "left",
                border: "1px solid blue",
                margin: "10px",
                borderRadius: "10px",
                backgroundColor: "#F0F0F0",
              }}
            >
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                {" "}
                <h2>{elem}</h2>
              </div>

              <div
                style={{
                  userSelect: "none",
                  border: "1px solid red",
                  padding: "16px",
                  height: "100%",
                  margin: "8px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  minHeight: "50px",
                  borderRadius: "10px",
                  background: false ? "lightblue" : "#F0F0F0",

                  color: "black",
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, `${elem.toLowerCase()}`)}
              >
                {tasks
                  .filter((task) => task.category === `${elem.toLowerCase()}`)
                  .map((task) => (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className="task"
                      style={{
                        userSelect: "none",
                        border: "1px solid blue",
                        padding: 16,
                        margin: "0 0 8px 0",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        minHeight: "50px",
                        borderRadius: "10px",
                        background: false ? "lightblue" : "#F0F0F0",

                        color: "black",
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
              </div>
              {elem === "TODO" ? (
                <text
                  className="addbtn"
                  onClick={() => {
                    let out = prompt("Enter a new task");
                    if (out) {
                      setNewTask(out);
                    } else {
                      return;
                    }
                  }}
                  style={{
                    padding: "10px",
                    color: "black",
                    width: "40%",
                    margin: "10px",
                    marginTop: "-5px",
                  }}
                >
                  + Add a card
                </text>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dash;
