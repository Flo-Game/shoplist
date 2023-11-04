import React from 'react';
import Spinner from "react-bootstrap/Spinner";

export default function LoadingIndicator() {
  return (
    <Spinner animation="border" role="status" className="ms-3 mt-3">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
