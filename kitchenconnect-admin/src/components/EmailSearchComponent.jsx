/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../styles/EmailSearchComponent.css';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import React from 'react'

const EmailSearchComponent = ({submitHandler ,title }) => {
    //state
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div className="email-container">
        <form className="email-form" onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="email" className="form-label" hidden>Customer Email</label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'invalid' : ''}`}
              placeholder={`${title} Email`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <button type="submit" className="form-button">Go</button>
        </form>
      </div>
  )
}

export default EmailSearchComponent