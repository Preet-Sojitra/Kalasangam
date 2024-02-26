import { create } from "zustand"
import axios from "axios"
import { useAuthStore } from "./authStore"

export const useOrderStore = create((set, get) => {
  const API_URL = import.meta.env.VITE_API_URL

  const accessToken = useAuthStore.getState().accessToken
  // console.log(accessToken)

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const { data } = res
      set({ myOrders: data })
    } catch (error) {
      console.log("Error fetching my orders")
      console.log(error)
    }
  }

  const fetchArtisanOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/artisan/allorders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(res.data)
      const { data } = res
      set({ artisanOrders: data })
    } catch (error) {
      console.log("Error fetching my orders")
      console.log(error)
    }
  }

  return {
    myOrders: [],
    artisanOrders: [],
    fetchMyOrders,
    fetchArtisanOrders,
  }
})
