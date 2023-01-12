import TopBar from "../components/navbar/TopBar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

export const HeadAndFoot = () => (
   <>
      <TopBar />
         <div className="mainWrapper">
            <Outlet />
         </div>
      <Footer />
   </>
 );