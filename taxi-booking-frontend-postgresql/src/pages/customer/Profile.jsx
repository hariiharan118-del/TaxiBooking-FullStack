import { useState } from "react";
import userService from "../../services/UserService";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("taxi-user") || "null");
  const [name, setName] = useState(storedUser?.name || "");
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!storedUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Please login to view your profile.</div>
      </div>
    );
  }

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const updated = await userService.updateUser(storedUser.id, {
        ...storedUser,
        name,
        phone,
      });
      localStorage.setItem("taxi-user", JSON.stringify(updated));
      setMessage("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!editing ? (
        <>
          <p>Name: {storedUser.name}</p>
          <p>Email: {storedUser.email}</p>
          <p>Phone: {storedUser.phone || "—"}</p>
          <button className="btn btn-success" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSave} className="col-md-5">
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <button className="btn btn-success me-2" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
