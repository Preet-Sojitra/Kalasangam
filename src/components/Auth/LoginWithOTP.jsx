import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom" // Import the Link component
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
  const location = useLocation()

  const { search } = location
  const params = new URLSearchParams(search)
  const who = params.get("who")

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRole = useAuthStore((state) => state.setRole)

  const [isLoading, setIsLoading] = useState(false)

  const [mobile, setMobile] = useState("")
  const [countryCode, setCountryCode] = useState("")

  const [otp, setOtp] = useState("")
  const [showOtpContainer, setShowOtpContainer] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  // OTP Resend Timer
  const [timer, setTimer] = useState(6)
  const [timerOn, setTimerOn] = useState(false)

  useEffect(() => {
    if (timerOn) {
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000)
      } else {
        setTimerOn(false)
        setTimer(6)
      }
    }

    return () => {
      clearTimeout()
    }
  }, [timer, timerOn])
  // console.log(timer)

  const sendOTP = async (e) => {
    e.preventDefault()
    // console.log(mobile.slice(countryCode.length))
    // console.log(countryCode)

    // CHECKS: If any field is empty
    if (mobile === "") {
      toast.error("Please enter your mobile number")
      return
    }
    if (countryCode === "") {
      toast.error("Please select your country")
      return
    }

    // CHECKS: If the mobile number is valid
    if (mobile.slice(countryCode.length).length != 10) {
      toast.error("Please enter 10 digit mobile number")
      return
    }

    console.log(mobile)
    console.log(countryCode)

    toast.success("OTP sent successfully")

    setOtpSent(true)
    // Show the OTP container, cause the OTP is sent
    setShowOtpContainer(true)

    // Send the data to the server
    try {
      const res = await axios.post(`${API_URL}/auth/send-otp`, {
        mobile: mobile.slice(countryCode.length),
        countryCode,
      })
      const { data } = res
      console.log(data)

      setTimerOn(true)
    } catch (error) {
      console.log("Error Logging in Artisan: 👇")
      console.log(error)

      setShowOtpContainer(false)
      setOtpSent(false)
      setTimerOn(false)

      if (error?.response?.status == 400) {
        toast.error(error.response.data.msg)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(otp)

    setIsLoading(true)

    // Send the data to the server
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, {
        countryCode,
        mobile: mobile.slice(countryCode.length),
        otp,
        role: who === "artisan" ? "artisan" : "customer",
      })
      const { data } = res
      console.log(data)

      setAccessToken(data.accessToken)
      setRole(data.role)
      setIsLoading(false)

      // add accessToken and to local storage
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("role", data.role)

      // navigate to home page
      navigate("/home")
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
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
                    setMobile(inputNumber)
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

                <button
                  className={`px-2 bg-accent text-black w-[30%] rounded-md
                    ${
                      otpSent ? "cursor-not-allowed opacity-50" : "opacity-100 "
                    }
                  `}
                  onClick={sendOTP}
                  disabled={otpSent}
                >
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </button>
              </div>
            </div>

            {showOtpContainer && (
              <>
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

                  {timerOn ? (
                    <button
                      className="text-black cursor-default"
                      disabled={true}
                    >
                      Resend OTP in 00:
                      {
                        // If the timer is less than 10, then add a 0 before the timer
                        timer < 10 ? `0${timer}` : timer
                      }
                    </button>
                  ) : (
                    <button className="text-black" onClick={sendOTP}>
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center justify-center my-6">
              <button
                className={`text-black bg-accent py-2 text-xl font-bold text-center rounded-lg shadow-md shadow-black flex justify-center px-4 items-center gap-1
                  ${
                    isLoading || !showOtpContainer
                      ? "cursor-not-allowed opacity-50"
                      : "opacity-100 px-6"
                  }
                `}
                onClick={handleLogin}
                disabled={isLoading || !showOtpContainer}
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
