import './profile.css'

const Profile = () => {
   const pic = "images/BH_Pic.jpg"
   const name = "Ben Hoar"
   const username = "hoarboy"
   const email = "bbhoar@gmail.com"
   const favorite = "Korean"
 
   return (
      <div className="fieldWrapper">
         <img id="pic" src={pic} alt="" />
         <div className="fields">
            <div className="field">
               <span className="fieldName">Name</span>
               <span>: {name}</span>
            </div>
            <div className="field">
               <span className="fieldName">Username</span>
               <span>: {username}</span>
            </div>
            <div className="field">
               <span className="fieldName">Email</span>
               <span>: {email}</span>
            </div>
            <div className="field">
               <span className="fieldName">Favorite Cuisine</span>
               <span>: {favorite}</span>
            </div>
         </div>
      </div>
   )
}

export default Profile