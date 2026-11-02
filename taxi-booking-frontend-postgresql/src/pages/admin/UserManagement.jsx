import { useEffect, useState } from "react";
import userService from "../../services/UserService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Unable to load users.");
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
