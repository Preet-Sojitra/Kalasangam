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
      {/* SIMPLE TABULAR LAYOUT */}
      {/* <div className="container mx-auto">
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
      </div> */}

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-5">Your Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-4">
            <div className="flex justify-between bg-gray-200 px-4 py-2 rounded-lg">
              <p className="text-lg font-semibold">Order ID</p>
              <p className="text-lg font-semibold">Date</p>
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">Status</p>
            </div>
          </div>
          {/* Orders List */}
          <div className="col-span-1 md:col-span-4">
            {/* Iterate over orders */}
            {myOrders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between bg-white shadow-md rounded-lg"
              >
                <div className="px-4 py-2">
                  <Link
                    to={`/dashboard/orders/${order._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {order._id.slice(0, 5) + "..." + order._id.slice(-5)}
                  </Link>
                </div>
                <div className="px-4 py-2">
                  <p className="text-lg font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-lg font-semibold">
                    $
                    {(order.purchasedQuantity * order.product.price).toFixed(2)}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-lg font-semibold">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
