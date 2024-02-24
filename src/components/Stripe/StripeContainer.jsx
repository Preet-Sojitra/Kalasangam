import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import BuyNow from "../../Pages/BuyNow"
import { CheckoutForm } from "./CheckoutForm"

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export const StripeContainer = ({ children }) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  )
}
