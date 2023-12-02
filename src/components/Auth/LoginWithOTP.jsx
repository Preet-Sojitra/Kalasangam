import React, { useState } from "react"
import { Link, redirect, useLocation, useNavigate } from "react-router-dom" // Import the Link component
import background from "../../assets/bgimage.jpg"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useAuthStore } from "../../store/authStore"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import OTPInput from "react-otp-input"

const API_URL = import.meta.env.VITE_API_URL

const LoginWithOTP = () => {
  const navigate = useNavigate()

  const [otp, setOtp] = useState("")

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRole = useAuthStore((state) => state.setRole)

  const [isLoading, setIsLoading] = useState(false)

  const [mobile, setMobile] = useState("")
  const [countryCode, setCountryCode] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    //CHECKS: If any field is empty
    if (mobile === "") {
      toast.error("Please fill all the fields")
      return
    }

    //CHECKS: If the mobile number is valid
    if (mobile.length !== 10) {
      toast.error("Please enter a valid mobile number")
      return
    }

    // console.log(mobile)
    // console.log(countryCode)

    // Send the data to the server
    // try {
    //   setIsLoading(true)

    //   const res = await axios.post(`${API_URL}/auth/send-otp`, {
    //     countryCode,
    //     mobile,
    //   })
    //   const { data } = res
    //   console.log(data)

    //   // setAccessToken(data.accessToken)
    //   // setRole(data.role)

    //   // add accessToken and to local storage
    //   // localStorage.setItem("accessToken", data.accessToken)
    //   // localStorage.setItem("role", data.role)

    //   toast.success("OTP sent successfully")
    //   setIsLoading(false)

    //   navigate("/home")
    // } catch (error) {
    //   console.log("Error Logging in Artisan: 👇")
    //   console.log(error)

    //   setIsLoading(false)

    //   if (error.response.status == 403) {
    //     toast.error("You are not registered")
    //   } else if (error.response.status == 401) {
    //     toast.error("Invalid credentials")
    //   } else {
    //     toast.error("Something went wrong")
    //   }
    // }
  }

  return (
    <>
      <Toaster />
      <div
        className="flex justify-center items-center h-screen bg-cover bg-opacity-50"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-md md:w-full w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl text-gray-800 mb-4 text-center justify-center font-bold">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-xl font-medium text-black mb-2"
              >
                Mobile Number
              </label>
              <div className="flex">
                <PhoneInput
                  country={"in"}
                  value={mobile}
                  onChange={(inputNumber, country) => {
                    setMobile(inputNumber.slice(country.dialCode.length))
                    setCountryCode(country.dialCode)
                  }}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoFocus: true,
                  }}
                  containerClass=""
                  inputStyle={{
                    width: "",
                    borderRadius: "0.375rem",
                    fontSize: "1rem",
                  }}
                />

                <button className="px-2 bg-accent text-black w-[30%] rounded-md">
                  Send OTP
                </button>
              </div>
            </div>

            <div className="mb-4 mt-6">
              <label
                htmlFor="otp"
                className="block text-xl font-medium text-black mb-2"
              >
                Enter OTP
              </label>

              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                inputStyle={{
                  width: "2rem",
                  height: "2rem",
                  fontSize: "20px",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>

            <div className="flex mt-4 gap-4">
              <p className="text-gray-600">Didn't receive the OTP?</p>
              <button className="text-black">Resend OTP in 00:30</button>
            </div>

            <div className="flex items-center justify-center my-6">
              <button
                className={`text-black bg-accent py-2 text-xl font-bold text-center rounded-lg shadow-md shadow-black flex justify-center px-4 items-center gap-1
                  ${
                    isLoading
                      ? "cursor-not-allowed opacity-50"
                      : "opacity-100 px-6"
                  }
                `}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            <Link to="/auth/get-started/login">
              <div className="flex items-center justify-center my-6">
                <button
                  className={`text-black border-2  border-accent py-2 text-xl font-bold text-center rounded-lg flex justify-center px-4 items-center gap-1
                `}
                >
                  Login with Password
                </button>
              </div>
            </Link>
          </form>
          <p className="text-gray-600 text-center">
            Don't have an account?
            <Link
              to="/auth/get-started/register"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginWithOTP
