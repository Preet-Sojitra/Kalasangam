import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import account from "../assets/account.svg"
import { FiChevronLeft } from "react-icons/fi"
import { ProductInfo } from "../components/Products/ProductInfo"

const AR = () => {
  const location = useLocation()
  const { state } = location
  console.log(state)

  // const params = useParams()
  // const { productId } = params

  const navigate = useNavigate()

  return (
    <div className="bg-secondary">
      <div className="flex justify-between items-center mb-4 px-4  pt-4">
        <FiChevronLeft
          className="text-3xl text-black cursor-pointer"
          onClick={() => {
            navigate(-1) // Go back to previous page
          }}
        />
      </div>

      <div className="w-screen">
        <model-viewer
          alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
          src={`/models/ar-65759f90269186fc102b4e30.glb`}
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          class="w-full h-[200px]"
        ></model-viewer>
      </div>

      <ProductInfo
        id={state.id}
        name={state.name}
        state={state}
        description={state.description}
        price={state.price}
        showTryButton={false}
        availableQuantity={state.availableQuantity}
      />
    </div>
  )
}
export default AR
