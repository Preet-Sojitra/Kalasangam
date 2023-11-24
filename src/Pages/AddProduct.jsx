// src/components/AddProduct.js
import React, { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Nav } from "../components/Nav"


const API_URL = import.meta.env.VITE_API_URL

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: null, // For file input
  })

  const handleInputChange = (e) => {
    const { name, value, files } = e.target

    if (name === "images") {
      setFormData({
        ...formData,
        [name]: files[0], // Store the selected file in the state
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("clicked")

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("price", formData.price)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("images", formData.images) // Append the selected file

    try{
      const response = await axios.post(`${API_URL}/product/add`, formDataToSend);
      console.log(response.data.message);
      toast.success("Product add successfully")
    } catch (error){
      console.log(error);
    }
  }

  return (
    <div>
       <Toaster position="top-right" reverseOrder={false} />
      <div className="p-3 items-start justify-start">
        <h2 className="text-3xl text-black font-bold">Add New Product</h2>
      </div>
      <form className="justify-center items-center p-3 ">
        <div>
          <label className="block text-xl font-medium">Name:</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-md"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-xl font-medium">Price:</label>
          <input
            type="number"
            className="w-full p-2 mt-1 border rounded-md"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-xl font-medium">Description:</label>
          <textarea
            name="description"
            className="w-full p-2 mt-1 border rounded-md"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-xl font-medium">Images:</label>
          <input
            type="file"
            className="w-full p-2 mt-1 border rounded-md"
            name="images"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-accent text-center p-2 text-2xl rounded-md items-center justify-center mt-3"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
      <Nav />
    </div>
  )
}

export default AddProduct
