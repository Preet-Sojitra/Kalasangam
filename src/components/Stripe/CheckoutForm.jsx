import React from "react"
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
  console.log(product)

  const { productId } = useParams()
  console.log(productId)

  const { accessToken } = useAuthStore()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const handleStripePayment = async (e) => {
    e.preventDefault()

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
      }
    } else {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleStripePayment}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </>
  )
}
