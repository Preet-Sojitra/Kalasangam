import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useProfileStore } from "../store/profileStore"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useAuthStore } from "../store/authStore"

export const UserNavigationOptions = () => {
  const profile = useProfileStore((state) => state.profile)
  const fetchProfile = useProfileStore((state) => state.fetchProfile)

  const { accessToken, role } = useAuthStore()

  useEffect(() => {
    fetchProfile()
  }, [])

  // console.log(profile)

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl">
              Hello,{" "}
              <span className="font-bold">{profile?.name || "User"}</span>
            </h1>
          </div>

          <div>
            <Link to="/account/profile">
              <img
                src={
                  profile?.avatar || "https://dummyimage.com/100x100/000/fff"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </div>
        </div>

        <div>
          <h1>
            You are logged in as {role === "customer" ? "Customer" : "Artisan"}
          </h1>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3">
          {role === "customer" ? (
            // FOR CUSTOMERS
            <>
              <div className="bg-white border border-black px-4 py-3 rounded-2xl w-full">
                <Link to="/account/orders">
                  <h1 className="w-full text-center"> Your Orders</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/comingsoon">
                  <h1 className="w-full text-center"> Your Wishlist</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/comingsoon">
                  <h1 className="w-full text-center"> Your Cart</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/account/profile">
                  <h1 className="w-full text-center"> Your Profile</h1>
                </Link>
              </div>
            </>
          ) : (
            // FOR ARTISANS
            <>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/account/orders">
                  <h1 className="w-full text-center">All Orders</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/comingsoon">
                  <h1 className="w-full text-center">Your Inventory</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/account/addproduct">
                  <h1 className="w-full text-center">Add Product</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/account/analytics">
                  <h1 className="w-full text-center">Analytics</h1>
                </Link>
              </div>
              <div className="bg-white border border-black w-full px-4 py-3 rounded-2xl">
                <Link to="/account/profile">
                  <h1 className="w-full text-center">Profile</h1>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
