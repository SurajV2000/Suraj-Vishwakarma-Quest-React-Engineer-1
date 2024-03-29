import React, { useEffect, useState } from "react";
import "../css/dash.css";
import { FaRegCommentDots } from "react-icons/fa";

function Dash() {
  const columnname = ["TODO", "INPROGRESS", "REVIEW", "DONE"];
  const [newTask, setNewTask] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const [tasks, setTasks] = useState([
    { id: 1, category: "todo", title: "Learn React" },
  ]);

  useEffect(() => {
    handleAddTask("todo");
  }, [newTask]);

  let getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  const handleAddTask = (category) => {
    if (newTask.trim() !== "") {
      const ID = tasks.length + 1;
      const newTaskObj = { id: ID, title: newTask, category };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  return (
    <>
      <div className="boards">
        {columnname.map((elem) => {
          return (
            <div className="column" key={elem}>
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                {" "}
                <h2>{elem}</h2>
              </div>

              <div
                className="tasklist"
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
                    >
                      <div
                        style={{ backgroundColor: `${getRandomColor()}` }}
                        className="elem"
                      ></div>
                      {task.title}
                      <FaRegCommentDots />
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
