// src/components/ProductTable.js
import React from "react";

const ProductTable = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <h1 className="text-primary display-6 mb-4">Products</h1>
        <div className="row">
          <div className="col-lg-12 table-responsive">
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product 1</td>
                  <td>$99.99</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="1"
                    />
                  </td>
                  <td>$99.99</td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Product 2</td>
                  <td>$99.99</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="1"
                    />
                  </td>
                  <td>$99.99</td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Product 3</td>
                  <td>$99.99</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="1"
                    />
                  </td>
                  <td>$99.99</td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end">
                    Subtotal
                  </td>
                  <td>$299.97</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end">
                    Shipping
                  </td>
                  <td>$20.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end">
                    Total
                  </td>
                  <td>$319.97</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
