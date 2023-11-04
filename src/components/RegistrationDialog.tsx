import React from 'react';
import { useState } from "react";
import { useLoginContext } from "../LoginContext";
import { Modal } from "react-bootstrap";

interface RegistrationDialogProps{
    showRegistration: boolean,
    onHide: () => void;
    setUserID?: (userId: string) => void;
}

export default function RegistrationDialog({showRegistration, onHide}: RegistrationDialogProps){
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //direkter Login
    const [message, setMessage] = useState("");
    const { loginInfo, setLoginInfo} = useLoginContext();



    return(
        <Modal backdrop="static" show={showRegistration} centered onHide={onHide}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>Registrieren</Modal.Title>
                </Modal.Header> 
            </form>
        </Modal>
    );
}