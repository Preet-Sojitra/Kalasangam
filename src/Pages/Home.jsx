import React, { useEffect, useState } from "react"
import search from "../assets/search.svg"
import ProductCard from "../components/Products/ProductCard.jsx"
import { Link } from "react-router-dom"
// import products from "../data/products.js"
// import { Nav } from "../components/Nav.jsx"
import { useProductsStore } from "../store/productsStore.js"
import { useAuthStore } from "../store/authStore.js"

const Home = () => {
  // Keep this commented out for now. Use case of this:
  // When the user visits the home page, we want to fetch all the products from the backend and store it in the store.

  // useEffect(() => {
  //   useProductsStore.getState().fetchProducts()
  // }, [])

  // const allProducts = useProductsStore((state) => state.allProducts)
  // const fetchProducts = useProductsStore((state) => state.fetchProducts)
  const {
    allProducts,
    fetchProducts,
    allCategories,
    selectedCategory,
    setSelectedCategory,
    fetchProductByCategory,
    searchTerm,
    // setSearchTerm,
    searchProducts,
    filteredProducts,
  } = useProductsStore()

  // console.log(allProducts)
  // ! If token wala not works, then uncomment the below lines.
  // const setAccessToken = useAuthStore((state) => state.setAccessToken)
  // const setRole = useAuthStore((state) => state.setRole)
  const { setAccessToken, setRole } = useAuthStore()

  useEffect(() => {
    // When user lands on this page, if cookies are present, store them to the store and local storage.
    // Because when user logs in with google, the response from the backend will come with the cookies and not the accessToken.
    // So we need to store the cookies in the store and local storage.

    // console.log(document.cookie)
    if (document.cookie) {
      // console.log("Cookies are present")
      const cookies = document.cookie.split("; ")
      // console.log(cookies)

      const accessTokenCookie = cookies.find((cookie) =>
        cookie.includes("accessToken")
      )

      // console.log("accessTokenCookie from Home.jsx")
      // console.log(accessTokenCookie)

      const roleCookie = cookies.find((cookie) => cookie.includes("role"))
      // console.log("roleCookie from Home.jsx")
      // console.log(roleCookie)

      if (accessTokenCookie && roleCookie) {
        setAccessToken(accessTokenCookie?.split("=")[1])
        setRole(roleCookie?.split("=")[1])

        localStorage.setItem("accessToken", accessTokenCookie?.split("=")[1])
        localStorage.setItem("role", roleCookie?.split("=")[1])
      }

      // setAccessToken(accessTokenCookie?.split("=")[1])
      // setRole(roleCookie?.split("=")[1])
      // localStorage.setItem("accessToken", accessTokenCookie?.split("=")[1])
      // localStorage.setItem("role", roleCookie?.split("=")[1])

      // Now that we have stored the cookies in the store and local storage, we can delete the cookies.
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  }, [])

  useEffect(() => {
    if (selectedCategory !== "Uncategorized") {
      fetchProductByCategory(selectedCategory)
    } else {
      fetchProducts()
    }
  }, [selectedCategory])

  // The search functionality will only work on the products that are displayed on the screen and I am planning to dispaly only some products on the screen and as user scrolls, more products will be loaded. Thus, if the user searches for a product that is not displayed on the screen, it will not be found.
  // TODO: I will need to implement a search functionality that will search through all the products through the database and not just the ones displayed on the screen.

  return (
    <>
      <div className="bg-secondary pb-12">
        <div className="bg-primary rounded-bl-[70px] rounded-br-[70px]">
          <div className="flex items-center justify-center pt-10">
            <p className="text-white font-serif text-3xl justify-center text-center">
              Discover your cherished handmade decorations
            </p>
          </div>
          <div className="relative mt-4 flex justify-center">
            <span className="bg-grey1 pt-2 pl-3 rounded-l-md rounded-bl-md">
              <img src={search} alt="search" />
            </span>
            <span>
              <input
                type="text"
                placeholder="Search Here"
                className="pl-10 pr-4 py-2 bg-grey1 rounded-sm w-80 text-lg font-mono
              rounded-tr-md rounded-br-md focus:outline-none text-white
              "
                value={searchTerm}
                onChange={(e) => searchProducts(e.target.value)}
              />
            </span>
          </div>

          {/* buttons */}
          <div
            className="flex flex-row font-sans text-white space-x-4 justify-center items-center mt-7 text-xl
          pb-7"
          >
            {allCategories.map((category) => (
              <button
                key={category._id}
                className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
                  selectedCategory === category.name ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}

            {/* <button
              className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
                selectedCategory === "Popular" ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedCategory("Popular")}
            >
              Popular
            </button>
            <button
              className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
                selectedCategory === "Vase" ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedCategory("Vase")}
            >
              Vase
            </button>
            <button
              className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
                selectedCategory === "Pots" ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedCategory("Pots")}
            >
              Pots
            </button> */}
          </div>
        </div>
        <div className="flex flex-row space-x-7 font-sans text-justify p-5 mt-4">
          <p className="flex text-black font-medium flex-grow text-2xl">
            {selectedCategory}
          </p>
          <Link
            to="/all-products"
            className="flex text-grey1 text-base underline"
          >
            View All
          </Link>
        </div>

        <div className="p-4">
          <div className="flex overflow-x-auto whitespace-nowrap w-full gap-4">
            {
              // If there are no products, display a message.
              filteredProducts.length === 0 && (
                <p className="text-center text-black text-2xl">
                  No products found
                </p>
              )
            }

            {filteredProducts &&
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  src={product.images[0].url}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  id={product._id}
                />
              ))}
          </div>
        </div>
      </div>
      {/* <Nav /> */}
    </>
  )
}

export default Home
