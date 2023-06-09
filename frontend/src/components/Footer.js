import React from 'react'

export default function Footer() {
  return (
    <div className="container-fluid bg-dark p-3 ">
        <footer className="d-flex justify-content-between align-items-center py-3 mt-1 border-top">
            <div className="col-md-4 ">
                <span className="mb-3 mb-md-0 text-light">Shopping Cart</span>
            </div>

            <ul className="d-flex nav col-md-4 justify-content-end list-unstyled">
            <li className="ms-3"><p className="text-light">pioustony44733@gmail.com</p></li>
            <li className="ms-3"><p className="text-light">91-9072272724</p></li>
            <li className="ms-3"><p className="text-light">LinkedIn</p></li>
            </ul>
        </footer>
    </div>
  )
}
