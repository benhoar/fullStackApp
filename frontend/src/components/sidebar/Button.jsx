import './sidebar.css'

const Button = ({image, text, style}) => {
  return (
    <div className="btn">
      <img src={image} alt={text} style={style[1]}/>
      <a className="linktext" href="/" style={style[0]}>{text}</a>
    </div>
  )
}

export default Button