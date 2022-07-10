import Button from './Button'
import './blog.css'

const Header = ({ onAdd, text }) => {
  return (
    <header className='header'>
      <h1>Restaurant Blog</h1>
      <Button text={text} onClick={onAdd}/>
    </header>
  )
}

export default Header