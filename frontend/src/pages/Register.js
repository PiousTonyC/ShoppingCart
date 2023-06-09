import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [address,setAddress] = useState('')
  const [redirect,setRedirect] = useState(false)

  const submit =  (e) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/register', {name, email, password, address});
        console.log('Response:', response.data);
        setRedirect(true)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    postData();
  }

  if(redirect){
    navigate('/login');
  }

  return (
    <div className="d-flex min-vh-100 justify-content-center pt-5  mt-4">
      <div>
      <div className='border p-5 border-2 bg-light rounded'>
        <h5 className="display-6 fw-bold text-body-emphasis  text-center">Register</h5>
        <form onSubmit={(e)=>submit(e)}>
          <div className="form-group">
            <label htmlFor="inputUsename">Username</label>
            <input type="username" className="form-control" id="inputUsername" placeholder="Username" onChange={e => setName(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={e => setEmail(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <textarea  className="form-control" id="inputAddress" placeholder="Address" rows='3' onChange={e => setAddress(e.target.value)} ></textarea>
          </div>
          
          <div className="d-flex flex-wrap justify-content-evenly pt-3">
            <div>
              <button type="submit" className="btn btn-primary ">Sign in</button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}