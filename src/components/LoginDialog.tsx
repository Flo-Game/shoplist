import React from 'react';
import { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { login } from "../backend/shopperapi";
import { getLoginInfoFromJWT, storeJWT} from "../JWTManager";
import { useLoginContext } from "../LoginContext";
import { createUser } from "../backend/userapi";
import ReactGA from "react-ga4";


interface LoginDialogProps{
    show: boolean,
    onHide: () => void;
    setUserID?: (userId: string) => void;
}

export default function LoginDialog({show, onHide}: LoginDialogProps){

    const [registrieren, setRegistrieren] = useState(false);
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setLoginInfo} = useLoginContext();

    function showRegistration(){
        setRegistrieren(true);
    }

    function hideRegistration(){
        onHide();
        setRegistrieren(false);
    }

    const doRegistration = async(e : React.FormEvent) => {
        e.preventDefault();
        try{
            await createUser(username, email, password, false);
            //doLogin(e);
            console.log("Registriert");
        }catch(err){
            setMessage(String(err));
        }
    }

    const doLogin = async(e : React.FormEvent) => {
        e.preventDefault();
        try{
            const loginRessource = await login(email, password);
            const jwt = loginRessource.access_token;
            localStorage.setItem("jwt", jwt)
            console.log("Login: " + jwt);
            
            if(jwt){
                ReactGA.event({
                    category: "User Interaction",
                    action: "User Login",
                    label: `User logged in with email: ${email}`,
                });
                storeJWT(jwt);
                const loginInfo = getLoginInfoFromJWT(jwt);
                setLoginInfo(loginInfo);
               
                setMessage("");
                onHide();
                window.location.reload();
            }else{
                setMessage("Login failed");
            }
        }catch(err){
            setMessage(String(err));
        }finally{
            setPassword("");
        }
    }

    return(
        <Modal id="loginDialog" backdrop="static" show={show} centered onHide={hideRegistration}>
            <form>
                {registrieren ? 
                <Modal.Header closeButton>
                    <Modal.Title>Registrieren</Modal.Title>
                </Modal.Header>:
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                }
                <Modal.Body>
                <Form>
                    {registrieren ?
                    <>  <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="inputUsername" type="text" name="Username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formUsername" className="mt-3">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control id="inputEmail" type="text" name="Email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control id="inputPassword" type="password" name="pass" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <br />
                    </>
                    :
                    <>  <Form.Group controlId="formUsername">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control id="inputEmail" type="text" name="Email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control id="inputPassword" type="password" name="pass" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <br />
                    </>
                    }
                    {
                        message !== "" &&
                        <Alert id="errorMessage" variant = "warning">
                            <Alert.Heading>
                                {message}
                            </Alert.Heading>
                        </Alert>
                    }
                </Form>
                </Modal.Body>
                <Modal.Footer style={{display: "flex"}}>
                    {registrieren ? 
                    <>
                        <Button variant="success" onClick={doRegistration}>Registrieren</Button>
                        <Button variant="secondary" onClick={hideRegistration}>Cancel</Button>
                    </>
                    :
                    <>
                        <Button variant="success" onClick={showRegistration}>Noch keinen Account? Hier Registrieren!</Button>
                        <Button variant="secondary" onClick={hideRegistration}>Cancel</Button>
                        <Button id="okButton" variant="primary" onClick={doLogin}>OK</Button>
                    </>
                    }
                </Modal.Footer>
            </form>
        </Modal>
    );
}