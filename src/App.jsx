import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom"
import Explore from "./Pages/Explore"
import Home from "./Pages/Home"
import AllProducts from "./Pages/AllProducts"
import ProductDetail from "./Pages/ProductDetail"
import Analytics from "./Pages/Dashboard/Analytics"
import Login from "./components/Auth/Login"
import LoginWithOTP from "./components/Auth/LoginWithOTP"
import { ArtisanSignup } from "./components/Auth/ArtisanSignup"
import { Signup } from "./components/Auth/Signup"
import AR from "./Pages/AR"
import Account from "./Pages/Account"
import AddProduct from "./Pages/Dashboard/AddProduct"
import BuyNow from "./Pages/BuyNow"
import Cart from "./Pages/Cart"
import { Test } from "./Test"
import { Main } from "./Layouts/Main"
import { Dashboard as DashBoardLayout } from "./Layouts/Dashboard"
import { CartProvider } from "./components/CartContext"
import { GetStartedRegistration } from "./Pages/Auth/GetStartedRegistration"
import ScrollToTop from "./ScrollToTop"
import { GetStartedLogin } from "./Pages/Auth/GetStartedLogin"

import Inventory from "./Pages/Dashboard/Inventory"
import EditProduct from "./Pages/Dashboard/EditProduct"
import { PaymentSuccess } from "./components/PaymentSuccess"
import { ViewOrders } from "./Pages/Dashboard/ViewOrders"
import OrderTable from "./components/Dashboard/ViewOrders/OederTable"
import { MyProfile } from "./Pages/MyProfile"
import { StripeContainer } from "./components/Stripe/StripeContainer"
// import Profile from "./Pages/Profile"
import { Orders } from "./Pages/User/Orders"
import { ArtisanOrders } from "./Pages/Dashboard/ArtisanOrders"
import { OrderDetail } from "./Pages/Dashboard/OrderDetail"
import { More } from "./Pages/More"
import { Dashboard as TempDashboardLayout } from "./Layouts/TempDashboard"
import { UserNavigationOptions } from "./Pages/UserNavigationOptions"
import { ComingSoon } from "./Pages/ComingSoon"
import { NotFound } from "./Pages/NotFound"

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        {/* <Test /> */}
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<Home />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="product/:productId/ar" element={<AR />} />
          </Route>

          <Route path="/buynow/:productId" element={<BuyNow />} />
          <Route
            path="/buynow/:productId/checkout"
            element={<StripeContainer />}
          />

          <Route path="/" element={<TempDashboardLayout />}>
            <Route path="account" element={<UserNavigationOptions />} />
            <Route path="account/profile" element={<MyProfile />} />
            <Route path="account/orders" element={<Orders />} />
            <Route path="account/orders/:orderId" element={<OrderDetail />} />
            <Route path="more" element={<More />} />
          </Route>

          {/* For USER */}
          <Route path="/dashboard">
            {/* // TODO: can /dashboard/orders and /dashboard/allorders be merged since we are showing order details only but layout is different. So it can me merged by showing more details on Artisan Order page is user is artisan else less detail. Can be done via extracting into one component, and in that component check, whether logged in user is artisan or user, then render accordintly.
             * TACKLE LATER
             */}
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
          </Route>

          {/* //TODO: need to sort the routes for USER And Artisan Dashboard */}

          {/* For ARTISANS */}
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="allorders" element={<ArtisanOrders />} />
            <Route path="allorders/:orderId" element={<OrderDetail />} />
          </Route>

          {/* <Route path="/all-products" element={<AllProducts />} /> */}
          {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          {/* <Route path="/product/:productId/ar" element={<AR />} /> */}
          {/* <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="addproduct" element={<AddProduct />} />
          </Route> */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/login/sms" element={<LoginWithOTP />} />
          {/* <Route path="/auth/signup" element={<ArtisanSignup />} /> */}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/artisian/addproduct" element={<AddProduct />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/cart" element={<ComingSoon />} />
          <Route path="/auth/get-started/login" element={<GetStartedLogin />} />
          <Route
            path="/auth/get-started/register"
            element={<GetStartedRegistration />}
          />
          {/* <Route path="/profilepage" element={<Profile />} /> */}
          <Route path="/artisians/inventory" element={<Inventory />} />
          <Route path="/artisian/editproduct" element={<EditProduct />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route
            path="/payment/cancel"
            element={
              <>
                <h1>Payment Canceled</h1>
              </>
            }
          />
          {/* <Route path="/vieworderss" element={<OrderTable />} /> */}
          {/* <Route path="/artisian/vieworders" element={<ViewOrders />} /> */}

          {/* No longer needed */}
          {/* <Route path="/myprofile" element={<MyProfile />} /> */}

          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
