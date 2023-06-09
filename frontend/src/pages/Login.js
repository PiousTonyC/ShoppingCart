import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate('/register');
  };

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [message,setMessage] = useState('')

  const submit =  (e) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', { email,password });
        console.log('Response:', response.data);
        if(response.data.hasOwnProperty('message')){
          const token = response.data.access_token;
          localStorage.setItem('jwtToken', token);
          props.setUserId(response.data.user_id);
          setRedirect(true)
        }
        else{
          setMessage(response.data.error)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    postData();
  }

  if(redirect){
    navigate('/');
  }

  return (

    <div className="d-flex justify-content-center  min-vh-100  pt-5  mt-5">
      <div>
        <div className='border p-4 border-2 bg-light rounded'>
          <h5 className="display-6 fw-bold text-body-emphasis  text-center">Login</h5>
          <form onSubmit={(e)=>submit(e)}>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input type="email" className="form-control" id="inputEmail"  placeholder="Enter email" onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly pt-3">
              <div>
                <button type="submit" className="btn btn-primary ">Login in</button>
              </div>
              <div>
                <button type="button" onClick={navigateToRegister} className="btn btn btn-outline-primary ">Register</button>
              </div>
            </div>
            {message.length > 0 && <div className="alert alert-danger text-center mt-3" role="alert">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}