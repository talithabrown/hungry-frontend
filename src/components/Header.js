import { Link } from 'react-router-dom'

const Header = ({ text, imgSrc, imgFunction }) => {

  if (imgSrc !== '' && imgFunction !== '') {
    return (
      <header>
          <h1>{text}</h1>
  
          <div>
            <Link to='/'><img src="/images/home.svg" alt="home icon"></img></Link>
            <Link to='/profile'><img src="/images/user.svg" alt="user icon"></img></Link>
  
            <img src={imgSrc} alt="" onClick={imgFunction}></img>
          </div>
      </header>
    )
  }
  else {
    return (
      <header>
          <h1>{text}</h1>

          <div>
            <Link to='/'><img src="/images/home.svg" alt="home icon"></img></Link>
            <Link to='/profile'><img src="/images/user.svg" alt="user icon"></img></Link>
          </div>
      </header>
    )
  }
}

export default Header