import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProfileStore } from "../store/profileStore"
import { useNavigate, useParams, useLocation } from "react-router-dom"

export const UserNavigationOptions = () => {
  const { profile, fetchProfile } = useProfileStore()
  const navigate = useNavigate()
  const location = useLocation()

  console.log("profile")
  console.log(profile)

  useEffect(() => {
    console.log("reached here")

    fetchProfile()
    // console.log(profile)
  }, [location])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl">
            Hello, <span className="font-bold">{profile?.name || "User"}</span>
          </h1>
        </div>

        <div>
          <Link to="/account/profile">
            <img
              src={profile?.avatar || "https://dummyimage.com/100x100/000/fff"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3">
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
      </div>
    </div>
  )
}
