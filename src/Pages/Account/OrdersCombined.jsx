import React from "react"
import { useAuthStore } from "../../store/authStore"
import { UserOrders } from "../Customers/UserOrders"
import { ArtisanOrders } from "../Artisans/ArtisanOrders"

export const OrdersCombined = () => {
  const { accessToken, role } = useAuthStore()

  return <>{role === "customer" ? <UserOrders /> : <ArtisanOrders />}</>
}
