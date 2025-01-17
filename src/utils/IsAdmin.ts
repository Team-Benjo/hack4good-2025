import { getAuth } from "firebase/auth";


export const isAdmin = () => {
  const auth = getAuth()
  const re = /(?<=@)a.mwh.muhammadiyah.org.sg/
  const usrEmail = auth.currentUser?.email
  return (usrEmail && re.test(usrEmail)) ? true : false
}

export const isLoggedIn = () => {
  const auth = getAuth()
  console.log(auth.currentUser)
  return auth.currentUser ? true : false
}

export const isUser = () => {
  return !isAdmin && isLoggedIn()
}
