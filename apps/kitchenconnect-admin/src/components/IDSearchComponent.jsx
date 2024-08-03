/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../styles/IDSearchComponent.css';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import React from 'react';

const IDSearchComponent = ({ submitHandler, title }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="id-container">
      <form className="id-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label htmlFor="id" className="form-label" hidden>{title} ID</label>
          <input
            type="text"
            id="id"
            className={`form-input ${errors.id ? 'invalid' : ''}`}
            placeholder={`${title} ID`}
            {...register('id', {
              required: 'ID is required',
              pattern: {
                value: /^[a-fA-F0-9]{24}$/,
                message: 'Invalid MongoDB ID'
              }
            })}
          />
          {errors.id && <span className="error-message">{errors.id.message}</span>}
        </div>
        <button type="submit" className="form-button">Go</button>
      </form>
    </div>
  );
};

export default IDSearchComponent;
