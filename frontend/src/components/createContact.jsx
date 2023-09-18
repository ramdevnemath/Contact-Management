import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateContact = () => {

  const navigate = useNavigate()

  // Defining state variables
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')

  // Defining state variables for validation messages
  const [fnameError, setFnameError] = useState('')
  const [lnameError, setLnameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // Defining state variables for validating duplicates
  const [emailDuplicateError, setEmailDuplicateError] = useState('')
  const [phoneDuplicateError, setPhoneDuplicateError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const backButton = (e) => {
    e.preventDefault()
    navigate('/')
  }
  
  const handleSubmit =(e)=> {

    e.preventDefault()

    // Reset validation messages
    setFnameError('');
    setLnameError('');
    setEmailError('');
    setPhoneError('');
    setEmailDuplicateError('');
    setPhoneDuplicateError('');

    // Validate form data
    let isValid = true;

    if (!fname) {
      setFnameError('First Name is required');
      isValid = false;
    }

    if (!lname) {
      setLnameError('Last Name is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Phone Number is required');
      isValid = false;
    }

    // If any validation errors, stop the submission
    if (!isValid) {
      return;
    }

    const formData = {
      firstName: fname,
      lastName: lname,
      email,
      phone,
      dob,
    }

    axios
    .post('http://localhost:4000/createContact', formData)
    .then(result => {
      console.log(result)
      navigate('/postSubmit')
    })
    .catch((error) => {
      // Handling error including duplicate entry
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.error;
        if (errorMessage === "Duplicate_Email") {
          setEmailError('Email already exists.');
        }
        if (errorMessage === "Duplicate_Phone") {
          setPhoneError('Phone number already exists.');
        }
      } else {
        setSubmitError('Something went WRONG. Submission FAILED.');
      }
      console.error(error);
    });
  }

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Contact</h2>
          <div className='mb-2'>
            <label htmlFor="">First Name</label>
            <input type="text" placeholder='Enter first name' className='form-control' onChange={(e) => setFname(e.target.value)}/>
            <div className="text-danger">{fnameError}</div>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Last Name</label>
            <input type="text" placeholder='Enter last name' className='form-control' onChange={(e) => setLname(e.target.value)}/>
            <div className="text-danger">{lnameError}</div>
          </div>
          <div className='mb-2'>
            <label htmlFor="">E-mail ID</label>
            <input type="email" placeholder='Enter email id' className='form-control' onChange={(e) => setEmail(e.target.value)}/>
            <div className="text-danger">{emailError}</div>
            <div className="text-danger">{emailDuplicateError}</div>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Phone No.</label>
            <input type="tel" placeholder='Enter mobile number' className='form-control' onChange={(e) => setPhone(e.target.value)}/>
            <div className="text-danger">{phoneError}</div>
            <div className="text-danger">{phoneDuplicateError}</div>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Date of Birth</label>
            <input type="date" placeholder='Enter date of birth' className='form-control' onChange={(e) => setDob(e.target.value)}/>
          </div>
          <div className="text-danger">{submitError}</div>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-success' type='submit'>Submit</button>
            <button className='btn btn-danger ml-auto' onClick={backButton}>Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateContact