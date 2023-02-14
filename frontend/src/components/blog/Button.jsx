import './blog.css'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Button = ( {text, onClick} ) => {

   const { user } = useAuthContext()
   const nav = useNavigate()

   return (  
      <div className="">
         {user &&
            <button 
               className='button'
               onClick={onClick}>
               {text}
            </button>
         }
         {!user &&
            <button 
               className='button'
               onClick={() => nav('/register')}>
               Register!
            </button>        
         }
      </div>
   )
}

export default Button