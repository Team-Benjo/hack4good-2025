import { LANDING_LOGIN } from "@/Routes";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function ResidentLanding() {
  const auth = getAuth()
  const navigate = useNavigate()

  return <div>Dummy Landing Page
    <button onClick={() => {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate(LANDING_LOGIN)
      }).catch((error) => {
        // An error happened.
      });
      
    }}>Logout</button>
  </div>
}