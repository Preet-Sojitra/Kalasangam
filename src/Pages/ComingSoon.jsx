import React from "react"
import { Link } from "react-router-dom"

export const ComingSoon = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh] bg-secondary">
        <h1 className="text-4xl font-bold">Coming Soon</h1>

        <Link to="/home">
          <p className="mt-2 text-blue-800"> Back to home</p>
        </Link>
      </div>
    </>
  )
}
