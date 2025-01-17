// import React, { useEffect, useState } from "react"
// import { Link, useParams } from "react-router-dom"
// import { BsCartFill } from "react-icons/bs"
// import { useCart } from "../CartContext"
// import axios from "axios"
// import toast, { Toaster } from "react-hot-toast"

// const API_URL = import.meta.env.VITE_API_URL

// export const ProductInfo = ({
//   id,
//   name,
//   description,
//   price,
//   state,
//   showTryButton,
//   availableQuantity,
// }) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [customerId, setCustomerId] = useState("")
//   const [isAddedToCart, setIsAddedToCart] = useState(false)
//   const [selectedMore, setSelectedMore] = useState(false)

//   const params = useParams()
//   const { productId } = params

//   useEffect(() => {
//     // set from cookie
//     const cookie = document.cookie
//       .split(";")
//       .map((cookie) => cookie.split("="))
//       .map((cookie) => ({ key: cookie[0].trim(), value: cookie[1] }))
//     // console.log(cookie)

//     const customerCookie = cookie.find((cookie) => cookie.key === "userId")
//     // console.log(customerCookie)

//     if (customerCookie) {
//       setCustomerId(customerCookie.value)
//     }
//   }, [])

//   const [quantity, setQuantity] = useState(1)
//   // const { dispatch } = useCart()
//   const incrementQuantity = () => {
//     setQuantity(quantity + 1)

//     if (quantity >= availableQuantity) {
//       toast.error("Cannot add more than available quantity")
//       setSelectedMore(true)
//     }
//   }

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1)

//       if (quantity <= availableQuantity) {
//         setSelectedMore(false)
//       }
//     }
//   }
//   const addToCart = async () => {
//     // console.log(customerId)
//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${API_URL}/cart/add`, {
//         customer: customerId,
//         productId: productId,
//       })
//       const { data } = response
//       console.log(data)
//       setIsLoading(false)
//       toast.success("Added to cart")
//       setIsAddedToCart(true)
//     } catch (error) {
//       console.log("Error adding to cart")
//       console.log(error)
//       toast.error("Error adding to cart")
//       setIsLoading(false)
//     }

//     // dispatch({
//     //   type: 'ADD_TO_CART',
//     //   payload:{ id,
//     //     name,
//     //     quantity,
//     //     price: state.price,
//     //     image: state.image, }

//     // })
//   }

//   return (
//     <>
//       <div>
//         <Toaster />
//       </div>
//       <div className="mt-10 text-black">
//         <div className="bg-white rounded-tl-[3rem] rounded-tr-[3rem] shadow-black mt-4 p-3 h-full">
//           <div className="flex justify-between gap-2 items-start">
//             <h1 className="text-3xl font-semibold mb-2 p-2 mt-4 flex font-sans">
//               {name}
//             </h1>

//             {showTryButton && (
//               <Link
//                 to={`/product/${productId}/ar`}
//                 className="border mt-5 border-accent shadow-sm shadow-black text-black text-sm rounded-lg p-2 mr-4 w-[50%] text-center"
//                 state={{
//                   id: id,
//                   name: name,
//                   description: description,
//                   price: price,
//                 }}
//               >
//                 Try Now
//               </Link>
//             )}
//           </div>
//           <p className="text-xl font-sans mb-2 p-2">{description}</p>
//           <p>Available Quantity: {availableQuantity}</p>
//           <div className="flex items-center space-x-30 text-2xl p-2 mt-4">
//             <p className="mr-4 flex">Quantity</p>
//             <div className="flex gap-1">
//               <button
//                 onClick={decrementQuantity}
//                 className="bg-gray-300 text-gray-700 px-[14px] py-1 rounded-full focus:outline-none"
//               >
//                 -
//               </button>
//               <span className="mx-2">{quantity}</span>
//               <button
//                 onClick={incrementQuantity}
//                 className="bg-gray-300 text-gray-700  px-[14px] py-1 rounded-full focus:outline-none"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-row mt-6 items-center justify-between px-2">
//             <div>
//               <h1 className="text-[#999999]">Price</h1>
//               <p className="mb-4 text-2xl font-bold text-accent">Rs.{price}</p>
//             </div>
//           </div>
//           <div className="flex flex-row space-x-8 pb-16">
//             <Link to="/buynow" state={state}>
//               <div className="bg-accent text-xl font-medium rounded-md p-2 flex items-center gap-2">
//                 <BsCartFill />
//                 Order Now
//               </div>
//             </Link>

//             <button
//               className={`bg-accent  text-xl font-medium rounded-md p-2 flex items-center gap-2
//               ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
//               ${isAddedToCart ? "opacity-70 cursor-not-allowed" : ""}
//               ${selectedMore ? "opacity-70 cursor-not-allowed" : ""}
//               `}
//               onClick={addToCart}
//               disabled={isLoading || isAddedToCart || selectedMore}
//             >
//               <BsCartFill />
//               {isLoading
//                 ? "Adding to cart"
//                 : isAddedToCart
//                 ? "Added to cart"
//                 : "Add to cart"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BsCartFill } from "react-icons/bs"
import { useCart } from "../CartContext"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../../store/authStore"

const API_URL = import.meta.env.VITE_API_URL

export const ProductInfo = ({
  id,
  name,
  description,
  price,
  showTryButton,
  availableQuantity,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [customerId, setCustomerId] = useState("")
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedMore, setSelectedMore] = useState(false)

  const params = useParams()
  const { productId } = params

  // const { isUserLoggedIn, checkIsUserLoggedIn } = useAuthStore()
  // console.log(isUserLoggedIn ? "User is Logged in" : "User is Not logged in")

  // useEffect(() => {
  //   checkIsUserLoggedIn()
  // }, [isUserLoggedIn])

  const { accessToken } = useAuthStore()

  //TODO: CHECK IF THIS IS REQUIRED OR NOT
  // useEffect(() => {
  //   // set from cookie
  //   const cookie = document.cookie
  //     .split(";")
  //     .map((cookie) => cookie.split("="))
  //     .map((cookie) => ({ key: cookie[0].trim(), value: cookie[1] }))
  //   // console.log(cookie)

  //   const customerCookie = cookie.find((cookie) => cookie.key === "userId")
  //   // console.log(customerCookie)

  //   if (customerCookie) {
  //     setCustomerId(customerCookie.value)
  //   }
  // }, [])

  const [isProductOutOfStock, setIsProductOutOfStock] = useState(
    availableQuantity === 0
  )

  const [quantity, setQuantity] = useState(isProductOutOfStock ? 0 : 1)
  // const { dispatch } = useCart()
  const incrementQuantity = () => {
    // setQuantity(quantity + 1)
    // console.log("quantity inside increment", quantity)

    // if (quantity > availableQuantity) {
    //   toast.error("Cannot add more than available quantity")
    //   setSelectedMore(true)
    // }

    setQuantity((prev) => {
      if (prev < availableQuantity) {
        return prev + 1
      } else {
        return prev
      }
    })

    if (quantity >= availableQuantity) {
      toast.error("Cannot add more than available quantity")
      setSelectedMore(true)
    }
  }
  // console.log(quantity)

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (quantity <= availableQuantity) {
        setSelectedMore(false)
      }
    }
  }
  const addToCart = async () => {
    toast("This feature is not available right now.", {
      icon: "🥲",
    })

    // console.log(customerId)
    // setIsLoading(true)
    // try {
    //   const response = await axios.post(`${API_URL}/cart/add`, {
    //     customer: customerId,
    //     productId: productId,
    //   })
    //   const { data } = response
    //   console.log(data)
    //   setIsLoading(false)
    //   toast.success("Added to cart")
    //   setIsAddedToCart(true)
    // } catch (error) {
    //   console.log("Error adding to cart")
    //   console.log(error)
    //   toast.error("Error adding to cart")
    //   setIsLoading(false)
    // }

    // dispatch({
    //   type: 'ADD_TO_CART',
    //   payload:{ id,
    //     name,
    //     quantity,
    //     price: state.price,
    //     image: state.image, }

    // })
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="mt-10 text-black">
        <div className="bg-white rounded-tl-[3rem] rounded-tr-[3rem] shadow-black mt-4 p-3 h-full">
          <div className="flex justify-between gap-2 items-start">
            <h1 className="text-3xl font-semibold mb-2 p-2 mt-4 flex font-sans">
              {name}
            </h1>

            {showTryButton && (
              <Link
                to={`/product/${productId}/ar`}
                className="border mt-5 border-accent shadow-sm shadow-black text-black text-sm rounded-lg p-2 mr-4 w-[50%] text-center"
                state={{
                  id: id,
                  name: name,
                  description: description,
                  price: price,
                  availableQuantity: availableQuantity,
                }}
              >
                Try Now
              </Link>
            )}
          </div>
          <p className="text-xl font-sans mb-2 p-2">{description}</p>

          {isProductOutOfStock && (
            <p className="text-red-500 font-medium text-2xl">
              Product is out of stock
            </p>
          )}

          <div className="flex items-center space-x-30 text-2xl mt-4">
            <p className="mr-4 flex">Quantity</p>
            <div className="flex gap-1">
              <button
                onClick={decrementQuantity}
                className={`bg-gray-300 text-gray-700 px-[14px] py-1 rounded-full focus:outline-none
                ${
                  isProductOutOfStock || quantity === 1
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }
                
                `}
                disabled={isProductOutOfStock || quantity === 1}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>

              <button
                onClick={incrementQuantity}
                className={`bg-gray-300 text-gray-700  px-[14px] py-1 rounded-full focus:outline-none
                ${
                  selectedMore || isProductOutOfStock
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }
                `}
                disabled={selectedMore || isProductOutOfStock}
              >
                +
              </button>
            </div>
          </div>
          <p className="mt-2">Available Quantity: {availableQuantity}</p>
          <div className="flex flex-row mt-6 items-center justify-between px-2">
            <div>
              <h1 className="text-[#999999]">Price</h1>
              <p className="text-2xl font-bold text-accent">Rs.{price}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between px-2 mt-2 mb-5">
            <h1 className="text-[#999999] text-2xl">
              Total Price:
              <span className="text-2xl ml-2 font-bold text-accent">
                Rs. {quantity * price}
              </span>
            </h1>
          </div>

          <div className="flex flex-row space-x-8 pb-16">
            {accessToken ? (
              // IF USER IS LOGGED IN
              <Link
                to={isProductOutOfStock ? "#" : `/buynow/${productId}`}
                state={{
                  quantity: quantity,
                }}
              >
                <div
                  className={`bg-accent text-xl font-medium rounded-md p-2 flex items-center gap-2
                ${isProductOutOfStock ? "opacity-70 cursor-not-allowed" : ""}
                `}
                >
                  <BsCartFill />
                  Order Now
                </div>
              </Link>
            ) : (
              // IF USER IS NOT LOGGED IN
              <Link
                to={isProductOutOfStock ? "#" : "/auth/get-started/login"}
                //TODO: TACKLE THIS LATER
                // state={{
                //   from: `/buynow/${productId}`,
                //   quantity: quantity,
                // }}
              >
                <div
                  className={`bg-accent text-xl font-medium rounded-md p-2 flex items-center gap-2
                ${isProductOutOfStock ? "opacity-70 cursor-not-allowed" : ""}
                `}
                >
                  <BsCartFill />
                  Order Now
                </div>
              </Link>
            )}

            <button
              className={`bg-accent  text-xl font-medium rounded-md p-2 flex items-center gap-2
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              ${isAddedToCart ? "opacity-70 cursor-not-allowed" : ""}
              ${
                selectedMore || isProductOutOfStock
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }
              `}
              onClick={addToCart}
              disabled={
                isLoading ||
                isAddedToCart ||
                selectedMore ||
                isProductOutOfStock
              }
            >
              <BsCartFill />
              {isLoading
                ? "Adding to cart"
                : isAddedToCart
                ? "Added to cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
