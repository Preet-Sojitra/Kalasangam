import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { Nav } from "../components/Nav"
import { toast, Toaster } from "react-hot-toast"
import { useProductsStore } from "../store/productsStore"
import { useAuthStore } from "../store/authStore"
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const BuyNow = () => {
  const location = useLocation()
  const { state } = location
  // console.log(state)

  const { productId } = useParams()
  // console.log(productId)

  const { singleProduct, fetchSingleProduct } = useProductsStore()

  useEffect(() => {
    fetchSingleProduct(productId)
  }, [])

  const { accessToken, role } = useAuthStore()
  console.log(accessToken)
  console.log(role)

  if (!accessToken) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    )
  }

  // console.log("singleProduct")
  // console.log(singleProduct)

  const handleCashOnDelivery = async () => {
    try {
      const cookie = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .map((cookie) => ({ key: cookie[0].trim(), value: cookie[1] }))
      // console.log(cookie)

      const userId = cookie.find((cookie) => cookie.key === "userId")?.value

      // Simulate a delay for demonstration purposes (replace with actual logic)
      setTimeout(async () => {
        console.log("Cash on Delivery successful")

        // Example: Make an API call for Cash on Delivery
        await axios.post(`${API_URL}/cod`, {
          products: [
            {
              id: state.id,
              artisian: state.artisian,
              qty: state.quantity,
            },
          ],
          customer: userId, // Replace with actual customer ID
        })

        // Redirect to a thank you page or handle the success message
        toast.success("order placed")
      }, 2000)
    } catch (error) {
      console.error("Error processing Cash on Delivery:", error.message)
    }
  }

  if (!singleProduct) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container mx-auto">
      <Toaster />
      <h2 className="mb-4 text-center bg-accent rounded-bl-2xl rounded-br-2xl text-3xl text-black font-bold font-serif pt-2 pb-2">
        Confirm Purchase
      </h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center p-3">
          <img
            src={singleProduct.images[0].url}
            alt={singleProduct.name}
            className="mr-4 w-24 h-24"
          />
          <div>
            <h3 className="mb-1 text-xl font-semibold">{singleProduct.name}</h3>
            <p className="text-black text-2xl font-semibold">
              Quantity: Rs.{state.quantity}
            </p>
            <p className="text-black text-2xl font-semibold">
              Price each: Rs.{singleProduct.price}
            </p>
            <p className="text-black text-2xl font-semibold">
              Price: Rs.{singleProduct.price * state.quantity}
            </p>
          </div>
        </div>

        {/* Display more product information if needed */}
        <div className="flex justify-center">
          <Link
            to={`/buynow/${productId}/checkout`}
            state={{
              product: {
                id: productId,
                purchasedQuantity: state.quantity,
                totalPrice: singleProduct.price * state.quantity,
              },
            }}
          >
            <button className="bg-accent text-white rounded-lg py-2 px-6 font-bold hover:bg-green-600">
              Pay Online
            </button>
          </Link>
        </div>
        <br></br>
        <div className="flex justify-center">
          {/* Add a function for Cash on Delivery */}
          <button
            onClick={handleCashOnDelivery}
            className="bg-accent text-white rounded-lg py-2 px-6 font-bold hover:bg-green-600"
          >
            Cash on Delivery
          </button>
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default BuyNow
