import { useEffect } from "react"
import { useOrderStore } from "../../store/orderStore"
import { useParams } from "react-router-dom"

export const OrderDetail = () => {
  const { orderId } = useParams()

  const { order, fetchOrder } = useOrderStore()

  useEffect(() => {
    fetchOrder(orderId)
  }, [])

  if (!order) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Order Detail</h1>

          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="md:w-1/2">
              <h1 className="text-xl font-bold mb-2">Order ID:</h1>
              <p className="text-lg">{order._id}</p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h1 className="text-xl font-bold mb-2">Payment Mode:</h1>
              <p className="text-lg">{order.paymentMode}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="md:w-1/2">
              <h1 className="text-xl font-bold mb-2">Product Name:</h1>
              <p className="text-lg">{order.product.name}</p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h1 className="text-xl font-bold mb-2">Status:</h1>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="placed">Placed</option>
                  <option value="intransit">In Transit</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="md:w-1/2">
              <h1 className="text-xl font-bold mb-2">Quantity:</h1>
              <p className="text-lg">{order.purchasedQuantity}</p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h1 className="text-xl font-bold mb-2">Price:</h1>
              <p className="text-lg">
                {order.purchasedQuantity * order.product.price}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-xl font-bold mb-2">Product Image:</h1>
            <img
              src={order.product.images[0].url}
              alt={order.product.name}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
