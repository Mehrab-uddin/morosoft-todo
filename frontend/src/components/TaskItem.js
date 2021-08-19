import React from "react";

const TaskItem = (props) => {
  const callUpdate = () => {
    console.log(props);
    const status = props?.text.status === true ? false : true;
    props.update(props.text._id, status);
  };
  const deleteIt = () => {
    props.delete(props.text._id);
  };
  return (
    <div
      className={`task `}
      style={{
        background: props?.text.status === true ? "green" : "red",
        color: "white",
      }}
    >
      <p>{props?.text.task}</p>
      <div className="btn">
        <button onClick={callUpdate}>update</button>
        <button onClick={deleteIt}>delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
