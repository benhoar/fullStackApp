import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
   const nav = useNavigate()

   useEffect(() => {
      if (!localStorage.user) {
         nav('/lostdiner', {state: {code:403}}, {replace:true})
      }
   }, [nav])
 
   return children;
 };
