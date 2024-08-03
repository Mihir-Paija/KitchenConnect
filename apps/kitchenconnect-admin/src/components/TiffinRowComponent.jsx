/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import Modal from 'react-modal';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";
import { changeTiffinPrice } from "../services/tiffinService";
import { useAuth } from "../contexts/AuthContext";

const TiffinRowComponent = ({ tiffin }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [priceDetails, setPriceDetails] = useState(tiffin.priceDetails);
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
      await changeTiffinPrice(authState.authToken,tiffin._id,{priceDetails})
    } catch (error) {
      console.log(error.message);
    } finally {

      closeModal();
    }
  };

  return (
    <>
      <tr key={tiffin._id}>
        <td>
          <Link to={`/tiffin/${tiffin._id}`}>{tiffin._id}</Link>
        </td>
        <td>{tiffin.name}</td>
        <td>{tiffin.shortDescription}</td>
        <td>{tiffin.foodType}</td>
        <td>{tiffin.tiffinType}</td>
        <td>{tiffin.price}</td>
        <td>{tiffin.time}</td>
        <td>
          {tiffin.deliveryDetails.availability
            ? tiffin.deliveryDetails.deliveryCharge
            : "xx"}
        </td>
        <td>
          {tiffin.deliveryDetails.availability
            ? tiffin.deliveryDetails.deliveryTime
            : "xx"}
        </td>
        {/* <td>
          {tiffin.providePacking
            ? tiffin.packingCharge
            : "xx"}
        </td> */}
        <td>{tiffin.rating}</td>
        <td>{tiffin.ratingsize}</td>
        <td>
          {formatDate(tiffin.createdAt)} at {formatTime(tiffin.createdAt)}
        </td>
        <td>
          {formatDate(tiffin.updatedAt)} at {formatTime(tiffin.updatedAt)}
        </td>
        <td>
          <button onClick={openModal}>Check</button>
        </td>
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
            <Form.Group controlId="formPackingCharge">
              <Form.Label>Packing Charge:</Form.Label>
              <Form.Control
                type="string"
                name="packingCharge"
                value={tiffin.providePacking ? tiffin.packingCharge : "Not provide"}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formDeliveryCharge">
              <Form.Label>Delivery Charge:</Form.Label>
              <Form.Control
                type="string"
                name="deliveryCharge"
                value={tiffin.deliveryDetails.availability ? tiffin.deliveryDetails.deliveryCharge : "Not provide"}
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
      {/* 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Price Details"
      >
        <h2>Edit Price Details</h2>
        <form>
          <div>
            <label>Commission:</label>
            <input
              type="number"
              step="0.01"
              name="commission"
              value={priceDetails.commission}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Service Discount:</label>
            <input
              type="number"
              name="serviceDiscount"
              value={priceDetails.serviceDiscount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={priceDetails.price}
              readOnly
            />
          </div>
          <div>
            <label>Kitchen Discount:</label>
            <input
              type="number"
              name="kitchenDiscount"
              value={priceDetails.kitchenDiscount}
              readOnly
            />
          </div>
          <div>
            <label>Packing Charge:</label>
            <input
              type="number"
              name="packingCharge"
              value={tiffin.packingCharge}
              readOnly
            />
          </div>
          <div>
            <label>Delivery Charge:</label>
            <input
              type="number"
              name="deliveryCharge"
              value={tiffin.deliveryCharge}
              readOnly
            />
          </div>
        </form>
        <button onClick={handleSave}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal> */}
    </>
  );
};

export default TiffinRowComponent;
