import { useEffect, useState } from "react"
import { useOrderStore } from "../../store/orderStore"
import { useAuthStore } from "../../store/authStore"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { IoIosCheckmarkCircle } from "react-icons/io"

const API_URL = import.meta.env.VITE_API_URL

export const OrderDetail = () => {
  const navigate = useNavigate()

  const { orderId } = useParams()

  const { order, fetchOrder, setOrder } = useOrderStore()
  const { accessToken, role } = useAuthStore()

  const [selectedStatus, setSelectedStatus] = useState("")
  const possibleStatus = [
    "PLACED",
    "IN TRANSIT",
    "OUT FOR DELIVERY",
    "DELIVERED",
  ]
  const [indexOftemp, setIndexOftemp] = useState(null)
  // console.log(indexOftemp)
  // const [orderSummary, setOrderSummary] = useState({})

  // ! Uncomment this code to fetch the order details
  useEffect(() => {
    console.log(order)
    if (orderId) {
      fetchOrder(orderId)

      if (role != "customer") {
        setSelectedStatus(order?.status)
      }
      // setSelectedStatus(order?.status)
    }
  }, [])

  // if (role != "customer") {
  //   useEffect(() => {
  //     if (order) {
  //       setIndexOftemp(possibleStatus.indexOf(order.status))
  //     }
  //   }, [order])
  // }

  useEffect(() => {
    if (order) {
      setIndexOftemp(possibleStatus.indexOf(order.status))
    }
  }, [order])

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleStatusChange = (e) => {
    console.log(e.target.value)
    setIsEditing(true)
    setSelectedStatus(e.target.value)
  }

  const handleSave = () => {
    setIsEditing(false)
    setIsSaving(true)
    axios
      .put(
        `${API_URL}/orders/update/${orderId}`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        toast.success("Order status updated successfully")

        // Update the order status in the store
        setOrder({ ...order, status: selectedStatus })
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to update order status")
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSelectedStatus(order.status)
  }

  if (!order) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container mx-auto mt-3">
      <p>
        {/* //TODO: IF both routes for user dashboard and artisan dashboard for orders are merged, then remove this code and hardcode the link */}
        {/* <button onClick={() => navigate(-1)}>Back to All Orders</button> */}
      </p>

      <Toaster />

      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Arriving Thursday</h1>
          <Link to="/account/orders">
            <span className="text-blue-700 text-sm cursor-pointer">
              See all orders
            </span>
          </Link>
        </div>

        <div className="mt-3">
          <img
            src={order.product.images[0].url}
            alt="product"
            className="w-[100px] h-[100px] object-cover rounded-lg object-center"
          />
        </div>

        {/* Order status timeline */}
        <div className="mt-4">
          <h1 className="text-black font-semibold text-center text-xl">
            Placed
          </h1>

          <div className="grid grid-cols-4 mt-4">
            <div className="justify-self-center space-y-2 flex flex-col items-center">
              {order.status === "PLACED" || indexOftemp > 0 ? (
                <IoIosCheckmarkCircle className="text-[27px] text-accent" />
              ) : (
                <div className="w-6 h-6 rounded-full border-accent border"></div>
              )}
              <p className="text-sm text-center">Placed</p>
            </div>
            <div className="justify-self-center space-y-2 flex flex-col items-center">
              {order.status === "IN TRANSIT" || indexOftemp > 1 ? (
                <IoIosCheckmarkCircle className="text-[27px] text-accent" />
              ) : (
                <div className="w-6 h-6 rounded-full border-accent border"></div>
              )}
              <p className="text-sm text-center">In Transit</p>
            </div>
            <div className="justify-self-center space-y-2 flex flex-col items-center">
              {order.status === "OUT FOR DELIVERY" || indexOftemp > 2 ? (
                <IoIosCheckmarkCircle className="text-[27px] text-accent" />
              ) : (
                <div className="w-6 h-6 rounded-full border-accent border"></div>
              )}
              <p className="text-sm text-center">Out for Delivery</p>
            </div>
            <div className="justify-self-center space-y-2 flex flex-col items-center">
              {order.status === "DELIVERED" || indexOftemp > 3 ? (
                <IoIosCheckmarkCircle className="text-[27px] text-accent" />
              ) : (
                <div className="w-6 h-6 rounded-full border-accent border"></div>
              )}
              <p className="text-sm text-center">Delivered</p>
            </div>
          </div>
        </div>

        {/* Shipping INFO */}
        <div className="mt-4">
          <h1 className="font-bold text-lg">Shipping Address</h1>
          <p
            className="
          text-sm text-gray-600 mt-2
          "
          >
            Feature will be added soon.
          </p>
        </div>

        {/* Order INFO */}
        <div className="mt-4">
          <h1 className="font-bold text-xl">Order Details</h1>

          <div className=" mt-2">
            <div className="grid grid-cols-2">
              <p className="text-primary">Order date</p>
              <p>{new Date(order.createdAt).toLocaleDateString()} </p>
            </div>
            <div className="grid grid-cols-2 mt-[2px]">
              <p className="text-primary">Order ID</p>
              <p>
                {order._id.slice(0, 5) + "..." + order._id.slice(-5)}
                {/* {order._id} */}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-[2px]">
              <p className="text-primary">Quantity</p>
              <p>{order.purchasedQuantity}</p>
            </div>
            <div className="grid grid-cols-2 mt-[2px]">
              <p className="text-primary">Total</p>
              <p>
                Rs.
                {order.purchasedQuantity * order.product.price}
              </p>
            </div>
          </div>
        </div>

        {/* Payment INFO */}
        <div className="mt-4">
          <h1 className="font-bold text-xl">Payment Information</h1>

          <div className="mt-1">
            <div className="grid grid-cols-2">
              <p className="text-primary">Payment Method</p>
              <p>
                {order.paymentMode === "ONLINE" ? "Online" : "Cash on Delivery"}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Payment ID</p>
              <p>
                {/* {order.paymentId} */}
                {order.paymentId.slice(0, 7) +
                  "..." +
                  order.paymentId.slice(-7)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-4">
          <h1 className="font-bold text-xl">Order Summary</h1>

          <div className="mt-1">
            <div className="grid grid-cols-2">
              <p className="text-primary">Items</p>
              <p className="text-right">{order.purchasedQuantity} items</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Price (per item)</p>
              <p className="text-right">Rs. {order.product.price}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Total</p>
              <p className="text-right">
                Rs. {order.purchasedQuantity * order.product.price}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Delivery Charges</p>
              <p className="text-right">
                {order?.deliveryCharges ? order.deliveryCharges : "Rs. 0"}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Total (before tax)</p>
              <p className="text-right">
                Rs.{" "}
                {order?.totalBeforeTax ||
                  order.purchasedQuantity * order.product.price}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Tax @ 18%</p>
              <p className="text-right">{order?.tax ? order.tax : "Rs. 0"}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-primary">Total Payable</p>
              <p className="text-right">
                Rs.{" "}
                {order?.totalPayable ||
                  order.purchasedQuantity * order.product.price}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-black text-lg font-bold">Order Total:</p>
              <p className="text-accent text-lg font-bold text-right">
                Rs.{" "}
                {order?.totalPayable ||
                  order.purchasedQuantity * order.product.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                {role === "customer" ? (
                  <>
                    <p className="text-lg">{order.status}</p>
                  </>
                ) : (
                  <select
                    id="status"
                    name="status"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="PLACED" disabled={indexOftemp > 0}>
                      Placed
                    </option>
                    <option value="IN TRANSIT" disabled={indexOftemp > 1}>
                      In Transit
                    </option>
                    <option value="OUT FOR DELIVERY" disabled={indexOftemp > 2}>
                      Out for Delivery
                    </option>
                    <option value="DELIVERED" disabled={indexOftemp > 3}>
                      Delivered
                    </option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mb-3 w-full flex justify-end gap-4">
              <button
                className="bg-red-500 text-white  px-4 py-2 rounded-md  md:mt-0"
                onClick={handleCancel}
                disabled={isSaving || role === "customer"}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 text-white  px-4 py-2 rounded-md  md:mt-0"
                onClick={handleSave}
                disabled={isSaving || role === "customer"}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          )}

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
      </div> */}
    </div>
  )
}
