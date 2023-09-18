import React from 'react'
import { useNavigate } from 'react-router-dom'

function PostSubmit() {
  
  const navigate = useNavigate()
  
  const navigateCreateContact = (e) => {
    e.preventDefault()
    navigate('/create')
  }
  const navigateContactList = (e) => {
    e.preventDefault()
    navigate('/')
  }
  return (
    <div className="container">
      <div className="alert alert-success mt-5">
        Contact saved successfully!
      </div>
      <div className="mt-3">
        <h6>Create another contact : <button onClick={navigateCreateContact} className="btn btn-success mr-2">✅</button></h6>
        <h6>Contact Lists : <button onClick={navigateContactList} className="btn btn-dark">📃</button></h6>
      </div>
    </div>
  )
}

export default PostSubmit