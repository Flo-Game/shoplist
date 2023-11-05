import React from 'react';
import { Fragment, useState } from "react";
import { Container, Nav, Navbar, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import { useLoginContext } from "../LoginContext";
import { removeJWT } from '../JWTManager';

export default function Header() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const { loginInfo, setLoginInfo } = useLoginContext();

  function show() {
    setShowDialog(true);
  }
  function hide() {
    setShowDialog(false);
  }

  function loginButtonClick(){
    show();
  }

  const doLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInfo(null);
    removeJWT();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {" "}
            <h1>WE2 ShopApp</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="me-5">
            <LinkContainer to="/shopper">
                <Nav.Link><h3>Shopper</h3></Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {loginInfo ? 
            (   <LinkContainer to="/prefs">
                    <Nav.Link><h3>Prefs</h3></Nav.Link>
                </LinkContainer>
            ) : null
            }
          </Nav>
          {
            loginInfo?.roles === "a" &&
            <>
              <Nav className="ms-5">
                <LinkContainer to="/admin">
                  <Nav.Link><h3>Admin</h3></Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ms-5">
                <LinkContainer to="/userManagment">
                  <Nav.Link id="userManagment"><h3>UserManagment</h3></Nav.Link>
                </LinkContainer>
              </Nav>
              </>
          }
          <Nav className="me-auto ms-5">
            {loginInfo ? 
            (<Button id="logoutButton" variant="success" onClick={doLogout}>Logout</Button>) 
            : 
            (<Button id="loginButton" variant="success" onClick={loginButtonClick}>Login</Button>)
            }
          </Nav>
        </Container>
      </Navbar>
      <Fragment>
        <LoginDialog show={showDialog} onHide={hide} />
      </Fragment>
    </>
  );
}
