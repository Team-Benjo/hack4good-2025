import React from "react"
import { useNavigate } from "react-router-dom"
import { isAdmin, isLoggedIn, isUser } from "./IsAdmin"
import { ADMIN_LANDING, LANDING_LOGIN, RESIDENT_LANDING } from "../Routes"

function Blocker(test: () => boolean) {
  return ({children}: {children: React.ReactNode}) => {
    const navigate = useNavigate()

    if (test()) {
      return children
    }
    var message = "You do not have access to this page."
    var backRoute = "/"

    if (!isLoggedIn()){
      backRoute = LANDING_LOGIN
    } else if (isAdmin()) {
      backRoute = ADMIN_LANDING
    } else if (isUser()) {
      backRoute = RESIDENT_LANDING
    }
    return <div>
      <text>{message}</text>
      <button onClick={() => navigate(backRoute)}>Go Back</button>
    </div>
  }
}

export const AdminAccess = Blocker(isAdmin)
export const ResidentAccess = Blocker(isUser)
export const LogoutAccess = Blocker(() => !isLoggedIn)