import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Explore from "./Pages/Explore"
import Home from "./Pages/Home"
import AllProducts from "./Pages/AllProducts"
import ProductDetail from "./Pages/ProductDetail"
import Analytics from "./Pages/Artisans/Analytics"
import Login from "./components/Auth/Login"
import LoginWithOTP from "./components/Auth/LoginWithOTP"
import { Signup } from "./components/Auth/Signup"
import AR from "./Pages/AR"
import AddProduct from "./Pages/Artisans/AddProduct"
import BuyNow from "./Pages/BuyNow"
import { Main } from "./Layouts/Main"
import { CartProvider } from "./components/CartContext"
import { GetStartedRegistration } from "./Pages/Auth/GetStartedRegistration"
import ScrollToTop from "./ScrollToTop"
import { GetStartedLogin } from "./Pages/Auth/GetStartedLogin"
import { PaymentSuccess } from "./components/PaymentSuccess"
import { MyProfile } from "./Pages/Account/MyProfile"
import { StripeContainer } from "./components/Stripe/StripeContainer"
import { OrderDetails } from "./Pages/Account/OrderDetails"
import { More } from "./Pages/More"
import { Dashboard as DashboardLayout } from "./Layouts/Dashboard"
import { UserNavigationOptions } from "./Pages/Account/UserNavigationOptions"
import { ComingSoon } from "./Pages/ComingSoon"
import { NotFound } from "./Pages/NotFound"
import { OrdersCombined } from "./Pages/Account/OrdersCombined"
import { ProductsByCategory } from "./Pages/ProductsByCategory"
// import Cart from "./Pages/Cart"
// import { Test } from "./Test"
// import Inventory from "./Pages/Artisans/Inventory"
// import EditProduct from "./Pages/Artisans/EditProduct"

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        {/* <Test /> */}
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/" element={<Main />}>
            <Route path="home" element={<Home />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route
              path="all-products/:categoryId"
              element={<ProductsByCategory />}
            />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="product/:productId/ar" element={<AR />} />
          </Route>

          <Route path="/buynow/:productId" element={<BuyNow />} />
          <Route
            path="/buynow/:productId/checkout"
            element={<StripeContainer />}
          />

          <Route path="/" element={<DashboardLayout />}>
            <Route path="account" element={<UserNavigationOptions />} />
            <Route path="account/profile" element={<MyProfile />} />
            <Route path="account/orders" element={<OrdersCombined />} />
            <Route path="account/orders/:orderId" element={<OrderDetails />} />
            <Route path="more" element={<More />} />

            {/* For ARTISANS */}
            <Route path="account/addproduct" element={<AddProduct />} />
            <Route path="account/analytics" element={<Analytics />} />
          </Route>

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/login/sms" element={<LoginWithOTP />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route path="/cart" element={<ComingSoon />} />
          <Route path="/auth/get-started/login" element={<GetStartedLogin />} />
          <Route
            path="/auth/get-started/register"
            element={<GetStartedRegistration />}
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route
            path="/payment/cancel"
            element={
              <>
                <h1>Payment Canceled</h1>
              </>
            }
          />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />

          {/* ADD LATER */}
          {/* <Route path="/artisians/inventory" element={<Inventory />} /> */}
          {/* <Route path="/artisian/editproduct" element={<EditProduct />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
