/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Alert from "react-bootstrap/Alert";
import "../styles/Modal.css";

const AlertComponent = ({AlertMsg,setShowAlert}) => {
  return (
    <div className="modal-overlay-Top" onClick={() => setShowAlert(false)}>
          <Alert
            key={"danger"}
            variant={"danger"}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {AlertMsg}
          </Alert>
        </div>
  )
}

export default AlertComponent