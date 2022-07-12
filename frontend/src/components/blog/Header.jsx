import Button from './Button'
import './blog.css'

const Header = ({ onAdd, text }) => {
  return (
    <div className='header'>
      <h1>Restaurant Blog</h1>
      <Button text={text} onClick={onAdd}/>
    </div>
  )
}

export default Header