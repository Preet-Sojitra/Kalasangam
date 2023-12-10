// MyProfile.js
import React, { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useProfileStore } from "../store/profileStore"

export const MyProfile = () => {
  const navigate = useNavigate()

  const handleLogout = useAuthStore((state) => state.handleLogout)
  const accessToken = useAuthStore((state) => state.accessToken)
  const role = useAuthStore((state) => state.role)

  const profile = useProfileStore((state) => state.profile)
  console.log(profile)

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/get-started/login")
    }
  }, [accessToken])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between p-4">
        <Link to="/home">
          <button className="font-bold py-2 px-4 rounded">Home</button>
        </Link>
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
            // TODO: Change the default avatar to something else
            src={profile?.avatar || "https://i.pravatar.cc/300"}
            alt="Profile Picture"
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">Web Developer</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>

            {profile?.email && <p>Email: {profile.email}</p>}

            {profile?.mobile && <p>Phone: {profile.mobile}</p>}
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
