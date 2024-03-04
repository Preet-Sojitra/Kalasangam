import React from "react"
import { Outlet } from "react-router"
import { Nav } from "../components/Nav"
import { FaChevronLeft } from "react-icons/fa6"
import { useNavigate, useLocation } from "react-router"

export const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <div className="bg-secondary overflow-hidden min-h-screen pb-10">
        <div className="pb-10 pt-5 px-4">
          {location.pathname != "/account" && (
            <div>
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft />
                <h1 className="text-lg">Back</h1>
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </div>

      <Nav />
    </>
  )
}
