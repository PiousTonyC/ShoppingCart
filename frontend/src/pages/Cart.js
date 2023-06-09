import React from 'react'
import PdtCard from '../components/pdtCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect  } from 'react';

export default function Cart(props) {

  console.log(props.userId)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const flag = false;



  const handleCheckout = async () => {
    console.log('Haldle checkout')
    console.log(products)
    const idList = [];
    if(products.length > 0){
        products.forEach(obj => {
        idList.push(obj.product_id);
        });
    console.log(idList);
    }

    try {
      const response = await axios.post('http://localhost:5000/checkout',{"user_id":props.userId,"product_ids": idList},{headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },});
      console.log('Response:', response.data);
      setRedirect(true) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if(redirect){
    navigate('/listing');
  }

    const fetchData = async () => {
      try {
        console.log(localStorage.getItem('jwtToken'))
        const response = await axios.get('http://localhost:5000/mycart',{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          params: {
            user_id:props.userId
          }
        }); 
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    },[]);


  return (
    <div className='container-fluid min-vh-100 overflow-auto bg-light'>
        <h3 className=" p-2 text-center display-5 mt-5 text-body-emphasis">Your Cart .... </h3>
        <div className='row justify-content-center'>
            {products.length > 0 ? products.map((data, index) => (
                <PdtCard key={index} data={data} flag={flag} user_id = {props.userId} />
            )):<div className=" p-2 text-center  text-body-emphasis" >cart empty</div>}
        </div>
        <div className='d-flex justify-content-center mt-5'>
            <button className='btn btn-lg btn-primary  ' onClick={handleCheckout}>Checkout</button>
        </div>
    </div>

  )
}