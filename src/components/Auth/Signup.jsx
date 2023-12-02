import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import background from "../../assets/bgimage.jpg"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useAuthStore } from "../../store/authStore"

const API_URL = import.meta.env.VITE_API_URL

export const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { search } = location
  const params = new URLSearchParams(search)
  const who = params.get("who")

  const setAccssToken = useAuthStore((state) => state.setAccessToken)
  const setRole = useAuthStore((state) => state.setRole)

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleRegister = async () => {
    // Checks: If any field is empty
    if (
      formData.mobile === "" ||
      formData.name === "" ||
      formData.age === "" ||
      formData.password === ""
    ) {
      toast.error("Please fill all the fields")
      return
    }

    // Checks: If the mobile number is valid
    if (formData.mobile.length !== 10) {
      toast.error("Please enter a valid mobile number")
      return
    }

    // Send the data to the server
    try {
      setIsLoading(true)
      const res = await axios.post(`${API_URL}/auth/signup`, {
        ...formData,
        role: who === "artisan" ? "artisan" : "customer",
      })
      // console.log(res)
      const { data } = res
      console.log(data)

      setIsLoading(false)
      setAccssToken(data.accessToken)
      setRole(data.role)

      // Set the token and role in local storage
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("role", data.role)

      toast.success("Registered Successfully")

      navigate("/home")
    } catch (error) {
      console.log("Error Registering User: 👇")
      console.log(error)

      if (error.response.status == 400) {
        const { msg } = error.response.data
        toast.error(msg)
      } else {
        toast.error("Something went wrong")
      }
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 2500,
        }}
      />
      <div
        className="flex justify-center items-center h-screen bg-cover bg-opacity-50"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-md md:w-full w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl text-gray-800 mb-4 text-center justify-center font-bold">
            SignUp
          </h2>
          <form>
            <div className="mb-4 text-black">
              <label
                htmlFor="mobile"
                className="block text-xl font-medium text-black"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter your mobile number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-black">
              <label
                htmlFor="name"
                className="block text-xl font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                required
                id="name"
                name="name"
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                required
                id="password"
                name="password"
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter Strong Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </form>

          <div className="flex items-center justify-center my-6">
            <button
              className={`text-black bg-accent py-2 text-xl font-bold text-center rounded-lg shadow-md shadow-black flex justify-center px-4 items-center gap-1
                ${
                  isLoading
                    ? "cursor-not-allowed opacity-50 px-4"
                    : "opacity-100"
                }
              `}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
          <p className="text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/auth/get-started/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
