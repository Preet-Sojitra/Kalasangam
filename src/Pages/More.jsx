import React, { useEffect } from "react"
import { useProductsStore } from "../store/productsStore"
import { Link } from "react-router-dom"

export const More = () => {
  const categories = [
    {
      name: "Mobile, Electronics, etc",
      img: "https://images.unsplash.com/photo-1625467096769-fefb5ebdb54c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9iaWxlJTIwYW5kJTIwZWxlY3Ryb25pY3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Groceries & Essentials",
      img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww",
    },
    {
      name: "Music, Books & Stationery",
      img: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Fashion & Beauty",
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Home & Lifestyle",
      img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWUlMjBhbmQlMjBsaWZlc3R5bGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Sports & Fitness",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
    },
  ]

  const { fetchCategories, allCategories } = useProductsStore()
  // console.log(allCategories)

  useEffect(() => {
    fetchCategories()
  }, [])

  if (allCategories.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* Search bar */}
      <div className="flex justify-center w-full mt-2">
        <input
          type="text"
          placeholder="Search Kalasangam.in"
          className="h-12 border border-gray-300 rounded-md px-3 w-full"
        />
      </div>

      <div className="grid grid-cols-2 justify-between gap-x-2 mt-3 min-h-full gap-y-4">
        {/* Card like structure */}
        {allCategories.map((category, index) => {
          // If category name is undefined, then skip this iteration
          if (category.name !== "Uncategorized") {
            return (
              <Link
                to={`/all-products/${category._id}`}
                key={index}
                className="bg-white border-black border rounded-md relative h-[180px]"
              >
                <div>
                  <h1 className=" px-3 pt-4  pb-2">{category.name}</h1>

                  <div className="w-full absolute bottom-0">
                    {/* // ! FIX: THESE IMAGES NEED TO BE RELEVANT TO CATEGORIES */}
                    <img
                      src={
                        categories[
                          Math.floor(Math.random() * categories.length)
                        ].img
                      }
                      alt="Mobile"
                      className="w-full h-[90px] rounded-tl-[85px] rounded-tr-[85px] object-cover object-center"
                    />
                  </div>
                </div>
              </Link>
            )
          }
        })}
      </div>

      <div className="mt-4 my-10">
        <p>
          More Categories coming soon. Till then, explore the existing ones.
          <br />
          Happy Shopping!
        </p>
      </div>
    </>
  )
}
