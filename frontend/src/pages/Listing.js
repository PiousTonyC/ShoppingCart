import React from 'react'
import PdtCard from '../components/pdtCard'
import axios from 'axios'
import { useState, useEffect  } from 'react';

export default function Listing(props) {

     console.log(props.userId)

      const [products, setProducts] = useState([])
      const flag = true

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/');
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };

  return (
    <div className=' container-fluid min-vh-100 overflow-auto bg-light'>
      <h3 className=" text-center display-5 p-3 mt-3 text-body-emphasis">Browse our collection.....</h3>
      <div className='row justify-content-center'>
      {products.map((data, index) => (
          <PdtCard key={index} data={data} flag = {flag} user_id = {props.userId}/>
        ))}

      </div>
    </div>
  )
}
