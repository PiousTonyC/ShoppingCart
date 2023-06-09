import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar(props) {

  const navigate = useNavigate()

  const handleLogout =  () => {
    try{
      props.setUserId('');
      localStorage.removeItem('jwtToken');
      console.log('logout called')
      navigate('/')
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="container-fluid fixed-top bg-dark">
    <header className="d-flex flex-wrap justify-content-center py-3  border-bottom">
      <Link to="/" className=" mb-3  me-md-auto link-body-emphasis text-decoration-none">
        <span className="fs-4 fw-bold me-3 text-light">Shopping Cart</span>
      </Link>

      {/* {props.userId === '' ? <div>show login</div>:<div>show logout</div>} */}

      <ul className="nav nav-underline pe-2">
        <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/listing" className="nav-link">Listing</Link></li>
        {props.userId !== '' ? <>
        <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li>
        <li className="nav-item"><button className="nav-link" onClick={handleLogout}>Logout</button></li></> :<>
        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li></>}
      </ul>
    </header>
  </div>
  )
}
