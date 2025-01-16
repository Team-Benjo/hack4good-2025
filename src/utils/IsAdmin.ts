import { getAuth } from "firebase/auth";


export const isAdmin = () => {
  const auth = getAuth()
  const re = /(?<=@)a.mwh.muhammadiyah.org.sg/
  const usrEmail = auth.currentUser?.email
  return (usrEmail && re.test(usrEmail)) ? true : false
}

export const isUser = () => {
  const auth = getAuth()
  const re = /(?<=@)u.mwh.muhammadiyah.org.sg/
  const usrEmail = auth.currentUser?.email
  return (usrEmail && re.test(usrEmail)) ? true : false
}

export const isLoggedIn = () => {
  const auth = getAuth()
  return auth.currentUser ? true : false
}