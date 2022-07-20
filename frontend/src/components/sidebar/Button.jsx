import './sidebar.css'

const Button = ({image, text, style, onClick}) => {
  return (
    <div className="btn" onClick={onClick}>
      <img src={image} alt={text} style={style[1]}/>
      <p className="linktext" style={style[0]}>{text}</p>
    </div>
  )
}

export default Button