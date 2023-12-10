// MyProfile.js
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useProfileStore } from "../store/profileStore"
import { MdEdit } from "react-icons/md"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const API_URL = import.meta.env.VITE_API_URL

export const MyProfile = () => {
  const navigate = useNavigate()

  const handleLogout = useAuthStore((state) => state.handleLogout)
  const accessToken = useAuthStore((state) => state.accessToken)
  const role = useAuthStore((state) => state.role)

  const profile = useProfileStore((state) => state.profile)
  // console.log(profile)
  const setProfile = useProfileStore((state) => state.setProfile)

  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [locationData, setLocationData] = useState(
    profile?.address || {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    }
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleLocationChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/get-started/login")
    }
  }, [accessToken])

  const editLocation = () => {
    setIsEditingLocation(true)
  }
  const saveLocation = async () => {
    console.log(locationData)

    try {
      setIsSaving(true)
      await axios.patch(
        `${API_URL}/profile/edit`,
        {
          address: locationData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setIsSaving(false)
      setIsEditingLocation(false)

      toast.success("Location updated successfully")

      // Update the profile in the store
      setProfile({ ...profile, address: locationData })
    } catch (error) {
      console.log(error)
      toast.error("Error updating location")
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
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
            <div className="flex gap-5 items-center mb-2">
              <h2 className="text-lg font-semibold">Location</h2>
              <span className="flex items-center space-x-3">
                {
                  // If user is editing, then show save button
                  isEditingLocation ? (
                    <>
                      <button
                        className={`  text-white px-4 py-1 rounded-md hover:bg-green-800                   

                      ${
                        isSaving
                          ? "bg-gray-500 cursor-not-allowed opacity-50"
                          : "bg-accent opacity-100"
                      }

                      `}
                        onClick={saveLocation}
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        className={`  px-4 py-1 rounded-md bg-blue-400              
                      `}
                        onClick={() => setIsEditingLocation(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <MdEdit className="inline-block mr-1" />
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={editLocation}
                      >
                        Edit
                      </button>
                    </>
                  )
                }
              </span>
            </div>

            {
              // If user is editing, then show input field
              isEditingLocation ? (
                <>
                  <div>
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Enter your street"
                      onChange={handleLocationChange}
                      value={locationData.street}
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Enter your city"
                      onChange={handleLocationChange}
                      value={locationData.city}
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Enter your state"
                      onChange={handleLocationChange}
                      value={locationData.state}
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Enter your country"
                      onChange={handleLocationChange}
                      value={locationData.country}
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Enter your pincode"
                      onChange={handleLocationChange}
                      value={locationData.pincode}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>
                    {
                      // Check if profile has address
                      profile?.address ? (
                        <>
                          {profile.address.street}
                          <br />
                          {profile.address.city}, {profile.address.state}
                          <br />
                          {profile.address.country} - {profile.address.pincode}
                        </>
                      ) : (
                        "No address found. Please add your address."
                      )
                    }
                  </p>
                </>
              )
            }
          </div>
        </div>
        {/* <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bio</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div> */}
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
