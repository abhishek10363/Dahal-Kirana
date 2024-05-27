import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { Button, Modal, Table } from "react-bootstrap";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users");
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching users");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/users/${selectedUser._id}`);
      if (data.success) {
        toast.success("User deleted successfully");
        handleClose();
        fetchUsers(); // Refresh the user list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={user.profilePicture}
                        alt="profile"
                        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 ms-2 rounded-circle"
                        style={{ width: "70px", height: "70px" }}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.createdAt}</td>

                    <td>{user.updatedAt}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        onClick={() => handleShow(user)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal for viewing user details */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="bg-info text-white d-flex justify-content-center" closeButton>
          <Modal.Title className="text-centre">User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          {selectedUser && (
            <>
              <div>
                <img
                  src={selectedUser.profilePicture}
                  alt="profile"
                  className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 ms-2 rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                />
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Created At:</strong> {selectedUser.createdAt}
                </p>
                <p>
                  <strong>Updated At:</strong> {selectedUser.updatedAt}
                </p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger"  onClick={handleDelete}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Users;