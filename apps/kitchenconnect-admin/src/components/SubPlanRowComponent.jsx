/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";
import { changeSubPlanPrice } from "../services/subscriptionServices";
import { useAuth } from "../contexts/AuthContext";


const SubPlanRowComponent = ({subPlan}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [priceDetails, setPriceDetails] = useState(subPlan.priceDetails);
  const { authState } = useAuth();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parseFloat(value), // Ensure the value is parsed as a float
    }));
  };

  const handleSave = async () => {
    // Save the updated price details here (e.g., make an API call)
    // For now, just close the modal
    console.log(priceDetails);
    try {
      await changeSubPlanPrice(authState.authToken,subPlan._id,{priceDetails})
    } catch (error) {
      console.log(error.message);
    } finally {

      closeModal();
    }
  };

    return (
      <>
        <tr key={subPlan._id}>
          <td>
          {subPlan._id}
            {/* <Link to={`/tiffin/${subPlan._id}`}>{subPlan._id}</Link> */}
          </td>
          <td>{subPlan.title}</td>
          <td>{subPlan.description}</td>
          <td>{subPlan.days}</td>
          <td>{subPlan.priceDetails.price}</td>
          <td>{subPlan.discount}</td>
          <td>{subPlan.deliveryCharge}</td>
          <td>{subPlan.activated ? "activated" : "deactivated"}</td>
          <td>
          <button onClick={openModal}>Check</button>
        </td>
          {/* <td>
            {formatDate(subPlan.createdAt)} at {formatTime(subPlan.createdAt)}
          </td>
          <td>
            {formatDate(subPlan.updatedAt)} at {formatTime(subPlan.updatedAt)}
          </td> */}
        </tr>

        <Modal
        show={modalIsOpen}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCommission">
              <Form.Label>Commission:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="commission"
                value={priceDetails.commission}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formServiceDiscount">
              <Form.Label>Service Discount:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="serviceDiscount"
                value={priceDetails.serviceDiscount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={priceDetails.price}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formKitchenDiscount">
              <Form.Label>Kitchen Discount:</Form.Label>
              <Form.Control
                type="number"
                name="kitchenDiscount"
                value={priceDetails.kitchenDiscount}
                readOnly
              />
            </Form.Group>
      
            <Form.Group controlId="formDeliveryCharge">
              <Form.Label>Delivery Charge:</Form.Label>
              <Form.Control
                type="string"
                name="deliveryCharge"
                value={subPlan.deliveryCharge ? subPlan.deliveryCharge : "Not provide"}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>   

      </>
      );
}

export default SubPlanRowComponent