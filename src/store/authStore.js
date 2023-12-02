import { create } from "zustand"

export const useAuthStore = create((set) => {
  // Check if accessToken is present in local storage
  const existingAccessToken = localStorage.getItem("accessToken")
  const existingRole = localStorage.getItem("role")

  set({ accessToken: existingAccessToken, role: existingRole })

  return {
    accessToken: existingAccessToken || null,
    role: existingRole || null,
    setAccessToken: (accessToken) => set({ accessToken }),
    setRole: (role) => set({ role }),
    handleLogout: () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("role")

      return set({ accessToken: null, role: null })
    },
  }

  // const existingRole = getCookie("role")
  // const existingAccessToken = getCookie("accessToken")

  // set({ role: existingRole, accessToken: existingAccessToken })

  // return {
  //   role: existingRole || null,
  //   setRole: (role) => set({ role: role }),
  //   accessToken: existingAccessToken,
  //   setAccessToken: (accessToken) => set({ accessToken }),
  //   handleLogout: () => {
  //     // clear the cookies
  //     // From stackoverflow :)
  //     document.cookie.split(";").forEach((c) => {
  //       document.cookie = c
  //         .replace(/^ +/, "")
  //         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
  //     })

  //     return set({ role: null, accessToken: null })
  //   },
  // }
})

// export const useAuthStore = create((set) => ({
//   role: null,
//   setRole: (role) => set({ role: role }),
//   accessToken: null,
//   setAccessToken: (accessToken) => set({ accessToken }),
//   handleLogout: () => {
//     // clear the cookies
//     // From stackoverflow :)
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
//     })

//     return set({ role: null, accessToken: null })
//   },
// }))

// By Github copilot :))
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(";").shift()
}
