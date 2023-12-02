import { create } from "zustand"
import axios from "axios"

export const useProductsStore = create((set) => {
  const API_URL = import.meta.env.VITE_API_URL
  const fetchProducts = async () => {
    try {
      console.log("Fetching all products")
      const response = await axios.get(`${API_URL}/products/all`)
      const { data } = response
      // console.log(data)

      set({ allProducts: data.productsData })
    } catch (error) {
      console.log("Error fetching all products")
      console.log(error)
    }
  }
  fetchProducts()

  return {
    allProducts: [],
    fetchProducts: fetchProducts,
  }
})
