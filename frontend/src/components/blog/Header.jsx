import Button from './Button'
import './blog.css'

const Header = ({ buttonAction, text }) => {
  return (
    <div className='header'>
      <h1>Restaurant Blog</h1>
      <Button text={text} onClick={() => buttonAction()}/>
    </div>
  )
}

export default Header