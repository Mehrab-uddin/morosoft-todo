import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Task = (props) => {
  const [tasks, setTasks] = useState([]);

  const [currentTask, setCurrentTask] = useState();

  const [loading, setLoading] = useState(false);

  const logout = () => {
    props.history.push("/");
  };
  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    //loaidng
    console.log(tasks);
  }, [tasks]);

  //UPDATE TASK
  const updateTask = async (id, status) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND}/task/${id}`,
      { status: status },
      config
    );
    if (res) {
      setLoading(false);
      getTask();
    }
  };

  //DELETE TASK
  const deleteTask = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/task/${id}`,
      config
    );
    if (res) {
      getTask();
      setLoading(true);
    }
  };
  const addTask = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND}/task`,
      {
        task: currentTask,
      },
      config
    );
    if (res) {
      setLoading(false);
      setCurrentTask("");
      if (res) {
        getTask();
        setLoading(false);
      }
    }
  };
  //GET TASK
  const getTask = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND}/task`,
      config
    );
    if (res) {
      setLoading(false);
      setTasks(res.data);
    }
  };

  return (
    <>
      <div className="navbar">
        <h2>Morosoft ToDoApp</h2>
        <button onClick={logout}>logout</button>
      </div>
      <div className="container">
        {loading && <p>loading</p>}
        <div className="task-form">
          <textarea
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <button onClick={addTask}>add task</button>
        </div>
        <div className="task-items">
          {tasks?.map((item) => (
            <TaskItem text={item} update={updateTask} delete={deleteTask} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
