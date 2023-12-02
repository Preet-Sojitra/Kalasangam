// MyProfile.js
import React, { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export const MyProfile = () => {
  const navigate = useNavigate()

  const handleLogout = useAuthStore((state) => state.handleLogout)
  const accessToken = useAuthStore((state) => state.accessToken)
  const role = useAuthStore((state) => state.role)

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/login")
    }
  }, [accessToken])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="container mx-auto p-8 bg-white rounded shadow-md">
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">Web Developer</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p>City: Anytown</p>
            <p>Country: Countryland</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bio</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* If Role is Artisan then show  */}
      {role === "artisan" && (
        <>
          <Link to="/dashboard/analytics">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Dashboard
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
