import React from "react"
import { FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"

// This is component for product card. The cards are shown in Home Page.

const ProductCard = (props) => {
  // console.log(props)
  return (
    <>
      <div className="rounded-md bg-white self-start font-sans">
        <div className="p-4 mb-4">
          <div className="w-56">
            <Link to={`/product/${props.id}`}>
              <img
                src={props.src}
                alt="products"
                className="w-56 h-52 md:mx-auto mb-2 rounded-md object-cover"
              />
            </Link>
            <h4 className="text-lg font-semibold whitespace-normal text-black">
              {props.name}
            </h4>
            <p
              className="text-sm mt-2 whitespace-normal
            line-clamp-3 overflow-hidden text-grey3
            "
            >
              {props.description}
            </p>
          </div>
        </div>

        <div className="flex bg-grey2 items-center justify-between px-4 py-2 rounded-tl-3xl rounded-tr-3xl shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.25)]">
          <h4 className="text-accent font-medium">Rs.{props.price}</h4>
          <div className="bg-accent rounded-full px-1 py-1">
            <Link to={`/product/${props.id}`} state={props}>
              <FiChevronRight className="text-2xl text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
