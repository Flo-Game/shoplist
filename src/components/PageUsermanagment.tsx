import React from "react";
import { Fragment, useEffect, useState } from "react";
import { UserResource, UsersResource } from "../Resources";
import { useErrorBoundary } from "react-error-boundary";
import { deleteUser, getUsers } from "../backend/userapi";
import LoadingIndicator from "./LoadingIndicator";
import { Button, ListGroup } from "react-bootstrap";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
import ReactGA from "react-ga4";

export default function PageUsermanagment() {
  const [users, setUsers] = useState<UsersResource>();
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const [selectedUser, setSelectedUser] = useState<UserResource | null>({} as UserResource);

  function show() {
    setShowDialog(true);
  }
  function hide() {
    setShowDialog(false);
  }

  function showEdit(user: UserResource) {
    setSelectedUser(user);
    setShowEditDialog(true);
  }
  function hideEdit() {
    setSelectedUser(null);
    setShowEditDialog(false);
  }

  async function load() {
    try {
      const c = await getUsers();
      setUsers(c);
    } catch (err) {
      showBoundary(err);
    }
  }

  async function doDeleteUser(userId: string) {
    try {
      await deleteUser(userId);
      load();
    } catch (err) {
      showBoundary(err);
    }
  }

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "UserManagement",
    });
    load();
  }, []);

  if (!users) {
    return <LoadingIndicator />;
  } else {
    return (
      <div>
        <h2 className="ms-3 mt-3">User Management</h2>
        <Button variant="warning" id="addUserButton" className="ms-3 mb-3" onClick={show}>
          Add Account
        </Button>
        <ListGroup id="listUsers">
          {users.users.map((user) => (
            <ListGroup.Item id={`user-${user.name}`} key={user.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {user.admin ? "Admin" : "User"} <strong>{user.name}</strong> - {user.email}
                </div>
                <div>
                  {!user.admin ? (
                    <>
                      <Button
                        id={`editButton-${user.name}`}
                        className="me-2"
                        variant="primary"
                        onClick={() => showEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button id={`deleteButton-${user.name}`} variant="danger" onClick={() => doDeleteUser(user.id!)}>
                        Delete
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Fragment>
          <AddUserDialog show={showDialog} onHide={hide} />
        </Fragment>
        <Fragment>
          <EditUserDialog show={showEditDialog} onHide={hideEdit} selectedUser={selectedUser!} />
        </Fragment>
      </div>
    );
  }
}
