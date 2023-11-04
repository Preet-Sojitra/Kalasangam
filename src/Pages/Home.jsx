import React, { useState } from "react"
import NavBar from "../components/NavBar"
import search from "../assets/search.svg"
import Pots from "../components/Pots"
import SingleProduct from "../components/SingleProduct.jsx"
import Vase from "../components/Vase.jsx"
import Popular from "../components/Popular"
import product from "../assets/product1.jpeg"
import { Link } from "react-router-dom"

const products = [
  {
    id: "1",
    name: "Product 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante nec ligula volutpat bibendum. Mauris quis est vel ex ultricies fermentum.",
    price: 324,
    img: "/src/assets/product1.jpeg",
  },
  {
    id: "2",
    name: "Product 2",
    desc: "Description 2",
    price: 324,
    img: "/src/assets/product1.jpeg",
  },
  // Add other product objects here
]

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Popular")
  return (
    <div className="bg-secondary">
      <div className="bg-primary rounded-bl-[70px] rounded-br-[70px]">
        <div>
          <NavBar />
        </div>
        <div className="flex items-center justify-center mt-5">
          <p className="text-white font-serif text-3xl justify-center text-center">
            Discover your cherished handmade decorations
          </p>
        </div>
        <div className="relative mt-4 flex justify-center">
          <span className="bg-grey1 pt-2 pl-3 rounded-l-md rounded-bl-md">
            <img src={search} alt="search" />
          </span>
          <span>
            <input
              type="text"
              placeholder="Search Here"
              className="pl-10 pr-4 py-2 bg-grey1 rounded-sm w-80 text-lg font-mono
              rounded-tr-md rounded-br-md focus:outline-none text-white
              "
            />
          </span>
        </div>

        {/* buttons */}
        <div
          className="flex flex-row text-white space-x-4 justify-center items-center mt-7 text-xl
          pb-7"
        >
          <button
            className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
              selectedCategory === "Popular" ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedCategory("Popular")}
          >
            Popular
          </button>
          <button
            className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
              selectedCategory === "Vase" ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedCategory("Vase")}
          >
            Vase
          </button>
          <button
            className={`rounded-md w-auto text-lg py-1 px-2 border-white ${
              selectedCategory === "Pots" ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedCategory("Pots")}
          >
            Pots
          </button>
        </div>
      </div>
      <div className="flex flex-row space-x-7 font-serif text-justify p-5 mt-4">
        <p className="flex text-black font-bold flex-grow text-2xl">
          {selectedCategory}
        </p>
        <Link to="/productpage" className="flex text-grey1 text-base underline">
          View All
        </Link>
      </div>

      {/* components */}
      <div className="p-4">
        {/* {selectedCategory === "" && (
          <div className="flex flex-row space-x-4 items-center justify-center mt-10 ">
            <Popular
              img={product}
              name="popular11"
              desc="hrfhsjm"
              price="324"
            />
            <Popular
              img={product}
              name="popular2"
              desc="hrfhsjm"
              price="3240"
            />
            <Popular
              img={product}
              name="popular3"
              desc="hrfhsjm"
              price="3241"
            />
          </div>
        )} */}

        <div
          className="flex overflow-x-auto whitespace-nowrap w-full gap-4"
          //   className="flex gap-4 items-center justify-center mt-10 overflow-x-auto
          // flex-grow-0 flex-shrink-0"
        >
          {products.map((product) => (
            <SingleProduct
              key={product.id}
              img={product.img}
              name={product.name}
              desc={product.desc}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>

        {/* {selectedCategory === "Popular" && (
          <div
            className="flex overflow-x-auto whitespace-nowrap w-full gap-4"
            //   className="flex gap-4 items-center justify-center mt-10 overflow-x-auto
            // flex-grow-0 flex-shrink-0"
          >
            <Decorative img={product} name="dec1" desc="hrfhsjm" price="324" />
            <Decorative img={product} name="dec2" desc="hrfhsjm" price="3240" />
            <Decorative img={product} name="dec3" desc="hrfhsjm" price="3241" />
            <Decorative img={product} name="dec3" desc="hrfhsjm" price="3241" />
            <Decorative img={product} name="dec3" desc="hrfhsjm" price="3241" />
            <Decorative img={product} name="dec3" desc="hrfhsjm" price="3241" />
          </div>
        )}
        {selectedCategory === "Vase" && (
          <div className="flex flex-row space-x-4 items-center justify-center mt-10 overflow-x-auto">
            <Vase img={product} name="vase1" desc="hrfhsjm" price="324" />
            <Vase img={product} name="vase2" desc="hrfhsjm" price="3240" />
            <Vase img={product} name="vase3" desc="hrfhsjm" price="3241" />
            <Vase img={product} name="vase3" desc="hrfhsjm" price="3241" />
            <Vase img={product} name="vase3" desc="hrfhsjm" price="3241" />
          </div>
        )}
        {selectedCategory === "Pots" && (
          <div className="flex flex-row space-x-4 items-center justify-center mt-10 overflow-x-auto">
            <Pots img={product} name="pot1" desc="hrfhsjm" price="324" />
            <Pots img={product} name="pot2" desc="hrfhsjm" price="3240" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
            <Pots img={product} name="pot3" desc="hrfhsjm" price="3241" />
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Home
