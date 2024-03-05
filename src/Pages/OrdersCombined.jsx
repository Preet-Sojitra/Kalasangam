import React from "react"
import { useAuthStore } from "../store/authStore"
import { Orders } from "./User/Orders"
import { ArtisanOrders } from "./Dashboard/ArtisanOrders"

export const OrdersCombined = () => {
  const { accessToken, role } = useAuthStore()

  return <>{role === "customer" ? <Orders /> : <ArtisanOrders />}</>
}
