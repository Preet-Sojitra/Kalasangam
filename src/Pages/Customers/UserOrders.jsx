import React, { useEffect } from "react"
import { useOrderStore } from "../../store/orderStore"
import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa6"

export const UserOrders = () => {
  const navigate = useNavigate()

  const { accessToken } = useAuthStore()
  const { myOrders, fetchMyOrders } = useOrderStore()

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/get-started/login")
    } else {
      console.log("fetching orders")
      fetchMyOrders()
    }
  }, [navigate])

  console.log(myOrders)

  const arriving = [
    "Today",
    "Tomorrow",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

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
        <h1 className="text-2xl font-bold text-center my-2">Your Orders</h1>

        {/* Searchbar to search order */}
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Search all orders..."
            className="px-4 py-2 rounded-lg w-full"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>

        <div className="mt-8 space-y-5">
          {myOrders.map((order) => (
            <Link to={`${order._id}`} key={order._id} className="block">
              <div key={order._id} className="grid grid-cols-custom-3 gap-2">
                <div className="h-[100px]">
                  <img
                    src={order.product.images[0].url}
                    alt="product"
                    className="h-full w-full object-cover rounded-lg object-center"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-green-800 font-semibold text-lg">
                    Arriving{" "}
                    {arriving[Math.floor(Math.random() * arriving.length)]}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <FaChevronRight className="text-xl cursor-pointer" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <p className="text-center text-lg font-thin mt-7 text-gray-500">
            You have reached the end of your orders.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-4">
            <div className="flex justify-between bg-gray-200 px-4 py-2 rounded-lg">
              <p className="text-lg font-semibold">Order ID</p>
              <p className="text-lg font-semibold">Date</p>
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">Status</p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4">
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
        </div> */}
      </div>
    </>
  )
}
