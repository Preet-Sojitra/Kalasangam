import React, { useEffect } from "react"
import { useOrderStore } from "../../store/orderStore"
import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export const Orders = () => {
  const navigate = useNavigate()

  const { accessToken } = useAuthStore()
  const { myOrders, fetchMyOrders } = useOrderStore()

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/get-started/login")
    } else {
      fetchMyOrders()
    }
  }, [])

  console.log(myOrders)

  return (
    <>
      {/* Generate layout for your orders */}
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-5">Your Orders</h1>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="w-1/4">
              <p className="text-lg font-semibold">Order ID</p>
            </div>
            <div className="w-1/4">
              <p className="text-lg font-semibold">Date</p>
            </div>
            <div className="w-1/4">
              <p className="text-lg font-semibold">Total</p>
            </div>
            <div className="w-1/4">
              <p className="text-lg font-semibold">Status</p>
            </div>
          </div>
          {myOrders.map((order) => (
            <div key={order._id} className="flex flex-row justify-between">
              <div className="w-1/4">
                <Link to={`/dashboard/orders/${order._id}`}>
                  <p className="text-lg font-semibold">
                    {order._id.slice(0, 5) + "..." + order._id.slice(-5)}
                  </p>
                </Link>
              </div>
              <div className="w-1/4">
                <p className="text-lg font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="w-1/4">
                <p className="text-lg font-semibold">
                  {order.purchasedQuantity * order.product.price}
                </p>
              </div>
              <div className="w-1/4">
                <p className="text-lg font-semibold">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
