import React from "react"
import { FcGoogle } from "react-icons/fc"
import { useLocation } from "react-router"

export const GoogleOauth = () => {
  const location = useLocation()
  const { search } = location
  const params = new URLSearchParams(search)
  const role = params.get("role")

  return (
    <>
      <a
        href={`
        https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv2%2Fauth%2Fgoogle%2Flogin%2Fcallback&client_id=578968283900-lr29t9cpmh82jn7kjnqjefjlr0v2rvdh.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=%7B%22who%22%3A%22${role}%22%7D
    `}
      >
        <div className="flex px-4 py-2 rounded-md mb-3 border-2 border-accent w-fit mx-auto">
          <FcGoogle className="text-2xl" />
          <span className="ml-2">Login with Google</span>
        </div>
      </a>
    </>
  )
}
