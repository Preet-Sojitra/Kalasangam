import React, { useEffect, useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Nav } from "../components/Nav"
import { toast, Toaster } from "react-hot-toast"
import { useProductsStore } from "../store/productsStore"
import { useAuthStore } from "../store/authStore"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

const API_URL = import.meta.env.VITE_API_URL

const BuyNow = () => {
  const location = useLocation()
  const { state } = location
  // console.log(state)

  const navigate = useNavigate()

  const { productId } = useParams()
  // console.log(productId)

  const { singleProduct, fetchSingleProduct } = useProductsStore()
  // console.log(singleProduct)

  useEffect(() => {
    fetchSingleProduct(productId)
  }, [])

  const { accessToken, role } = useAuthStore()
  // console.log(accessToken)
  // console.log(role)

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
    toast("Cash on Delivery is not available at the moment", {
      icon: "🚫",
    })
    // try {
    //   const cookie = document.cookie
    //     .split(";")
    //     .map((cookie) => cookie.split("="))
    //     .map((cookie) => ({ key: cookie[0].trim(), value: cookie[1] }))
    //   // console.log(cookie)

    //   const userId = cookie.find((cookie) => cookie.key === "userId")?.value

    //   // Simulate a delay for demonstration purposes (replace with actual logic)
    //   setTimeout(async () => {
    //     console.log("Cash on Delivery successful")

    //     // Example: Make an API call for Cash on Delivery
    //     await axios.post(`${API_URL}/cod`, {
    //       products: [
    //         {
    //           id: state.id,
    //           artisian: state.artisian,
    //           qty: state.quantity,
    //         },
    //       ],
    //       customer: userId, // Replace with actual customer ID
    //     })

    //     // Redirect to a thank you page or handle the success message
    //     toast.success("order placed")
    //   }, 2000)
    // } catch (error) {
    //   console.error("Error processing Cash on Delivery:", error.message)
    // }
  }

  if (!singleProduct) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-8">
        <Toaster />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Back button */}
          <div className="flex items-center px-6 py-4 gap-3">
            <FiArrowLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Confirm Purchase
            </h1>
            <div className="w-8"></div> {/* Placeholder for spacing */}
          </div>
          {/* Rest of the code */}
          <div className="px-6 py-8">
            {/* Product image */}
            <div className="mb-6">
              <img
                src={singleProduct.images[0].url}
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            {/* Product details */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg">{singleProduct.name}</p>
                <p className="text-lg font-semibold">
                  Rs. {singleProduct.price}
                </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-black font-medium">
                  Quantity: {state.quantity}
                </p>
                <p className="text-sm text-black">
                  Total: Rs. {singleProduct.price * state.quantity}
                </p>
              </div>
              {/* Additional order details */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Delivery Charges:</p>
                <p className="text-sm text-gray-600">Free</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Before Tax:</p>
                <p className="text-sm text-gray-600">
                  Rs.
                  {singleProduct.price * state.quantity}
                </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Tax:</p>
                <p className="text-sm text-gray-600">Rs. 0.00</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg  text-black font-semibold">
                  Total Payable:
                </p>
                <p className="text-lg text-black font-semibold">
                  Rs. {singleProduct.price * state.quantity}
                </p>
              </div>
            </div>
            {/* Shipping address */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
              <div className="border border-gray-300 rounded-md p-4">
                {/* Predefined address */}
                <div className="mb-2">
                  <p className="text-gray-600 mb-1">
                    Your default shipping address
                  </p>
                  <p className="text-lg">123 Street Name, City, Country</p>
                </div>
                {/* Edit option */}
                <button
                  className=" text-white px-4 py-1 rounded-md
                bg-accent hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
                "
                  onClick={() =>
                    toast("Edit Address is not available at the moment", {
                      icon: "🚫",
                    })
                  }
                >
                  Edit Address
                </button>
              </div>
            </div>
            {/* Payment options */}
            <div className="flex flex-col sm:flex-row justify-between mb-6">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md mb-2 sm:mb-0">
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
                  Online Payment
                </Link>
              </button>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-md"
                onClick={handleCashOnDelivery}
              >
                Cash on Delivery
              </button>
            </div>
          </div>
        </div>
        <Nav />
      </div>
    </>
  )

  // return (
  //   <div className="container mx-auto">
  //     <Toaster />
  //     <h2 className="mb-4 text-center bg-accent rounded-bl-2xl rounded-br-2xl text-3xl text-black font-bold font-serif pt-2 pb-2">
  //       Confirm Purchase
  //     </h2>
  //     <div className="flex flex-col justify-center items-center">
  //       <div className="flex items-center p-3">
  //         <img
  //           src={singleProduct.images[0].url}
  //           alt={singleProduct.name}
  //           className="mr-4 w-24 h-24"
  //         />
  //         <div>
  //           <h3 className="mb-1 text-xl font-semibold">{singleProduct.name}</h3>
  //           <p className="text-black text-2xl font-semibold">
  //             Quantity: Rs.{state.quantity}
  //           </p>
  //           <p className="text-black text-2xl font-semibold">
  //             Price each: Rs.{singleProduct.price}
  //           </p>
  //           <p className="text-black text-2xl font-semibold">
  //             Price: Rs.{singleProduct.price * state.quantity}
  //           </p>
  //         </div>
  //       </div>

  //       {/* Display more product information if needed */}
  //       <div className="flex justify-center">
  //         <Link
  //           to={`/buynow/${productId}/checkout`}
  //           state={{
  //             product: {
  //               id: productId,
  //               purchasedQuantity: state.quantity,
  //               totalPrice: singleProduct.price * state.quantity,
  //             },
  //           }}
  //         >
  //           <button className="bg-accent text-white rounded-lg py-2 px-6 font-bold hover:bg-green-600">
  //             Pay Online
  //           </button>
  //         </Link>
  //       </div>
  //       <br></br>
  //       <div className="flex justify-center">
  //         {/* Add a function for Cash on Delivery */}
  //         <button
  //           onClick={handleCashOnDelivery}
  //           className="bg-accent text-white rounded-lg py-2 px-6 font-bold hover:bg-green-600"
  //         >
  //           Cash on Delivery
  //         </button>
  //       </div>
  //     </div>
  //     <Nav />
  //   </div>
  // )
}

export default BuyNow
