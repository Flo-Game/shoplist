import React from 'react';
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateUser } from "../backend/userapi";
import { UserResource } from "../Resources";
interface EditUserDialogProps{
    show: boolean,
    onHide: () => void;
    setUserID?: (userId: string) => void;
    selectedUser: UserResource ;
}

export default function EditUserDialog({show, onHide, selectedUser} : EditUserDialogProps){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setIsAdmin(selectedUser.admin);
            setPassword(selectedUser.password!);
        }
    }, [selectedUser]);

    const doEdit = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            console.log(selectedUser.id+" "+name +" "+ email +" "+ isAdmin);
            await updateUser(selectedUser.id!, selectedUser.id!, name, email, isAdmin, password);
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

    function hideEdit(){
        onHide();
        setMessage("");
    }

    const usernamePlaceholder = selectedUser ? selectedUser.name : "Enter new Username";
    const emailPlaceholder = selectedUser ? selectedUser.email : "Enter new Email";

    return(
        <Modal id="editUserDialog" backdrop="static" show={show} centered onHide={()=>hideEdit()}>
        <form>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id="inputUsername" type="text" name="Username" placeholder={usernamePlaceholder} value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group controlId="formUsername">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control id="inputEmail" type="text" name="Email" placeholder={emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group controlId="formPassword">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control id="inputPassword" type="password" name="pass" placeholder="Enter new password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group controlId="formAdminCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Admin"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                    />
                </Form.Group>
                {
                    message !== "" &&
                    <Alert variant = "warning">
                        <Alert.Heading>
                            {message}
                        </Alert.Heading>
                    </Alert>
                }
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant= "secondary" onClick={()=>hideEdit()}>Cancel</Button>
                <Button id="editNow" variant= "primary" onClick={doEdit} >EDIT</Button>
            </Modal.Footer>
        </form>
    </Modal>
    );
}