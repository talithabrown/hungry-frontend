import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  return (
    // <footer>
    //     <h3>This is the footer</h3>
    //     {location.pathname === '/' && (<Link to='/about'>About</Link>)}
    //     <Link to='/login'>Login</Link>
    //     <Link to='/create-account'>Create Account</Link>
    // </footer>
    <footer>
      <nav className="mobile-nav">
          <Link to='/'><img src="/images/home.svg" alt="home icon"></img></Link>
          {/* <Link to=''><img src="/images/search.svg" alt="search icon"></img></Link> */}
          <Link to='/new-post'><img src="/images/plus-square.svg" alt="post icon"></img></Link>
          {/* <Link to=''><img src="/images/message-circle.svg" alt="message icon"></img></Link> */}
          <Link to='/profile'><img src="/images/user.svg" alt="user icon"></img></Link>
      </nav>  
    </footer>

  )
}

export default Footer