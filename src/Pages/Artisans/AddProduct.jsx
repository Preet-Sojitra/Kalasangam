// src/components/AddProduct.js
import React, { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Nav } from "../../components/Nav"
import { useAuthStore } from "../../store/authStore"

const API_URL = import.meta.env.VITE_API_URL

const AddProduct = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: 0,
    images: null, // For file input
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    // if (name === "images") {
    //   setFormData({
    //     ...formData,
    //     [name]: files[0], // Store the selected file in the state
    //   })
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   })
    // }
  }

  const [files, setFiles] = useState([]) // For file input

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log(files)

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("price", formData.price)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("quantity", formData.quantity)
    // Append the files
    for (let i = 0; i < files.length; i++) {
      formDataToSend.append("images", files[i])
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/artisan/product/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data)
      toast.success("Product add successfully")
      setLoading(false)

      // Clear the form
      setFormData({
        name: "",
        price: "",
        description: "",
        qty: 0,
        images: null,
      })
    } catch (error) {
      console.log(error)
      toast.error("Error adding product")
      setLoading(false)
    }
  }

  return (
    <div className=" min-h-screen">
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
          <label className="block text-xl font-medium">Quantity:</label>
          <input
            type="number"
            className="w-full p-2 mt-1 border rounded-md"
            name="quantity"
            value={formData.quantity}
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
            className="w-full p-2 mt-1 border rounded-md "
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
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button
          className={`bg-accent text-center p-2 text-2xl rounded-md items-center justify-center mt-3
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
      <Nav />
    </div>
  )
}

export default AddProduct
