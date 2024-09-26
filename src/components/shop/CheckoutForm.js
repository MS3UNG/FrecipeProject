// src/components/CheckoutForm.js
import React from "react";

const CheckoutForm = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <h3 className="text-primary border-bottom border-2 border-primary py-2">
              Checkout
            </h3>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input type="text" className="form-control" id="firstName" />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input type="text" className="form-control" id="lastName" />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input type="tel" className="form-control" id="phone" />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input type="text" className="form-control" id="address" />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="city" />
              </div>
              <div className="col-md-6">
                <label htmlFor="zip" className="form-label">
                  Zip Code
                </label>
                <input type="text" className="form-control" id="zip" />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary py-2 px-4">
                  Place Order
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-5">
            <h3 className="text-primary border-bottom border-2 border-primary py-2">
              Order Summary
            </h3>
            <div className="d-flex justify-content-between">
              <p>Product Name</p>
              <p>$99.99</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Product Name</p>
              <p>$99.99</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Product Name</p>
              <p>$99.99</p>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <h5>Total</h5>
              <h5>$299.97</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
