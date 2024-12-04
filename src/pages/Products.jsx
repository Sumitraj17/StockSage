import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productId: "",
    productName: "",
    totalStock: "",
    pricePerUnit: "",
  });
  const [isAddProductPage, setIsAddProductPage] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/getAllProducts"
      );
      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Add a product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/product/createProduct",
        newProduct
      );
      alert(response.data.message);
      setNewProduct({
        productId: "",
        productName: "",
        totalStock: "",
        pricePerUnit: "",
      });
      setIsAddProductPage(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Update a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/product/updateProduct/${editingProduct.productId}`,
        editingProduct
      );
      alert(response.data.message);
      setEditingProduct(null);
      setIsAddProductPage(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/product/deleteProduct/${productId}`
      );
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Roboto', sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!isAddProductPage ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                color: "#343a40",
                fontSize: "2rem",
                marginBottom: "20px",
              }}
            >
              <b>Product List</b>
            </h2>
            <button
              onClick={() => setIsAddProductPage(true)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#008000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                marginBottom: "15px",
                transition: "background-color 0.3s",
              }}
            >
              Add Product +
            </button>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#007BFF", color: "#fff" }}>
              <tr>
                <th style={tableHeaderStyle}>S.No</th>
                <th style={tableHeaderStyle}>Product ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Stock</th>
                <th style={tableHeaderStyle}>Price/Unit</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productId}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{product.productId}</td>
                  <td style={tableCellStyle}>{product.productName}</td>
                  <td style={tableCellStyle}>{product.totalStock}</td>
                  <td style={tableCellStyle}>{product.pricePerUnit}</td>
                  <td style={tableCellStyle}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsAddProductPage(true);
                        }}
                        style={{
                          backgroundColor: "#ffc107",
                          color: "#000",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.productId)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div style={addProductPageStyle}>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.5rem",
            }}
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </h3>
          <form
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          >
            <label style={formLabelStyle}>
              Product ID:
              <input
                type="text"
                value={
                  editingProduct
                    ? editingProduct.productId
                    : newProduct.productId
                }
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        productId: e.target.value,
                      })
                    : setNewProduct({
                        ...newProduct,
                        productId: e.target.value,
                      })
                }
                required
                style={formInputStyle}
                disabled={editingProduct !== null}
              />
            </label>
            <label style={formLabelStyle}>
              Name:
              <input
                type="text"
                value={
                  editingProduct
                    ? editingProduct.productName
                    : newProduct.productName
                }
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        productName: e.target.value,
                      })
                    : setNewProduct({
                        ...newProduct,
                        productName: e.target.value,
                      })
                }
                required
                style={formInputStyle}
              />
            </label>
            <label style={formLabelStyle}>
              Stock:
              <input
                type="number"
                value={
                  editingProduct
                    ? editingProduct.totalStock
                    : newProduct.totalStock
                }
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        totalStock: e.target.value,
                      })
                    : setNewProduct({
                        ...newProduct,
                        totalStock: e.target.value,
                      })
                }
                required
                style={formInputStyle}
              />
            </label>
            <label style={formLabelStyle}>
              Price/Unit:
              <input
                type="number"
                value={
                  editingProduct
                    ? editingProduct.pricePerUnit
                    : newProduct.pricePerUnit
                }
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        pricePerUnit: e.target.value,
                      })
                    : setNewProduct({
                        ...newProduct,
                        pricePerUnit: e.target.value,
                      })
                }
                required
                style={formInputStyle}
              />
            </label>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            <button
              onClick={() => setIsAddProductPage(false)}
              style={{
                backgroundColor: "gray",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ddd",
};

const addProductPageStyle = {
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  margin: "auto",
  backgroundColor: "#fff",
};

const formLabelStyle = {
  display: "block",
  margin: "10px 0",
};

const formInputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

export default Product;
