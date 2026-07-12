import { useEffect, useState } from "react";
import API_URL from "../config/api";
import "./AdminUsers.css";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    loadUsers();

  }, []);

  function loadUsers() {

    fetch(`${API_URL}/admin/users`)
      .then((response) => response.json())
      .then((data) => {

        setUsers(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }

  async function deleteUser(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {

      return;

    }

    try {

      const response = await fetch(
        `${API_URL}/admin/users/${id}`,
        {

          method: "DELETE",

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        loadUsers();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  }

  return (

    <div className="admin-users">

      <h1>Registered Users</h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminUsers;