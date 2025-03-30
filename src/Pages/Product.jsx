import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AdminProduct.module..css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: [], // Changed to an array for multiple images
    category: "",
    offerPercentage: "",
    stock: "",
    saleTag: [],
    ratings: "",
  });

  const [productList, setProductList] = useState([]); // To hold the list of products
  const imageInputRef = useRef(null);

  // Function to fetch product list (mocked)
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      ); // Mocking a GET request
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts(); // Fetch products when the component is first rendered
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setProduct((prev) => ({
      ...prev,
      images: imageArray,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSaleTagChange = (e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      saleTag: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled before adding to the list
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      product.images.length === 0 ||
      !product.category ||
      !product.stock
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    product.images.forEach((image) => {
      formData.append("images", image); // Append image to form data
    });

    const productDetails = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      offerPercentage: product.offerPercentage,
      stock: product.stock,
      saleTag: product.saleTag,
      ratings: product.ratings,
      images: product.images, // Add images to the product details
    };

    try {
      // Using JSONPlaceholder for mock backend
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts", // Mock API URL
        productDetails
      );
      console.log("Mock product added:", response.data);

      // Directly update product list with the new product
      setProductList((prev) => [
        ...prev,
        {
          title: productDetails.name,
          body: productDetails.description,
          userId: productDetails.price, 
          id: productDetails.category, 
          images: productDetails.images, 
        },
      ]);

      // Reset the form fields
      setProduct({
        name: "",
        description: "",
        price: "",
        images: [],
        category: "",
        offerPercentage: "",
        stock: "",
        saleTag: [],
        ratings: "",
      });

      if (imageInputRef.current) {
        imageInputRef.current.value = ""; 
      }

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleEdit = (index) => {
    const selectedProduct = productList[index];
    setProduct({
      name: selectedProduct.title,
      description: selectedProduct.body,
      price: selectedProduct.userId, 
      images: selectedProduct.images,
      category: selectedProduct.id, 
      offerPercentage: "", 
      stock: "", 
      saleTag: selectedProduct.body.split(", "), 
      ratings: 5, 
    });
  };
//deete function
  const handleDelete = (index) => {
    const updatedProductList = productList.filter((_, i) => i !== index);
    setProductList(updatedProductList);
  };

  return (
    <div className="add-product-container">
      <div className="form-container">
        <h1 className="title">Add Product</h1>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="form-input"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleCategoryChange}
              className="form-input"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="Accessories">Accessories</option>
              <option value="Headphones">Headphones</option>
              <option value="Food">Food</option>
              <option value="Books">Books</option>
              <option value="Clothes/Shoes">Clothes/Shoes</option>
              <option value="Beauty/Health">Beauty/Health</option>
              <option value="Sports">Sports</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="offerPercentage">Offer Percentage</label>
            <input
              type="number"
              id="offerPercentage"
              name="offerPercentage"
              value={product.offerPercentage}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="saleTag">Sale Tag</label>
            <input
              type="text"
              id="saleTag"
              name="saleTag"
              value={product.saleTag.join(", ")}
              onChange={handleSaleTagChange}
              className="form-input"
            />
            <small>
              Enter tags separated by commas (e.g., Flash Sales, Trending
              Product)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="ratings">Ratings</label>
            <input
              type="number"
              id="ratings"
              name="ratings"
              value={product.ratings}
              onChange={handleInputChange}
              className="form-input"
              min="0"
              max="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Images</label>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              onChange={handleImageChange}
              className="form-input"
              required
              ref={imageInputRef}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Product Table */}
      {productList.length > 0 && (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Sale Tags</th>
                <th>Ratings</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.title}</td>
                  <td>{prod.body}</td>
                  <td>{prod.userId}</td> 
                  <td>{prod.id}</td> 
                  <td>Available</td> 
                  <td>{prod.body}</td> 
                  <td>5</td> 
                  <td>
                    {prod.images &&
                      prod.images.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`Product ${idx}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "5px",
                          }}
                        />
                      ))}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
