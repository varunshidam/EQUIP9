import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../layout/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get("http://localhost:3001/users");
      console.log("Resut : ", result);
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    loadUser();
  };

  const loggeduser = JSON.parse(localStorage.getItem("user"));

  var today = new Date();
  var curHr = today.getHours();
  let greeting;
  if (curHr < 12) {
    greeting = "Good Morning";
  } else if (curHr < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  const notify = () => {
    // Calling toast method by passing string
    toast("Deleted", {
      position: "top-center",
      autoClose: 1000,
      theme: "dark",
    });
  };

  return (
    <div>
      <Navbar />

      <div className="card">
        <div className="card-body">
          <img src={`../../assets/user.jpg`} style={{ maxWidth: 100 }} />
          <h1>
            {" "}
            {greeting}, {loggeduser.name} Thank you for visiting.
          </h1>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Emails</th>
            <th scope="col">Phone</th>
            <th scope="col">password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>#########</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    view
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteUser(user.id);
                      notify();
                    }}
                  >
                    Delete
                  </button>
                  <ToastContainer />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
