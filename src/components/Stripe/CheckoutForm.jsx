import React, { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useParams, useLocation } from "react-router"
import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router"

const API_URL = import.meta.env.VITE_API_URL

export const CheckoutForm = () => {
  const location = useLocation()

  const {
    state: { product },
  } = location
  // console.log(product)

  const { productId } = useParams()
  // console.log(productId)

  const { accessToken } = useAuthStore()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()
  // console.log(stripe, elements)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleStripePayment = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (!error) {
      console.log("Stripe 23 | token generated", paymentMethod)

      try {
        const { id } = paymentMethod

        const res = await axios.post(
          `${API_URL}/payment/checkout/online`,
          {
            product: {
              id: productId,
              purchasedQuantity: product.purchasedQuantity,
              totalPrice: product.totalPrice,
            },
            payment: {
              id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log(res.data)
        // Redirect to payment success page
        if (res.status === 200) {
          console.log("Payment successful")
          navigate("/payment/success")
        }
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    } else {
      console.log(error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <div className="bg-white w-96 shadow-lg rounded-lg p-8">
        <button
          className="text-gray-500 text-sm mb-4"
          onClick={() => navigate(-1)}
        >
          &lt; Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">Secure Checkout</h1>
        <form onSubmit={handleStripePayment}>
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="card-element"
            >
              Card Details
            </label>
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out"
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {error && (
            <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
          )}
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Your payment information is securely processed by Stripe.
        </p>
      </div>
    </div>

    // <div className="flex justify-center items-center h-screen px-6">
    //   <div className="w-96">
    //     <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
    //     <form onSubmit={handleStripePayment}>
    //       <div className="mb-4">
    //         <label
    //           className="block text-sm font-bold mb-2"
    //           htmlFor="card-element"
    //         >
    //           Card Details
    //         </label>
    //         <CardElement
    //           id="card-element"
    //           options={{
    //             style: {
    //               base: {
    //                 fontSize: "16px",
    //                 color: "#424770",
    //                 "::placeholder": {
    //                   color: "#aab7c4",
    //                 },
    //               },
    //               invalid: {
    //                 color: "#9e2146",
    //               },
    //             },
    //           }}
    //         />
    //       </div>
    //       <button
    //         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //         type="submit"
    //         disabled={!stripe || loading}
    //       >
    //         {loading ? "Processing..." : "Pay"}
    //       </button>
    //       {error && (
    //         <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
    //       )}
    //     </form>
    //   </div>
    // </div>
  )
}
