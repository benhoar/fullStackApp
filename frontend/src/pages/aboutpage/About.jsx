import './about.css'

const About = () => {
  return (
    <div className="aboutPost">
      <h1 style={{alignSelf:"flex-start"}}>About Cuisine Map</h1>
      <p className="text">
        Cuisine Map was birthed to help me and my wonderful girlfriend, Sarah, to track our adventures 
        through Los Angeles. We are always looking for new foods, especially new cuisines, to try – but that left us with a dilemma; 
        how can we possibly remember all of these restaurants! From here, I aimed to provide us a fun way to track our experiences. 
        With Cuisine Map, anyone can make an account, start filling up their blog with their experiences, and see how their culinary 
        preferences evolve over time, perhaps (and hopefully) surprising us along the way! Here, we can see comprehensive and specific 
        details about our eating history and make sure we never forget a single delicious bite. One common question is, why is the map 
        the way it is? Good question! I have an LED poster in my room that lights up corresponding to my scores, and this layout was 
        necessary for poster aesthetics and my limited electrical engineering skills... Anyway, hope you enjoy Cuisine Map and never stay 
        hungry for long.
      </p>
      <img className="uspic" src="images/us.png" alt="" />
    </div>
  )
}

export default About