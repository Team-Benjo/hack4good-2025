import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { isAdmin, isLoggedIn, isUser } from "./IsAdmin"
import { ADMIN_LANDING, LANDING_LOGIN, RESIDENT_LANDING } from "../Routes"

const admin = "ADMIN"
const resident = "RESIDENT"
const logout = "LOGOUT"
const loading = "LOADING"

function Blocker(user: String) {
  return () => {
    const [loginState, setLoginState] = useState<String>(loading)

    useEffect(() => {
      if (!isLoggedIn()) {
        console.log("lg")
        setLoginState(logout)
      } else if (isAdmin()) {
        console.log("ad")
        setLoginState(admin)
      } else if (isUser()) {
        console.log("re")
        setLoginState(resident)
      } else {
        console.log("fall")
      }
    }, [])

    if (loginState == loading) {
      return <>Loading</>
    }

    if (loginState == user) {
      return <Outlet />
    }

    var backRoute = "/"
    if (loginState == logout){
      console.log("not log in")
      backRoute = LANDING_LOGIN
    } else if (loginState == admin) {
      console.log("Admin")
      backRoute = ADMIN_LANDING
    } else if (loginState == resident) {
      console.log("Resident")
      backRoute = RESIDENT_LANDING
    }
    return <Navigate to={backRoute} />
  }
}

export const AdminAccess = Blocker(admin)
export const ResidentAccess = Blocker(resident)
export const LogoutAccess = Blocker(logout)