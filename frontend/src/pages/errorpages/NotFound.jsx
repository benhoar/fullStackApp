import React from 'react'
import { Link } from 'react-router-dom';
import './notfound.css'
import { useLocation } from 'react-router-dom';

// ben's secret

const getLettuce = (minshift) => {
   let lettuces = []
   const getRandInt = (val) => {
      return Math.floor(Math.random() * val);
   }

   for (let i = 0; i < 62; i++) {
      const upshift = String(getRandInt(4) + minshift) + '%'
      const leftshift = String((i * 7)-23) + 'px'
      lettuces.push(<div className='lettuce' 
                         style={{left:leftshift, top:upshift}}
                         key={i}>
                    </div>)
   }
   return lettuces
}

const NotFound = () => {

  const loc = useLocation()

  return (
    <div style={{paddingTop:"110px"}}>
      <div className="notFoundWrapper"> 
         <div className="tomato"></div>
         {getLettuce(39)}
         <div className="cheese"></div>
         <div className="meat">
            <p className='lostMessage'>{loc.state ? loc.state.code : 404} We are lost... it's ok, heres a burger.</p>
         </div>
         {getLettuce(73)}
         <div className="findself">
            <Link to='/'>
               <div className="">Let's Go Home</div>
            </Link>
         </div>
      </div>
      </div>
  )
}

export default NotFound