import { create } from "zustand"
import axios from "axios"

export const useProductsStore = create((set, get) => {
  const API_URL = import.meta.env.VITE_API_URL
  const fetchProducts = async () => {
    try {
      console.log("Fetching all products")
      const response = await axios.get(`${API_URL}/products/all`)
      const { data } = response
      // console.log(data)

      set({ allProducts: data.productsData })
      set({ filteredProducts: data.productsData })
    } catch (error) {
      console.log("Error fetching all products")
      console.log(error)
    }
  }
  fetchProducts()

  const fetchCategories = async () => {
    try {
      console.log("Fetching all categories")
      const response = await axios.get(`${API_URL}/products/categories/all`)
      const { data } = response
      // console.log(data)

      set({ allCategories: data })
    } catch (error) {
      console.log("Error fetching all categories")
      console.log(error)
    }
  }
  fetchCategories()

  const setSelectedCategory = (category) => {
    set({ selectedCategory: category })
  }

  const fetchProductByCategory = async (category) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/category?category=${category}`
      )
      const { data } = response
      console.log(data)

      // set({ allProducts: data }) //? This is not needed. We can just set the filteredProducts.
      set({ filteredProducts: data })
    } catch (error) {
      console.log("Error fetching products by category")
      console.log(error)
    }
  }

  const searchProducts = (searchTerm, state) => {
    // console.log(searchTerm)
    set({ searchTerm: searchTerm })

    // console.log(state.allProducts.map((product) => product.name))

    const filteredProducts = state.allProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    // console.log(filteredProducts)

    if (searchTerm === "") {
      // console.log("Search term is empty")
      set({ filteredProducts: state.allProducts })
      return
    }
    set({ filteredProducts: filteredProducts })
  }

  return {
    allProducts: [],
    allCategories: [],
    selectedCategory: "Uncategorized",
    searchTerm: "",
    filteredProducts: [],
    searchProducts: (searchTerm) => searchProducts(searchTerm, get()),
    setSelectedCategory: setSelectedCategory,
    fetchProducts: fetchProducts,
    fetchCategories: fetchCategories,
    fetchProductByCategory: fetchProductByCategory,
  }
})
