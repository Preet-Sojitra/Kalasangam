import React, { useState } from "react"

export const ProductImage = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)

  // console.log(images)
  return (
    <>
      <div className="flex flex-nowrap overflow-x-hidden mx-4 mb-4">
        {
          <img
            key={images[currentImage].asset_id}
            src={images[currentImage].secure_url}
            alt="product"
            className=" h-72 rounded-md w-full object-cover"
          />
        }

        {/* //? FIND OUT: Can we make it slidable? */}
        {/* {images.map((image) => {
          return (
            <img
              key={image.asset_id}
              src={image.secure_url}
              alt="product"
              className=" h-72 rounded-md w-full object-cover"
            />
          )
        })} */}
      </div>

      {/* Buttons to change images */}
      <div className="flex justify-center space-x-4">
        {images.map((image, index) => {
          return (
            <button
              key={image.asset_id}
              className={`rounded-full w-4 h-4 border-2 border-accent
              ${index === currentImage ? "bg-accent" : ""}
              `}
              onClick={() => setCurrentImage(index)}
            ></button>
          )
        })}
      </div>
    </>
  )
}
