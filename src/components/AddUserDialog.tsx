import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { createUser } from "../backend/userapi";
import React from 'react';

interface AddUserDialogProps{
    show: boolean,
    onHide: () => void;
    setUserID?: (userId: string) => void;
}

export default function AddUserDialog({show, onHide} : AddUserDialogProps){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState("");

    const doCreateAcc = async(e : React.FormEvent) =>{
        e.preventDefault();
        try{
            await createUser(name, email, password, isAdmin);
            onHide();
            window.location.reload();
        }catch(err){
            if (err instanceof Error) {
                setMessage(err.message);
            } else{
                setMessage("Fehler");
            }
        }
    }

    function hideAdd(){
        onHide();
        setMessage("");
    }

    return(
        <Modal id="addUserDialog" backdrop="static" show={show} centered onHide={hideAdd}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>Add Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="inputUsername" type="text" name="Username" placeholder="Enter Username" onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formUsername">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control id="inputEmail" type="text" name="Email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPassword">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control id="inputPassword" type="password" name="pass" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formAdminCheckbox">
                        <Form.Check
                            id="inputAdmin"
                            type="checkbox"
                            label="Admin"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                    </Form.Group>
                    {
                        message !== "" &&
                        <Alert id="warningMessage" variant = "warning">
                            <Alert.Heading>
                                {message}
                            </Alert.Heading>
                        </Alert>
                    }
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant= "secondary" onClick={hideAdd}>Cancel</Button>
                    <Button id="addButton" variant= "primary" onClick={doCreateAcc} >ADD</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}