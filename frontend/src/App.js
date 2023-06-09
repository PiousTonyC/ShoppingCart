import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Footer from './components/Footer';


function App() {

  const [userId,setUserId] = useState('') 

  return (
    <>
      <BrowserRouter>
      <Navbar setUserId={setUserId} userId={userId} />
      <div className="navbar-fixed-top" style={{height: "60px"}}></div>
        <Routes>
          <Route path="/" element = {<Home/>}></Route>
          <Route path="/listing" element = {<Listing userId={userId}/>}></Route>
          <Route path="/Login" element = {<Login setUserId={setUserId}/>}></Route>
          <Route path="/Register" element = {<Register/>}></Route>
          <Route path="/Cart" element = {<Cart userId={userId}/>}></Route>
        </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
