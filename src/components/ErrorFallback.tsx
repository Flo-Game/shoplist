import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function ErrorFallback({error}: {error: Error}){
    
    return (
        error.message === "Zugriff verboten: Sie haben keine Berechtigung, auf diese Ressource zuzugreifen." ? (
          <div className="text-center">
            <Alert variant="danger">
              <Alert.Heading>
                Keine Berechtigung!
              </Alert.Heading>
              <p>
                <pre>{error.message}</pre>
              </p>
            </Alert>
          </div>
        ) : (
          <div className="text-center">
            <Alert variant="danger">
              <Alert.Heading>
                Etwas ist schiefgelaufen!
              </Alert.Heading>
              <p>
                <pre>{error.message}</pre>
                <pre>{error.stack}</pre>
              </p>
            </Alert>
          </div>
        )
      );
}