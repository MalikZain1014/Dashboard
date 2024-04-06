import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ logIn, setLogIn }) => {
  const navigate = useNavigate();

  const Admintoken = localStorage.getItem("Admintoken");

  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("Admintoken");

      navigate("/admin");
      setLogIn(false);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  useEffect(() => {
    if (!logIn || !Admintoken) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProduct({ ...productToEdit }); // Make a copy of the product to edit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        }
      );
      if (response.ok) {
        console.log("Product updated successfully!");
        setSelectedProductId(null);
        fetchProducts(); // Refresh the product list
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setSelectedProductId(null);
  };
  const handleRemove = (productId) => {
    // Handle remove action
    console.log("Remove product with ID:", productId);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b  hover:bg-gray-50"
            >
              <td className="p-4">{product.id}</td>
              <td>
                {selectedProductId === product.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                    className="outline-none focus:ring-0"
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {selectedProductId === product.id ? (
                  <input
                    type="text"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="outline-none focus:ring-0"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {selectedProductId === product.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                    className="outline-none focus:ring-0 w-full"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="flex items-center px-6 py-4">
                {selectedProductId === product.id ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="font-medium text-red-600 mx-2 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <li>
        <Link
          className="block py-2 px-4 hover:bg-gray-700"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </li>
    </div>
  );
};

export default Dashboard;
