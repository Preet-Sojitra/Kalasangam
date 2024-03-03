import { create } from "zustand"
import axios from "axios"

export const useProfileStore = create((set) => {
  const API_URL = import.meta.env.VITE_API_URL

  let accessToken = localStorage.getItem("accessToken")

  // Access the accesstoken from cookie
  const cookies = document.cookie.split("; ")
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.includes("accessToken")
  )
  if (accessTokenCookie) {
    accessToken = accessTokenCookie.split("=")[1]
  }

  if (!accessToken) {
    return {
      profile: {},
      fetchProfile: () => {},
    }
  }

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile")
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const {
        data: { user },
      } = response
      console.log(response.data)

      set({ profile: user })
    } catch (error) {
      console.log("Error fetching profile")
      console.log(error)
    }
  }
  // fetchProfile()

  return {
    profile: {},
    fetchProfile: fetchProfile,
    setProfile: (profile) => set({ profile }),
  }
})
