import Footer from "../../components/footer/Footer"
import TopBar from "../../components/navbar/TopBar"
import './about.css'

const About = () => {
  return (
    <div>
      <TopBar />
         <div className="aboutPost">
            <p className="text">
            Cuisine map is a project derived from Ben and Sarah's desire to taste foods from around the world. During our time together as a couple in Los Angeles, we have rarely ever tried the same restaurant twice due to the abundance of diverse and delicious places for us to sample. After seeing a tik tok of a man rating the world's cuisine from best to worst on a continent by continent basis, we decided we could do better! We hope to try all of the cuisines shown on this site (and more as we discover them) and to decide, once and for all, which countries have the greatest cuisines in the world. While we score individual restaurants on a standared 1-10 scale, we rank cuisines as a whole on a 1-3 "clean plate" scale. Of course, all cuisines around the world have delicious foods to offer... but for a cuisine to have a three plate rating its food needs to be both delicious AND diverse – we are hungry and need lots of individual, stellar dishes to keep us satisfied. Off to another meal!
            </p>
            <img className="uspic" src="images/us.png" alt="" />
         </div>
      <Footer />
    </div>
  )
}

export default About