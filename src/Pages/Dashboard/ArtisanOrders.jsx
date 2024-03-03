import React, { useEffect } from "react"
import { useOrderStore } from "../../store/orderStore"
import { Link } from "react-router-dom"

export const ArtisanOrders = () => {
  const { artisanOrders, fetchArtisanOrders } = useOrderStore()

  useEffect(() => {
    fetchArtisanOrders()
  }, [])

  if (artisanOrders.length === 0) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your All Orders</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Payment Mode</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {artisanOrders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border px-4 py-2">
                  <Link to={`/dashboard/allorders/${order._id}`}>
                    {order._id.slice(0, 5) + "..." + order._id.slice(-5)}
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{order.product.name}</td>
                <td className="border px-4 py-2">{order.purchasedQuantity}</td>
                <td className="border px-4 py-2">
                  {order.purchasedQuantity * order.product.price}
                </td>
                <td className="border px-4 py-2">{order.paymentMode}</td>
                <td className="border px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
