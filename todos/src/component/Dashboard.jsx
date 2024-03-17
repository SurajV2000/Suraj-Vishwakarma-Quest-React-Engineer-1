import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Text } from "@chakra-ui/react";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Dashboard() {
  const [count, setCount] = useState(6);
  const [taskStatus, setTask] = useState({
    todo: {
      name: "TODO",
      items: [
        // { id: "1", content: "First task" },
        // { id: "2", content: "Second task" },
        // { id: "3", content: "Third task" },
        // { id: "4", content: "Fourth task" },
        // { id: "5", content: "Fifth task" },
      ],
    },
    progress: {
      name: "IN PROGRESS",
      items: [],
    },
    review: {
      name: "REVIEW",
      items: [],
    },
    done: {
      name: "DONE",
      items: [],
    },
  });
  const [columns, setColumns] = useState(taskStatus);
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "80%",
          margin: "auto",
          justifyContent: "center",
          height: "100%",
          //   border: "1PX SOLID RED",
          textAlign: "left",
          marginTop: "20px",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  //   border: "1px solid blue",
                  margin: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#F0F0F0",
                }}
                key={columnId}
              >
                <div
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  {" "}
                  <h2>{column.name}</h2>
                </div>

                <div
                  style={{
                    margin: 8,
                    // border: "1px solid blue",
                    height: "auto",
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "#F0F0F0",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                        minHeight: "50px",
                                        borderRadius: "10px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#5a8aac"
                                          : "#FFFFFF",
                                        color: "black",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
                <Text
                  style={{
                    padding: "10px",
                    color: "black",
                    width: "40%",
                    margin: "10px",
                    marginTop: "-5px",
                  }}
                  onClick={() => {
                    if (column.name == "TODO") {
                      let out = prompt("Enter a card details");
                      let data = { id: count.toString(), content: out };
                      setCount((prev) => prev + 1);
                      taskStatus.todo.items.push(data);
                      let newTask = { ...taskStatus };
                      setTask(newTask);
                    } else if (column.name == "IN PROGRESS") {
                      let out = prompt("Enter a card details");
                      let data = {
                        id: count.toString(),
                        content: out,
                      };
                      setCount((prev) => prev + 1);

                      console.log(data);
                      taskStatus.progress.items.push(data);
                      let newTask = { ...taskStatus };
                      setTask(newTask);
                      console.log(taskStatus);
                    } else if (column.name == "REVIEW") {
                      let out = prompt("Enter a card details");
                      let data = { id: count.toString(), content: out };
                      setCount((prev) => prev + 1);

                      taskStatus.review.items.push(data);
                      let newTask = { ...taskStatus };
                      setTask(newTask);
                    } else {
                      let out = prompt("Enter a card details");
                      let data = { id: count.toString(), content: out };
                      setCount((prev) => prev + 1);

                      taskStatus.done.items.push(data);
                      let newTask = { ...taskStatus };
                      setTask(newTask);
                    }
                  }}
                  className={column.name}
                >
                  + Add a card
                </Text>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Dashboard;
