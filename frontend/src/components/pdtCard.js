import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function PdtCard({ data , flag, user_id }) {

  const navigate = useNavigate();
  const [redirect1,setRedirect1] = useState(false)
  const [redirect2,setRedirect2] = useState(false)

  // console.log(data)
  const { name, description, price, image_url ,product_id } = data;

  const handleAddToCart = () => {
    const addToCart = async () => {
      if(user_id === ''){
        navigate('/login')
      }
      else{
      try {
        const response = await axios.post('http://localhost:5000/cart/add', { user_id,product_id },{headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },});
        console.log('Response:', response.data);
        setRedirect2(true)
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    }
    addToCart();
  }

  const handleRemoveFromCart = () => {
    const removeFromCart = async () => {
      try {
        const response = await axios.post('http://localhost:5000/cart/delete', { user_id,product_id },{headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },});
        console.log('Response:', response.data);
        setRedirect1(true)
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    removeFromCart();
  }

  if(redirect1){
    navigate('/listing')
  }

  if(redirect2){
    navigate('/cart')
  }

  return (
    <div className="col-md-4 p-3 ">
      <div className="card border-0 shadow text-center">
        {/* <img src={image_url} style={{ width: '200px', height: '200px' }} className="card-img-top " alt="Prodct img"/> */}
        <div className="card-body ">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Price: {price}</p>
            {flag ? <button className="btn btn-outline-primary" onClick={handleAddToCart}>Add to Cart</button> : <button className="btn btn-outline-primary" onClick={handleRemoveFromCart}>Remove from Cart</button>}
        </div>
    </div>
    </div>
    
  )
}
